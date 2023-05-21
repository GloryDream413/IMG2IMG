import React from 'react'
import '../../App.css'
import {Footer, Header, Navbar} from '../../components'
import '../../App.css'
import { useState, createContext } from 'react'

export const UserContext = createContext(null)
const Homepage = () => {
  const [nftRoute, setNftRoute] = useState('')
  return (
    <UserContext.Provider value={{ nftRoute, setNftRoute }}>
      <div>
          <div className="gradient__bg">
            <Navbar />
            <Header />
          </div>
          <Footer/>
      </div>
    </UserContext.Provider>
  );
}

export default Homepage