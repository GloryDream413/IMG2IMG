import React from 'react';
import possibility from '../../assets/possibility.jpg';
import './possibility.css';

const Possibility = () => (
  <div className="gpt3__possibility section__padding" id="possibility">
    <div className="gpt3__possibility-image">
      <img src={possibility} alt="possibility" />
    </div>
    <div className="gpt3__possibility-content">
      <h1 className="gradient__text">Generated Images</h1>
      <p>This platform generates images from original image and promt.</p>
    </div>
  </div>
);

export default Possibility;