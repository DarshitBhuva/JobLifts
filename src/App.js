// import { useState } from 'react';
import './App.css';
import './index.css';
import './style.css';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Profile from './components/Profile';
import React from 'react';
import { BrowserRouter , Routes, Route } from "react-router-dom"
import Jobs from './components/Jobs';


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
              <Route path="/signup" element={<Signup />}/>
              <Route path='/signin' element={<Signin />}/>
              <Route path='/fetchjobs' element={<Jobs />}/>
              <Route path='/profile' element={<Profile />}/>
            </Routes>
          </BrowserRouter>
        </div>

        <Footer/>
      {/* </Router> */}
    </>
  );
}

export default App;
