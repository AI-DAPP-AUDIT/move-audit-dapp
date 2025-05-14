import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { readBlob } from '../api/walrus';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function PDFView({ blodId }: { blodId: string }) {
  const [numPages, setNumPages] = useState<number>();
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);

  useEffect(() => {
    async function fetchBlob() {
      if (!blodId) return;
      const blodInfo = await readBlob(blodId);
      setPdfBlob(blodInfo);
      console.log("read pdfBlob success========");
    }
    fetchBlob();
  }, [blodId]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  function handleDownload() {
    if (!pdfBlob) return;
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'audit-report.pdf';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        background: '#f7f8fa',
        borderRadius: 16,
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        maxWidth: 480,
        margin: '0 auto'
      }}
    >
      <div
        style={{
          width: 380,
          height: 520,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
          marginBottom: 12,
          overflow: 'hidden'
        }}
      >
        {pdfBlob ? (
          <Document file={pdfBlob} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={1} width={360} height={500} />
          </Document>
        ) : (
          <p style={{ color: '#888' }}>loading...</p>
        )}
      </div>
      <p style={{ fontSize: 13, color: '#999', margin: '0 0 18px 0', textAlign: 'center' }}>
        Page 1 of {numPages}
      </p>
      <button
        onClick={handleDownload}
        style={{
          padding: '12px 36px',
          background: 'linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: 24,
          fontSize: 17,
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(99,102,241,0.08)',
          transition: 'background 0.2s, transform 0.2s',
          margin: '0 auto',
          display: 'block'
        }}
        onMouseOver={e => (e.currentTarget.style.background = 'linear-gradient(90deg, #4f46e5 0%, #2563eb 100%)')}
        onMouseOut={e => (e.currentTarget.style.background = 'linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)')}
      >
        View Full Report (Download PDF)
      </button>
    </div>
  );
}

export default PDFView;