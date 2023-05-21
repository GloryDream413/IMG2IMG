import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Homepage } from './components'
const App = () => {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Homepage />} />
          {/* <Route path="/dream" component={AboutPage} /> */}
      </Routes>
    </Router>
  );
}
export default App