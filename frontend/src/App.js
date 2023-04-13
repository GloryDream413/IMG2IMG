import React from 'react'
import './App.css'
import {Footer, Possibility, Header} from './containers'
import { Navbar,} from './components';
import './App.css'

const App = () => {
  return (
    <div>
        <div className="gradient__bg">
          <Navbar />
          <Header />
        </div>
        <Possibility/>
        <Footer/>
    </div>
  );
}

export default App