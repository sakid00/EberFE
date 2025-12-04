'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Box, IconButton, Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Image from 'next/image';
import { useDeviceType } from '../../hooks/useDeviceType';

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

  // Touch/swipe state for vertical mode
  const touchStartY = useRef<number>(0);
  const touchEndY = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  const handlePrevPage = () => {
    if (isVertical) {
      if (currentPage > 0) {
        setFlipDirection2('up');
        setIsFlipping(true);
        setTimeout(() => {
          setCurrentPage((prev) => Math.max(0, prev - 1));
          setIsFlipping(false);
          setFlipDirection2(null);
        }, 300);
      }
    } else if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev();
    }
  };

  const handleNextPage = () => {
    if (isVertical) {
      if (currentPage < pageImages.length - 1) {
        setFlipDirection2('down');
        setIsFlipping(true);
        setTimeout(() => {
          setCurrentPage((prev) => Math.min(pageImages.length - 1, prev + 1));
          setIsFlipping(false);
          setFlipDirection2(null);
        }, 300);
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
    }
  }, [open]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    console.log('PDF loaded successfully with', numPages, 'pages');
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('PDF load error:', error);
    setError('Failed to load PDF');
    setLoading(false);
  };

  // Convert PDF pages to images for the flipbook
  useEffect(() => {
    if (numPages > 0) {
      console.log('Starting to convert', numPages, 'pages to images');
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
              console.error(`Error converting page ${pageNumber}:`, error);
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
          console.error('Error loading PDF for conversion:', error);
        }

        console.log('Converted', images.length, 'pages to images');
        setPageImages(images);
      };

      convertPagesToImages();
    }
  }, [numPages, pdfUrl]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '@keyframes bounce': {
          '0%, 20%, 50%, 80%, 100%': {
            transform: 'translateY(0)',
          },
          '40%': {
            transform: 'translateY(-5px)',
          },
          '60%': {
            transform: 'translateY(-3px)',
          },
        },
      }}
    >
      <Box
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          position: 'relative',
          width: '70%',
          height: '90%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 10,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            zIndex: 1000,
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Hidden PDF document to get page count */}
        {isClient && (
          <Box sx={{ display: 'none' }}>
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
        <Box
          sx={{
            width: '100%',
            height: '100%',
            overflow: 'visible',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {/* Previous Navigation Button (Left for horizontal, Up for vertical) */}
          {isClient && pageImages.length > 0 && (
            <IconButton
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              sx={{
                position: 'absolute',
                ...(isVertical
                  ? {
                      top: { xs: 8, sm: 16 },
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }
                  : {
                      left: { xs: 4, sm: 16, md: 32 },
                      top: '50%',
                      transform: 'translateY(-50%)',
                    }),
                zIndex: 100,
                bgcolor: 'rgba(120, 71, 145, 0.9)',
                color: 'white',
                width: { xs: 40, sm: 48 },
                height: { xs: 40, sm: 48 },
                '&:hover': {
                  bgcolor: 'rgba(120, 71, 145, 1)',
                },
                '&:disabled': {
                  bgcolor: 'rgba(0, 0, 0, 0.2)',
                  color: 'rgba(255, 255, 255, 0.5)',
                },
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              }}
            >
              {isVertical ? (
                <KeyboardArrowUpIcon sx={{ fontSize: { xs: 28, sm: 32 } }} />
              ) : (
                <ChevronLeftIcon sx={{ fontSize: { xs: 28, sm: 32 } }} />
              )}
            </IconButton>
          )}

          {/* Next Navigation Button (Right for horizontal, Down for vertical) */}
          {isClient && pageImages.length > 0 && (
            <IconButton
              onClick={handleNextPage}
              disabled={currentPage >= pageImages.length - 1}
              sx={{
                position: 'absolute',
                ...(isVertical
                  ? {
                      bottom: { xs: 50, sm: 60 },
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }
                  : {
                      right: { xs: 4, sm: 16, md: 32 },
                      top: '50%',
                      transform: 'translateY(-50%)',
                    }),
                zIndex: 100,
                bgcolor: 'rgba(120, 71, 145, 0.9)',
                color: 'white',
                width: { xs: 40, sm: 48 },
                height: { xs: 40, sm: 48 },
                '&:hover': {
                  bgcolor: 'rgba(120, 71, 145, 1)',
                },
                '&:disabled': {
                  bgcolor: 'rgba(0, 0, 0, 0.2)',
                  color: 'rgba(255, 255, 255, 0.5)',
                },
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              }}
            >
              {isVertical ? (
                <KeyboardArrowDownIcon sx={{ fontSize: { xs: 28, sm: 32 } }} />
              ) : (
                <ChevronRightIcon sx={{ fontSize: { xs: 28, sm: 32 } }} />
              )}
            </IconButton>
          )}

          {isClient && pageImages.length > 0 && !isVertical && (
            <HTMLFlipBook
              width={600}
              height={type === 'mobile' ? 450 : 700}
              size="fixed"
              minWidth={300}
              maxWidth={1000}
              minHeight={400}
              maxHeight={1533}
              showCover={true}
              ref={bookRef}
              className="pdf-flipbook"
              style={{}}
              startPage={0}
              drawShadow={true}
              flippingTime={1000}
              usePortrait={true}
              startZIndex={0}
              autoSize={true}
              maxShadowOpacity={1}
              mobileScrollSupport={true}
              clickEventForward={true}
              useMouseEvents={true}
              swipeDistance={0}
              showPageCorners={true}
              disableFlipByClick={false}
              onFlip={onFlip}
            >
              {pageImages.map((pageImage, index) => (
                <div
                  key={index}
                  className="pdf-page"
                  style={{
                    background: 'white',
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                >
                  <Image
                    src={pageImage}
                    alt={`Page ${index + 1}`}
                    fill
                    style={{
                      objectFit: 'contain',
                      cursor: 'pointer',
                    }}
                  />
                </div>
              ))}
            </HTMLFlipBook>
          )}

          {/* Vertical Calendar Viewer with Swipe/Drag Support */}
          {isClient && pageImages.length > 0 && isVertical && (
            <Box
              sx={{
                width: type === 'mobile' ? '95%' : '600px',
                height: type === 'mobile' ? '70%' : '80%',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 2,
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                cursor: 'grab',
                userSelect: 'none',
                perspective: '1000px',
                '&:active': {
                  cursor: 'grabbing',
                },
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  transformStyle: 'preserve-3d',
                  transition: isFlipping
                    ? 'transform 0.3s ease-in-out'
                    : 'none',
                  transform: isFlipping
                    ? flipDirection2 === 'down'
                      ? 'rotateX(-15deg)'
                      : 'rotateX(15deg)'
                    : 'rotateX(0deg)',
                  transformOrigin:
                    flipDirection2 === 'down' ? 'top center' : 'bottom center',
                }}
              >
                <Image
                  src={pageImages[currentPage]}
                  alt={`Page ${currentPage + 1}`}
                  fill
                  style={{
                    objectFit: 'contain',
                    background: 'white',
                  }}
                  draggable={false}
                />
              </Box>
            </Box>
          )}

          {!isClient && (
            <Box sx={{ textAlign: 'center' }}>
              <p>Initializing...</p>
            </Box>
          )}

          {isClient && loading && (
            <Box sx={{ textAlign: 'center' }}>
              <p>Loading PDF...</p>
            </Box>
          )}

          {isClient && error && (
            <Box sx={{ textAlign: 'center', color: 'red' }}>
              <p>{error}</p>
              <p>PDF URL: {pdfUrl}</p>
            </Box>
          )}

          {isClient &&
            !loading &&
            !error &&
            pageImages.length === 0 &&
            numPages > 0 && (
              <Box sx={{ textAlign: 'center' }}>
                <p>Converting pages...</p>
              </Box>
            )}

          {/* Page Indicator */}
          {isClient && pageImages.length > 0 && (
            <Box
              sx={{
                position: 'absolute',
                bottom: { xs: 8, sm: 16 },
                left: '50%',
                transform: 'translateX(-50%)',
                bgcolor: 'rgba(120, 71, 145, 0.9)',
                color: 'white',
                px: 2,
                py: 0.5,
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              }}
            >
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
