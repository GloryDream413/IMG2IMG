import React, { useCallback } from 'react';
import './dream.css';
import { useDropzone } from 'react-dropzone';
import { Link } from 'react-router-dom';

function UploadDropZone() {
  const onDrop = useCallback((acceptedFiles) => {
    // Handle the uploaded files here
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="upload-container">
      <div {...getRootProps()} className={`box-container ${isDragActive ? 'active' : ''}`}>
        <input {...getInputProps()} />
        <p>{isDragActive ? 'Drop the files here' : 'Drag and drop files here'}</p>
      </div>
    </div>
  );
}

export const Dream = () => {
  return (
    <div className="gpt3__header section__padding" id="home">
      <div className='generate'>
        <h1><b>Generating dream rooms <span>using AI</span> for everyone.</b></h1>
      </div>
      <div className='generate'>
        <button type="button" ><Link to="/dream">Redesign your image</Link></button>
      </div>
      <div className="gpt3__header-content">
        <div className="original">
          <h2>Input Prompt</h2>
          <UploadDropZone />
        </div>
        <div className="generated">
          <h2>Uploaded Image</h2>
          <div className='Uploaded'></div>
        </div>
      </div>
    </div>
  );
};
export default Dream;