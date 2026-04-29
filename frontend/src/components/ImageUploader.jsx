import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FolderOpen } from 'lucide-react';
import clsx from 'clsx';

const ImageUploader = ({ onFileSelect }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
    noClick: true, // We have a separate button for clicking
  });

  return (
    <div 
      {...getRootProps()}
      className={clsx(
        "bg-white rounded-[2rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] p-12 h-full flex flex-col items-center justify-center transition-all duration-300",
        isDragActive ? "border-2 border-[#008f5d] bg-[#f0f8f4]" : "border border-[#e2ece6]"
      )}
    >
      <input {...getInputProps()} />
      
      <div className="w-16 h-16 bg-[#e4f0e9] rounded-2xl flex items-center justify-center mb-6">
        <UploadCloud className="w-8 h-8 text-[#008f5d]" />
      </div>
      
      <h2 className="text-2xl font-bold text-[#0e4e37] mb-2">Drag & Drop Crop Images</h2>
      <p className="text-[#5a8a72] text-sm mb-8 text-center">Support for high-res RAW, JPG, and multispectral TIFF</p>
      
      <button 
        onClick={open}
        className="flex items-center space-x-2 bg-[#063322] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#0a4a32] transition-colors"
      >
        <FolderOpen className="w-5 h-5" />
        <span>Select from Local Machine</span>
      </button>
    </div>
  );
};

export default ImageUploader;
