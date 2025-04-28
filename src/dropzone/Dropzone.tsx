import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  saveFile: (acceptedFiles: string | ArrayBuffer) => void;
}

export const Dropzone = ({ saveFile }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDrop = useCallback((acceptedFiles: any[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const binaryStr = reader.result;
        if (!binaryStr) {
          console.log("Error reading file");
          return;
        }
        saveFile(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, [saveFile]);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  );
};
