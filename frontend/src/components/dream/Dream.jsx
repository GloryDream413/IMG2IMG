import React, { useCallback, useState } from 'react';
import './dream.css';
import { useDropzone } from 'react-dropzone';
import { Link } from 'react-router-dom';
export const Dream = () => {
  const [pictureRoute, setPictureRoute] = useState('')
  const [prompt, setPrompt] = useState('')
  const onPromptChange = (event) => {
    setPrompt(event.target.value);
  };
  
  const onDrop = useCallback((acceptedFiles) => {
    // Handle the uploaded files here
    console.log(acceptedFiles[0]);
    const file = acceptedFiles[0];
    const imageUrl = URL.createObjectURL(file);
    const image = new Image();
    // Set the image source to the URL
    image.src = imageUrl;

    // Wait for the image to load
    image.onload = function() {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      // Set the canvas dimensions to match the image dimensions
      canvas.width = image.width;
      canvas.height = image.height;
      // Draw the image on the canvas
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0);
      // Get the data URL for the canvas
      const dataUrl = canvas.toDataURL('image/png');
      setPictureRoute(dataUrl);
    };
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  
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
          <h2>Upload Image</h2>
          <div className="upload-container">
            <div {...getRootProps()} className={`box-container ${isDragActive ? 'active' : ''}`}>
              <input {...getInputProps()} />
              <p>{isDragActive ? 'Drop the file here' : 'Drag and drop file here'}</p>
            </div>
          </div>
          <h2>Input Prompt</h2>
          <textarea
            className="desc"
            placeholder="Enter your prompt"
            name="prompt"
            value={prompt}
            onChange={onPromptChange}
          ></textarea>
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