import * as React from 'react';
import { Button, Box, Heading, Text, Flex } from '@radix-ui/themes';
import { useNavigate, useLocation } from "react-router-dom";
import { UploadIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import { BeginAudit } from '../api/audit';

interface FileUploadProps {
  onUpload?: (files: File[]) => Promise<void>;
  maxFileSize?: number;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onUpload,
  maxFileSize = 50 * 1024 * 1024,
}) => {
  const [files, setFiles] = React.useState<File[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const orderId = searchParams.get("order_id");
  const digest = searchParams.get("digest");

  if (!orderId || !digest) {
    navigate('/');
    return;
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (!event.target.files) return;

    const allSelectedFiles = Array.from(event.target.files);

    const moveFiles = allSelectedFiles.filter(file => 
      file.name.toLowerCase().endsWith('.move')
    );

    if (moveFiles.length === 0) {
      setError('No .move files found in the selected folder.');
      setFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }
    
    const totalSize = moveFiles.reduce((acc, file) => acc + file.size, 0);
    if (totalSize > maxFileSize) {
       setError(`Total size of selected .move files (${formatFileSize(totalSize)}) exceeds maximum limit (${formatFileSize(maxFileSize)})`);
       setFiles([]); 
       if (fileInputRef.current) {
         fileInputRef.current.value = '';
       }
       return;
     }

    setFiles(moveFiles);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const clearFiles = () => {
    setFiles([]);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpload = async () => {
    if (!onUpload || files.length === 0) return;
    
    try {
      setIsUploading(true);
      setError(null);
      await onUpload(files);
      clearFiles();

      const result = await BeginAudit(orderId, digest, files);
      console.log("audit success",result);
      navigate('/result');
    } catch (err) {
      setError('Upload failed: ' + (err instanceof Error ? err.message : 'unknown error'));
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box className="file-upload-container">
      <Heading size="6" mb="4">Upload Folder Containing Move Files</Heading>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        {...{ webkitdirectory: "true" }}
      />

      <Flex gap="3" align="center" wrap="wrap">
        <Button
          onClick={handleButtonClick}
          disabled={isUploading}
          size="3"
        >
          <UploadIcon width="16" height="16" /> Select Folder
        </Button>

        {files.length > 0 && !isUploading && (
          <Button
            onClick={clearFiles}
            variant="outline"
            color="gray"
            size="3"
          >
            <CrossCircledIcon width="16" height="16" /> Clear Selection
          </Button>
        )}
        
        {files.length > 0 && !isUploading && onUpload && (
          <Button
            onClick={handleUpload}
            disabled={isUploading}
            size="3"
            color="green"
          >
            Submit Audit
          </Button>
        )}
        
        {isUploading && (
          <Text size="2" color="gray">Uploading...</Text>
        )}
      </Flex>

      {error && (
        <Box mt="3">
          <Text color="red" size="2">
            {error}
          </Text>
        </Box>
      )}

      {files.length > 0 && (
        <Box mt="5">
          <Heading size="4" mb="3">Detected Move Files ({files.length}):</Heading>
          <Box style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid var(--gray-a6)', borderRadius: 'var(--radius-3)', padding: 'var(--space-3)' }}>
            {files.map((file, index) => (
              <Text as="p" size="2" key={index} mb="1">
                {file.webkitRelativePath || file.name} <Text color="gray">({formatFileSize(file.size)})</Text>
              </Text>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default FileUpload;