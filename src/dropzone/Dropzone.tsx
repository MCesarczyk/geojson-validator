import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  handleUpload: (payload: { file: string | ArrayBuffer; name: string }) => void;
  handleError?: (error: string) => void;
  filename?: string;
}

export const Dropzone = ({ handleUpload, handleError, filename }: Props) => {
  const onDrop = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (acceptedFiles: any[]) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => {
          console.log("file reading has failed");
          if (handleError) {
            handleError("Error reading file");
          }
        };
        reader.onload = () => {
          const binaryStr = reader.result;
          if (!binaryStr) {
            console.log("Error reading file");
            return;
          }
          handleUpload({ file: binaryStr, name: file.name });
        };
        reader.readAsArrayBuffer(file);
      });
    },
    [handleError, handleUpload]
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>
        {filename || "Drag 'n' drop some files here, or click to select files"}
      </p>
    </div>
  );
};
