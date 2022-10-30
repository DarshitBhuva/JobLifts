import React, {useState, useEffect} from 'react'
import { NavLink, Link } from 'react-router-dom'


export default function Navbar(props) {

    const [isLoggedin, setIsLoggedIn] = useState(true);
    const [email, setEmail] = useState(localStorage.getItem("email"));

    const logout = () => {
        console.log(localStorage.getItem("token"));
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        setIsLoggedIn(false);
    }

    const login = () => {
        
            console.log("hello");
        
            setIsLoggedIn(true);
        

    }

    useEffect(()=> {
       
        
    }, [isLoggedin, email]);

    return (
        <div>
            {/* <BrowserRouter> */}
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <NavLink className="navbar-brand" to="/">{props.title}</NavLink>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/">Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="jobs.html">Jobs</a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" href='/profile'>Profile</a>
                                </li>
                                <li className="nav-item mt-1">
                                    <NavLink className="nav-link" to='/cart'><i className="fa fa-bookmark-o" aria-hidden="true"></i></NavLink>
                                </li>
                            </ul>
                            <p className='mx-5'>{localStorage.getItem("email")}</p>
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <a href="/" className="btn btn-sm btn-primary mt-2 mx-2" Style="height: 32px; width: 30%;">Search</a>
                            </form>
                            
                            {!isLoggedin ? (
                                <>
                                   
                                    <NavLink className="btn btn-sm btn-primary mx-2" to="/signin">Sign in</NavLink>
                                    <NavLink  to="/signup" className="btn btn-sm btn-primary mx-2">Sign up</NavLink>
                                </>

                            ) : (
                                <>
                                    
                                    <button className="btn btn-sm btn-primary mx-2" onClick={logout}>Logout</button>
                                </>
                            )}
                           
                            
                            <p></p>
                        </div>
                    </div>
                </nav>
               

            {/* </BrowserRouter> */}
        </div>
    )
}
