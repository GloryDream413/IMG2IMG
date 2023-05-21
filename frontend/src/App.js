import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Dream, Footer, Dashboard } from './components'
import { useState, createContext } from 'react'
import './App.css'
export const UserContext = createContext(null)
const App = () => {
  const [nftRoute, setNftRoute] = useState('')
  return (
    <UserContext.Provider value={{ nftRoute, setNftRoute }}>
      <div>
          <div className="gradient__bg">
            <Header />
            <Router>
              <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dream" element={<Dream />} />
              </Routes>
            </Router>
          </div>
          <Footer/>
      </div>
    </UserContext.Provider>
  );
}
export default App