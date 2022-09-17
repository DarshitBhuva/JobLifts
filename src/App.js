// import { useState } from 'react';
import './App.css';
import './index.css';
import './style.css';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';

import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom"


function App() {
  // const [mode, setDarkMode] = useState('light');
  return (
    <>
      {/* <Router> */}
        <Navbar title="JobLifts" />
        {/* <Header /> */}
        <div>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Header />}/>
            </Routes>
            <Routes>
              <Route path="/" element={<Content />}/>
            </Routes>

            <Routes>
              <Route path="/signup" element={<Content />}/>
            </Routes>
          </BrowserRouter>
        </div>

        <Footer/>
      {/* </Router> */}
    </>
  );
}

export default App;
