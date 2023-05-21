import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Homepage, Dream } from './components'
const App = () => {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/dream" element={<Dream />} />
      </Routes>
    </Router>
  );
}
export default App