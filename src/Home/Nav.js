import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Nav() {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("user")));

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0">
        <Link to="/" className="navbar-brand d-flex align-items-center border-end px-4 px-lg-5">
          <h2 className="m-0 display-5 text-#0C2B4B animated slideInDown mb-4">
            <i className="fa fa-briefcase text-primary me-2"></i>JOBCRAFT
          </h2>
        </Link>

        <button
          type="button"
          className="navbar-toggler me-4"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto p-4 p-lg-0 ">
            {auth == null ? (
              <>
                <NavLink to="/" className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}>
                  Home
                </NavLink>
                <div className="nav-item dropdown">
                  <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Form</a>
                  <div className="dropdown-menu bg-light m-0">
                    <NavLink to="/companyregister" className="dropdown-item">Applicant</NavLink>
                    <NavLink to="/registration" className="dropdown-item">User</NavLink>
                  </div>
                </div>
                <NavLink to="/login" className="btn nav-link">
                  Login
                </NavLink>
              </>
            ) : auth.status === 2 ? (
              <>
                <NavLink to="/" className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}>
                  Home
                </NavLink>
                <NavLink to="/job" className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}>
                  Job
                </NavLink>
                 <NavLink to="/atschecker" className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}>
                  ATS Checker
                </NavLink>
                <NavLink to="/template" className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}>
                  Templates
                </NavLink>
                 {/* <NavLink to="/exampletemp" className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}>
                  example
                </NavLink> */}
                
                <div className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="myDetailsDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    MyDetails
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="myDetailsDropdown">
                    <li>
                      <NavLink to="/userprofile" className={({ isActive }) => `dropdown-item ${isActive ? 'active' : ''}`}>
                        Profile
                      </NavLink>
                    </li>
                    {/* <li>
                      <NavLink to="/score" className={({ isActive }) => `dropdown-item ${isActive ? 'active' : ''}`}>
                        Score
                      </NavLink>
                    </li> */}
                    <li>
                      <NavLink to="/userfeedback" className={({ isActive }) => `dropdown-item ${isActive ? 'active' : ''}`}>
                        Feedback
                      </NavLink>
                    </li>
                  </ul>
                </div>

                <NavLink to="/application" className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}>
                  Application
                </NavLink>
                <NavLink to="/about" className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}>
                  About
                </NavLink>
                <NavLink to="/contact" className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}>
                  Contact
                </NavLink>

                <button onClick={handleLogout} className="btn py-4 border-0 bg-white">
                  <i className="fa fa-sign-out-alt fs-5 text-danger"></i>
                </button>
              </>
            ) : null}
          </div>
        </div>
      </nav>
    </>
  );
}
