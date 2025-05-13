import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { WalrusClient } from '@mysten/walrus';
import { currentConfig } from '../config';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function PDFView({ blodId }: { blodId: string }) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, _] = useState<number>(1);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);

  useEffect(() => {
    async function fetchBlob() {
      if (!blodId) return;
      const walrusClient = new WalrusClient({
        network: currentConfig.NETWORK,
        suiRpcUrl: currentConfig.SUI_RPC_URL,
      });
      const uint8 = await walrusClient.readBlob({ blobId: blodId });
      const pdfBlob = new Blob([uint8], { type: 'application/pdf' });
      setPdfBlob(pdfBlob);
    }
    fetchBlob();
  }, [blodId]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <div>
      {pdfBlob ? (
        <Document file={pdfBlob} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
      ) : (
        <p>正在加载PDF...</p>
      )}
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}

export default PDFView;