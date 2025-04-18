import { Box, Container, Flex, Heading } from "@radix-ui/themes";
import { ConnectButton } from "@mysten/dapp-kit";
import FileUpload from "../components/upload";
import { useState } from "react";


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
      <Flex
        position="sticky"
        top="0"
        px="4"
        py="2"
        justify="between"
        style={{
          borderBottom: "1px solid var(--gray-a2)",
          background: "var(--color-background)",
          zIndex: 10,
        }}
      >
        <Box>
          <Heading>MOVE AUDIT</Heading>
        </Box>
        <Box>
          <ConnectButton />
        </Box>
      </Flex>

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
    </>
  );
}

export default Upload;