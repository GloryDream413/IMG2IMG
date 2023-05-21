import React, { useEffect, useCallback, useState } from 'react';
import './dream.css';
import { useDropzone } from 'react-dropzone';
import axios from 'axios'
import ClipLoader from "react-spinners/ClipLoader";
import image_mask from '../../assets/mask_image.png'
import { ToastContainer, toast } from 'react-toastify';

export const Dream = () => {
  const [pictureRoute, setPictureRoute] = useState('')
  const [maskRoute, setMaskRoute] = useState('')
  const [nftRoute1, setNftRoute1] = useState('')
  const [nftRoute2, setNftRoute2] = useState('')
  const [nftRoute3, setNftRoute3] = useState('')
  const [prompt, setPrompt] = useState('')
  const onPromptChange = (event) => {
    setPrompt(event.target.value);
  };
  
  useEffect(() => {
    const image = new Image();
    // Set the image source to the URL
    image.src = image_mask;
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
      setMaskRoute(dataUrl);
      // dataUrl is the URI-based data URL for the image in PNG format
    };
  }, []);

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
  const [bLoadingFlag, setLoadingFlag] = useState(false)

  const onGenerate = async () => {
    if(pictureRoute === '')
    {
      toast.error("Please upload image.");
      return;
    }

    if(prompt === '')
    {
      toast.error("Prompt is empty.");
      return;
    }
    setLoadingFlag(true);
    console.log("pictureRoute === ", pictureRoute);
    console.log("prmopt === ", prompt);
    console.log("image_mask === ", maskRoute);
    const response1 = await axios.post(
      'http://65.21.236.218:7777/getImage',
      {
        image_original : pictureRoute,
        prompt : prompt,
        image_mask : maskRoute
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    setNftRoute1(response1.data.response.output[0]);

    const response2 = await axios.post(
      'http://65.21.236.218:7777/getImage',
      {
        image_original : pictureRoute,
        prompt : prompt,
        image_mask : maskRoute
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    setNftRoute2(response2.data.response.output[0]);

    const response3 = await axios.post(
      'http://65.21.236.218:7777/getImage',
      {
        image_original : pictureRoute,
        prompt : prompt,
        image_mask : maskRoute
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    setNftRoute3(response3.data.response.output[0]);
    setLoadingFlag(false);
  };

  return (
    <div className="gpt3__header section__padding" id="home">
      <div className='generate'>
        <h1><b>Generating dream rooms <span>using AI</span> for everyone.</b></h1>
      </div>
      <div className='generate'>
        <button type="button" onClick={onGenerate}>Redesign your image</button>
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
          {(pictureRoute === '') &&
            <div className='Uploaded'></div>
          }
          {(pictureRoute !== '') &&
            <img src={pictureRoute} alt="ai" />
          }
          <div className="spinner-wrapper">
            {(bLoadingFlag === true) &&
              < ClipLoader
                color='#ffffff'
                loading={true}
                cssOverride={true}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            }
          </div>
        </div>
      </div>
      <div className="gpt3__header-content">
        {(nftRoute1 !== '') &&
          <div className="result1">
            <img src={nftRoute1} alt="ai" />
          </div>
        }

        {(nftRoute2 !== '') &&
          <div className="result1">
            <img src={nftRoute2} alt="ai" />
          </div>
        }

        {(nftRoute3 !== '') &&
          <div className="result1">
            <img src={nftRoute3} alt="ai" />
          </div>
        }
      </div>
    </div>
  );
};
export default Dream;