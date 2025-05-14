import { Box, Container } from "@radix-ui/themes";
import FileUpload from "../components/upload";
import { useState } from "react";
import { Header } from "../components/Header";
import Footer from "../components/Footer";

function Upload() {
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);

  const handleUploadFiles = async (filesToUpload: File[]) => {
    console.log("Preparing to upload the following files:", filesToUpload);
    setUploadMessage(`Starting to upload ${filesToUpload.length} files...`);
    
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log("Upload successful!");
    setUploadMessage(`${filesToUpload.length} files uploaded successfully!`);
  };

  return (
    <>
      <Header />
      <Container size="3" mt="5">
        <Box
          p="4"
          style={{ background: "var(--gray-a2)", minHeight: 400, borderRadius: 'var(--radius-3)' }}
        >
          <FileUpload onUpload={handleUploadFiles} />

          {uploadMessage && (
            <Box mt="4" p="3" style={{ background: 'var(--green-a3)', borderRadius: 'var(--radius-2)' }}>
              {uploadMessage}
            </Box>
          )}
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default Upload;