import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import './studyMaterials.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfViewer = () => {
  const { subject, chapter } = useParams();
  const navigate = useNavigate();
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);

  // In a real app, you would fetch this from your subjectData
  const pdfUrl = `/pdfs/${subject}/${chapter}.pdf`;

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="pdf-viewer-container">
      <div className="pdf-header">
        <button onClick={() => navigate(`/study-materials/${subject}`)} className="back-button">
          ← Back to Chapters
        </button>
        <h2>
          {subject.charAt(0).toUpperCase() + subject.slice(1)} - {chapter.charAt(0).toUpperCase() + chapter.slice(1)}
        </h2>
        <div className="pdf-controls">
          <button 
            onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
            disabled={pageNumber <= 1}
          >
            Previous
          </button>
          <span>Page {pageNumber} of {numPages || '--'}</span>
          <button 
            onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages || 1))}
            disabled={pageNumber >= (numPages || 1)}
          >
            Next
          </button>
          <a href={pdfUrl} download className="download-button">
            Download PDF
          </a>
        </div>
      </div>

      <div className="pdf-viewer">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="loading-pdf">Loading PDF...</div>}
          error={<div className="error-pdf">Failed to load PDF</div>}
        >
          <Page pageNumber={pageNumber} />
        </Document>
      </div>
    </div>
  );
};

export default PdfViewer;