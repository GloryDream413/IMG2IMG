import React from 'react';
import { useState } from "react";
import './header.css';
import axios from 'axios'
import ai from '../../assets/ai.png'
import ClipLoader from "react-spinners/ClipLoader";

export const Header = () => {
  const [prompt, setPrompt] = useState('')
  const onPromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const [pictureRoute, setPictureRoute] = useState('')
  const [bLoadingFlag, setLoadingFlag] = useState(false)

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setPictureRoute(imageUrl);
  }

  const onUpload = async () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.addEventListener('change', handleFileUpload);
    fileInput.click();
  };

  const onGenerate = async () => {
    setLoadingFlag(true);
    const response = await axios.post(
      'http://65.21.236.218:7777/getImage',
      {
        image : pictureRoute,
        prompt : prompt
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    setPictureRoute(response.data.response.output[0]);
    setLoadingFlag(false);
  };

  return (
    <div className="gpt3__header section__padding" id="home">
      <div className="gpt3__header-content">
        <h1 className="gradient__text">Original Image</h1>
        <div className="gpt3__header-content__input">
          <button type="button" onClick={onUpload}>Upload</button>
        </div>
        <br />
        <textarea
          className="desc"
          placeholder="Enter your prompt"
          name="prompt"
          value={prompt}
          onChange={onPromptChange}
        >
        </textarea>

        <div className="gpt3__header-content__input">
          <button type="button" onClick={onGenerate}>Generate</button>
        </div>
      </div>

      <div className="gpt3__header-image">
        {(pictureRoute === '') &&
          <img src={ai} alt="ai" />
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
  );
};

export default Header;