import React from 'react'
import '../../App.css'
import { Header, Dashboard, Footer } from '../../components'
import { useState, createContext } from 'react'

export const UserContext = createContext(null)
const Dream = () => {
  const [nftRoute, setNftRoute] = useState('')
  return (
    <UserContext.Provider value={{ nftRoute, setNftRoute }}>
      <div>
          <div className="gradient__bg">
            <Header />
            <Dashboard />
          </div>
          <Footer/>
      </div>
    </UserContext.Provider>
  );
}

export default Dream