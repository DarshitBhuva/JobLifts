// import { useState } from 'react';
import './App.css';
import './index.css';
import './style.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Header from './components/Header';
import Profile from './components/Profile';
import RecruiterProfile from './components/RecruiterProfile';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Jobs from './components/Jobs';


function App() {
  // const [mode, setDarkMode] = useState('light');

  // const [userType, setuserType] = useState(localStorage.getItem('userType'));
  // console.log(userType);


  return (
    <>


      <BrowserRouter>
        <Navbar title="JobLifts" />
        <Routes>


          <Route exact path="/" element={<Header />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route path='/signin' element={<Signin />} />


          <Route path='/fetchjobs' element={<Jobs />} />
          {localStorage.getItem('userType') === "Applicant" && <Route path="/profile" element={<Profile />} />}
          {localStorage.getItem('userType') === "Recruiter" && <Route path='/profile' element={<RecruiterProfile />} />}
          {/* <Route path='/profile' element={localStorage.getItem('userType') === 'Applicant' ? <Profile /> : <RecruiterProfile />} /> */}
        </Routes>

      </BrowserRouter>


      <Footer />
    </>
  );
}

export default App;
