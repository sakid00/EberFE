'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Box, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';

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
}

const PDFViewer = ({ pdfUrl, open, onClose }: PDFViewerProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageImages, setPageImages] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const bookRef = useRef<HTMLElement | null>(null);

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
      }}
    >
      <Box
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          position: 'relative',
          width: '90%',
          height: '90%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
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
          }}
        >
          {isClient && pageImages.length > 0 && (
            <HTMLFlipBook
              width={600}
              height={700}
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
            >
              {pageImages.map((pageImage, index) => (
                <div
                  key={index}
                  className="pdf-page"
                  style={{ background: 'white', position: 'relative' }}
                >
                  <Image
                    src={pageImage}
                    alt={`Page ${index + 1}`}
                    fill
                    style={{
                      objectFit: 'contain',
                    }}
                  />
                </div>
              ))}
            </HTMLFlipBook>
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
        </Box>
      </Box>
    </Modal>
  );
};

export default PDFViewer;
