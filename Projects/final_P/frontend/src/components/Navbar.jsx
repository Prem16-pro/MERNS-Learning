import React, { useState } from "react";
import "../styles/Navbar.css";
import { Outlet, Link } from "react-router-dom";

const Navbar = () => {

const [stick,setStick] = useState(false);


  return (
    <>
      <div>
        <div className="Navbar">
          <div className="Navbar_MH">
            <div className="Navbar_MHeader">
              <Link to='/'><button>Calendar</button></Link>
            </div>
          </div>
          <div className="Navbar_Login">
            <Link to='/login'><button>Sign In</button></Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
