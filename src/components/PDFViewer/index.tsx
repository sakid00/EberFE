'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Box, IconButton, Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Image from 'next/image';
import { useDeviceType } from '../../hooks/useDeviceType';
import * as Sentry from '@sentry/nextjs';
import {
  modalStyles,
  getContainerStyles,
  closeButtonStyles,
  hiddenDocumentStyles,
  flipbookWrapperStyles,
  getPrevButtonStyles,
  getNextButtonStyles,
  navIconStyles,
  getZoomControlsContainerStyles,
  zoomButtonStyles,
  zoomResetButtonStyles,
  zoomIconStyles,
  getHorizontalFlipbookContainerStyles,
  getHorizontalFlipbookTransformStyles,
  getVerticalViewerContainerStyles,
  getVerticalViewerTransformStyles,
  statusTextStyles,
  errorTextStyles,
  pageIndicatorStyles,
  pdfPageStyles,
  pdfPageImageStyles,
  verticalViewerImageStyles,
} from './styles';

// Dynamically import react-pdf components to avoid SSR issues
const Document = dynamic(
  () => import('react-pdf').then((mod) => ({ default: mod.Document })),
  {
    ssr: false,
  }
);

const Page = dynamic(
  () => import('react-pdf').then((mod) => ({ default: mod.Page })),
  {
    ssr: false,
  }
);

const HTMLFlipBook = dynamic(() => import('react-pageflip'), {
  ssr: false,
});

// Set up PDF.js worker - using local worker file
if (typeof window !== 'undefined') {
  import('react-pdf').then(({ pdfjs }) => {
    pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
  });
}

interface PDFViewerProps {
  pdfUrl: string;
  open: boolean;
  onClose: () => void;
  flipDirection?: 'horizontal' | 'vertical';
}

const PDFViewer = ({
  pdfUrl,
  open,
  onClose,
  flipDirection = 'horizontal',
}: PDFViewerProps) => {
  const isVertical = flipDirection === 'vertical';
  const [numPages, setNumPages] = useState<number>(0);
  const [pageImages, setPageImages] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection2, setFlipDirection2] = useState<'up' | 'down' | null>(
    null
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bookRef = useRef<any>(null);
  const { type } = useDeviceType();
  const isMobile = type === 'mobile';

  // Touch/swipe state for vertical mode
  const touchStartY = useRef<number>(0);
  const touchEndY = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  // Zoom state for mobile
  const [zoom, setZoom] = useState<number>(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const lastTouchDistance = useRef<number>(0);
  const lastPinchCenter = useRef({ x: 0, y: 0 });
  const isPinching = useRef<boolean>(false);
  const panStartPos = useRef({ x: 0, y: 0 });
  const lastPosition = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const flipbookWrapperRef = useRef<HTMLDivElement>(null);

  // Dynamic flipbook dimensions based on container size
  const [flipbookDimensions, setFlipbookDimensions] = useState({
    width: 400,
    height: 550,
  });

  const MIN_ZOOM = 1;
  const MAX_ZOOM = 3;
  const ZOOM_STEP = 0.5;

  const handlePrevPage = () => {
    if (isVertical) {
      if (currentPage > 0) {
        // Disable flip animation for mobile
        if (isMobile) {
          setCurrentPage((prev) => Math.max(0, prev - 1));
        } else {
          setFlipDirection2('up');
          setIsFlipping(true);
          setTimeout(() => {
            setCurrentPage((prev) => Math.max(0, prev - 1));
            setIsFlipping(false);
            setFlipDirection2(null);
          }, 300);
        }
      }
    } else if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev();
    }
  };

  const handleNextPage = () => {
    if (isVertical) {
      if (currentPage < pageImages.length - 1) {
        // Disable flip animation for mobile
        if (isMobile) {
          setCurrentPage((prev) => Math.min(pageImages.length - 1, prev + 1));
        } else {
          setFlipDirection2('down');
          setIsFlipping(true);
          setTimeout(() => {
            setCurrentPage((prev) => Math.min(pageImages.length - 1, prev + 1));
            setIsFlipping(false);
            setFlipDirection2(null);
          }, 300);
        }
      }
    } else if (bookRef.current) {
      bookRef.current.pageFlip().flipNext();
    }
  };

  // Touch handlers for vertical swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const swipeDistance = touchStartY.current - touchEndY.current;
    const minSwipeDistance = 50;

    if (swipeDistance > minSwipeDistance) {
      // Swipe up - next page
      handleNextPage();
    } else if (swipeDistance < -minSwipeDistance) {
      // Swipe down - previous page
      handlePrevPage();
    }
  };

  // Mouse handlers for desktop drag
  const handleMouseDown = (e: React.MouseEvent) => {
    touchStartY.current = e.clientY;
    isDragging.current = true;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    touchEndY.current = e.clientY;
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const swipeDistance = touchStartY.current - touchEndY.current;
    const minSwipeDistance = 50;

    if (swipeDistance > minSwipeDistance) {
      // Drag up - next page
      handleNextPage();
    } else if (swipeDistance < -minSwipeDistance) {
      // Drag down - previous page
      handlePrevPage();
    }
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  // Zoom control functions
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(MAX_ZOOM, prev + ZOOM_STEP));
  };

  const handleZoomOut = () => {
    setZoom((prev) => {
      const newZoom = Math.max(MIN_ZOOM, prev - ZOOM_STEP);
      if (newZoom === MIN_ZOOM) {
        setPosition({ x: 0, y: 0 });
      }
      return newZoom;
    });
  };

  const handleZoomReset = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  // Get distance between two touch points
  const getTouchDistance = (touches: React.TouchList) => {
    const touch1 = touches[0];
    const touch2 = touches[1];
    return Math.hypot(
      touch2.clientX - touch1.clientX,
      touch2.clientY - touch1.clientY
    );
  };

  // Get center point between two touches
  const getTouchCenter = (touches: React.TouchList) => {
    const touch1 = touches[0];
    const touch2 = touches[1];
    return {
      x: (touch1.clientX + touch2.clientX) / 2,
      y: (touch1.clientY + touch2.clientY) / 2,
    };
  };

  // Mobile pinch-to-zoom touch handlers (gestures for page navigation disabled)
  const handleMobileTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch start
      isPinching.current = true;
      lastTouchDistance.current = getTouchDistance(e.touches);
      lastPinchCenter.current = getTouchCenter(e.touches);
    } else if (e.touches.length === 1 && zoom > 1) {
      // Pan start (only when zoomed in)
      panStartPos.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
      lastPosition.current = { ...position };
    }
    // Page navigation gestures disabled for mobile - use buttons instead
  };

  const handleMobileTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && isPinching.current) {
      // Pinch zoom
      const currentDistance = getTouchDistance(e.touches);
      const scale = currentDistance / lastTouchDistance.current;

      setZoom((prev) => {
        const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, prev * scale));
        return newZoom;
      });

      lastTouchDistance.current = currentDistance;
    } else if (e.touches.length === 1 && zoom > 1 && !isPinching.current) {
      // Pan when zoomed
      const deltaX = e.touches[0].clientX - panStartPos.current.x;
      const deltaY = e.touches[0].clientY - panStartPos.current.y;

      const container = containerRef.current;
      if (container) {
        const maxPanX = (container.offsetWidth * (zoom - 1)) / 2;
        const maxPanY = (container.offsetHeight * (zoom - 1)) / 2;

        setPosition({
          x: Math.min(
            maxPanX,
            Math.max(-maxPanX, lastPosition.current.x + deltaX)
          ),
          y: Math.min(
            maxPanY,
            Math.max(-maxPanY, lastPosition.current.y + deltaY)
          ),
        });
      }
    }
    // Page navigation gestures disabled for mobile
  };

  const handleMobileTouchEnd = (e: React.TouchEvent) => {
    if (isPinching.current && e.touches.length < 2) {
      isPinching.current = false;
      // Reset position if zoomed out to 1
      if (zoom <= 1) {
        setPosition({ x: 0, y: 0 });
      }
    }
    // Page navigation gestures disabled for mobile - use buttons instead
  };

  // Desktop mouse wheel zoom handler
  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
      setZoom((prev) => {
        const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, prev + delta));
        if (newZoom === MIN_ZOOM) {
          setPosition({ x: 0, y: 0 });
        }
        return newZoom;
      });
    }
  };

  // Desktop mouse pan handlers (when zoomed)
  const isPanning = useRef<boolean>(false);
  const panMouseStartPos = useRef({ x: 0, y: 0 });

  const handlePanMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      isPanning.current = true;
      panMouseStartPos.current = { x: e.clientX, y: e.clientY };
      lastPosition.current = { ...position };
      e.preventDefault();
    }
  };

  const handlePanMouseMove = (e: React.MouseEvent) => {
    if (!isPanning.current || zoom <= 1) return;

    const deltaX = e.clientX - panMouseStartPos.current.x;
    const deltaY = e.clientY - panMouseStartPos.current.y;

    const container = containerRef.current;
    if (container) {
      const maxPanX = (container.offsetWidth * (zoom - 1)) / 2;
      const maxPanY = (container.offsetHeight * (zoom - 1)) / 2;

      setPosition({
        x: Math.min(
          maxPanX,
          Math.max(-maxPanX, lastPosition.current.x + deltaX)
        ),
        y: Math.min(
          maxPanY,
          Math.max(-maxPanY, lastPosition.current.y + deltaY)
        ),
      });
    }
  };

  const handlePanMouseUp = () => {
    isPanning.current = false;
  };

  const handlePanMouseLeave = () => {
    isPanning.current = false;
  };

  const onFlip = (e: { data: number }) => {
    setCurrentPage(e.data);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Reset states when modal opens
  useEffect(() => {
    if (open) {
      setLoading(true);
      setError(null);
      setNumPages(0);
      setPageImages([]);
      setCurrentPage(0);
      setZoom(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [open]);

  // Reset zoom when page changes
  useEffect(() => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, [currentPage]);

  // Calculate flipbook dimensions based on container size (50% of container width)
  useEffect(() => {
    const updateDimensions = () => {
      if (flipbookWrapperRef.current) {
        const containerWidth = flipbookWrapperRef.current.offsetWidth;
        const containerHeight = flipbookWrapperRef.current.offsetHeight;
        // Use 50% of container width for the flipbook
        const flipbookWidth = Math.floor(containerWidth * 0.1);
        // Maintain aspect ratio (roughly A4 paper ratio ~1:1.4)
        const flipbookHeight = Math.floor(containerHeight * 0.5);
        setFlipbookDimensions({
          width: Math.max(600, flipbookWidth), // Minimum 200px width
          height: Math.max(800, flipbookHeight), // Minimum 280px height
        });
      }
    };

    // Initial calculation
    updateDimensions();

    // Set up ResizeObserver to recalculate on container resize
    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    if (flipbookWrapperRef.current) {
      resizeObserver.observe(flipbookWrapperRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [open, isClient, pageImages.length]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    Sentry.captureException(error, {
      tags: { component: 'PDFViewer', operation: 'documentLoad' },
      extra: { pdfUrl },
    });
    setError('Failed to load PDF');
    setLoading(false);
  };

  // Convert PDF pages to images for the flipbook
  useEffect(() => {
    if (numPages > 0) {
      const convertPagesToImages = async () => {
        const images: string[] = [];

        try {
          const { pdfjs } = await import('react-pdf');
          const pdf = await pdfjs.getDocument(pdfUrl).promise;

          for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
            try {
              const page = await pdf.getPage(pageNumber);
              const viewport = page.getViewport({ scale: 1.5 });

              // Create canvas
              const canvas = document.createElement('canvas');
              const context = canvas.getContext('2d');
              canvas.height = viewport.height;
              canvas.width = viewport.width;

              // Render page
              if (context) {
                await page.render({
                  canvasContext: context,
                  viewport: viewport,
                }).promise;

                images.push(canvas.toDataURL());
              }
            } catch (error) {
              Sentry.captureException(error, {
                tags: { component: 'PDFViewer', operation: 'convertPage' },
                extra: { pageNumber, pdfUrl },
              });
              // Create fallback placeholder for failed pages
              const canvas = document.createElement('canvas');
              const context = canvas.getContext('2d');
              canvas.width = 600;
              canvas.height = 800;
              if (context) {
                context.fillStyle = 'white';
                context.fillRect(0, 0, 600, 800);
                context.fillStyle = '#333';
                context.font = '24px Arial';
                context.textAlign = 'center';
                context.fillText(`Error loading page ${pageNumber}`, 300, 400);
              }
              images.push(canvas.toDataURL());
            }
          }
        } catch (error) {
          Sentry.captureException(error, {
            tags: { component: 'PDFViewer', operation: 'loadPDFForConversion' },
            extra: { pdfUrl, numPages },
          });
        }
        setPageImages(images);
      };

      convertPagesToImages();
    }
  }, [numPages, pdfUrl]);

  return (
    <Modal open={open} onClose={onClose} sx={modalStyles}>
      <Box sx={getContainerStyles(isMobile)}>
        <IconButton onClick={onClose} sx={closeButtonStyles}>
          <CloseIcon />
        </IconButton>

        {/* Hidden PDF document to get page count */}
        {isClient && (
          <Box sx={hiddenDocumentStyles}>
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
            >
              <Page pageNumber={1} />
            </Document>
          </Box>
        )}

        {/* Flipbook */}
        <Box ref={flipbookWrapperRef} sx={flipbookWrapperStyles}>
          {/* Previous Navigation Button (Left for horizontal, Up for vertical) */}
          {isClient && pageImages.length > 0 && (
            <IconButton
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              sx={getPrevButtonStyles(isVertical, isMobile)}
            >
              {isVertical ? (
                <KeyboardArrowUpIcon sx={navIconStyles} />
              ) : (
                <ChevronLeftIcon sx={navIconStyles} />
              )}
            </IconButton>
          )}

          {/* Next Navigation Button (Right for horizontal, Down for vertical) */}
          {isClient && pageImages.length > 0 && (
            <IconButton
              onClick={handleNextPage}
              disabled={currentPage >= pageImages.length - 1}
              sx={getNextButtonStyles(isVertical, isMobile)}
            >
              {isVertical ? (
                <KeyboardArrowDownIcon sx={navIconStyles} />
              ) : (
                <ChevronRightIcon sx={navIconStyles} />
              )}
            </IconButton>
          )}

          {/* Zoom Controls */}
          {isClient && pageImages.length > 0 && (
            <Box sx={getZoomControlsContainerStyles(isMobile)}>
              <IconButton
                onClick={handleZoomIn}
                disabled={zoom >= MAX_ZOOM}
                sx={zoomButtonStyles}
              >
                <ZoomInIcon sx={zoomIconStyles} />
              </IconButton>
              <IconButton
                onClick={handleZoomOut}
                disabled={zoom <= MIN_ZOOM}
                sx={zoomButtonStyles}
              >
                <ZoomOutIcon sx={zoomIconStyles} />
              </IconButton>
              {zoom > 1 && (
                <IconButton
                  onClick={handleZoomReset}
                  sx={zoomResetButtonStyles}
                >
                  <RestartAltIcon sx={zoomIconStyles} />
                </IconButton>
              )}
            </Box>
          )}

          {isClient && pageImages.length > 0 && !isVertical && (
            <Box
              ref={containerRef}
              sx={getHorizontalFlipbookContainerStyles(isMobile, zoom)}
              onTouchStart={isMobile ? handleMobileTouchStart : undefined}
              onTouchMove={isMobile ? handleMobileTouchMove : undefined}
              onTouchEnd={isMobile ? handleMobileTouchEnd : undefined}
              onWheel={!isMobile ? handleWheel : undefined}
              onMouseDown={!isMobile ? handlePanMouseDown : undefined}
              onMouseMove={!isMobile ? handlePanMouseMove : undefined}
              onMouseUp={!isMobile ? handlePanMouseUp : undefined}
              onMouseLeave={!isMobile ? handlePanMouseLeave : undefined}
            >
              <Box sx={getHorizontalFlipbookTransformStyles(zoom, position)}>
                <HTMLFlipBook
                  width={isMobile ? 300 : flipbookDimensions.width}
                  height={isMobile ? 450 : flipbookDimensions.height}
                  size="fixed"
                  minWidth={200}
                  maxWidth={1000}
                  minHeight={280}
                  maxHeight={1000}
                  showCover={true}
                  ref={bookRef}
                  className="pdf-flipbook"
                  style={{ pointerEvents: 'none' }}
                  startPage={0}
                  drawShadow={!isMobile}
                  flippingTime={1000}
                  usePortrait={isMobile}
                  startZIndex={0}
                  autoSize={true}
                  maxShadowOpacity={isMobile ? 0 : 1}
                  mobileScrollSupport={false}
                  clickEventForward={false}
                  useMouseEvents={false}
                  swipeDistance={10000}
                  showPageCorners={false}
                  disableFlipByClick={true}
                  onFlip={onFlip}
                >
                  {pageImages.map((pageImage, index) => (
                    <div key={index} className="pdf-page" style={pdfPageStyles}>
                      <Image
                        src={pageImage}
                        alt={`Page ${index + 1}`}
                        fill
                        style={pdfPageImageStyles}
                      />
                    </div>
                  ))}
                </HTMLFlipBook>
              </Box>
            </Box>
          )}

          {/* Vertical Calendar Viewer with Swipe/Drag Support */}
          {isClient && pageImages.length > 0 && isVertical && (
            <Box
              ref={containerRef}
              sx={getVerticalViewerContainerStyles(isMobile, zoom)}
              onTouchStart={
                isMobile ? handleMobileTouchStart : handleTouchStart
              }
              onTouchMove={isMobile ? handleMobileTouchMove : handleTouchMove}
              onTouchEnd={isMobile ? handleMobileTouchEnd : handleTouchEnd}
              onWheel={!isMobile ? handleWheel : undefined}
              onMouseDown={
                !isMobile && zoom > 1 ? handlePanMouseDown : handleMouseDown
              }
              onMouseMove={
                !isMobile && zoom > 1 ? handlePanMouseMove : handleMouseMove
              }
              onMouseUp={
                !isMobile && zoom > 1 ? handlePanMouseUp : handleMouseUp
              }
              onMouseLeave={
                !isMobile && zoom > 1 ? handlePanMouseLeave : handleMouseLeave
              }
            >
              <Box
                sx={getVerticalViewerTransformStyles(
                  isMobile,
                  isFlipping,
                  flipDirection2,
                  zoom,
                  position
                )}
              >
                <Image
                  src={pageImages[currentPage]}
                  alt={`Page ${currentPage + 1}`}
                  fill
                  style={verticalViewerImageStyles}
                  draggable={false}
                />
              </Box>
            </Box>
          )}

          {!isClient && (
            <Box sx={statusTextStyles}>
              <p>Initializing...</p>
            </Box>
          )}

          {isClient && loading && (
            <Box sx={statusTextStyles}>
              <p>Loading PDF...</p>
            </Box>
          )}

          {isClient && error && (
            <Box sx={errorTextStyles}>
              <p>{error}</p>
              <p>PDF URL: {pdfUrl}</p>
            </Box>
          )}

          {isClient &&
            !loading &&
            !error &&
            pageImages.length === 0 &&
            numPages > 0 && (
              <Box sx={statusTextStyles}>
                <p>Converting pages...</p>
              </Box>
            )}

          {/* Page Indicator */}
          {isClient && pageImages.length > 0 && (
            <Box sx={pageIndicatorStyles}>
              <Typography variant="body2" fontWeight={500}>
                {currentPage + 1} / {pageImages.length}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default PDFViewer;
