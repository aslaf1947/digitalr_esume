import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function SideBar() {
  const location = useLocation();
  const [auth] = useState(JSON.parse(localStorage.getItem("user")));
  const [profile, setProfile] = useState({});

  useEffect(() => {
    if (!auth?.regid) {
      console.error('No regid found in auth:', auth);
      return;
    }

    const ids = { auth: auth.regid };

    fetch('http://localhost:5000/demo/profilecreate', {
      method: 'POST',
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ids)
    })
      .then(res => res.json())
      .then(result => {
        setProfile(Array.isArray(result) ? result[0] : result);
      })
      .catch(error => console.error('Error fetching profile:', error));
  }, [auth]);

  const isActive = (path) =>
    location.pathname === path ? 'nav-item nav-link active' : 'nav-item nav-link';

  return (
    <div className="sidebar pe-4 pb-3">
      <nav className="navbar bg-light navbar-light">
        <Link to="/admin" className="navbar-brand mx-4 mb-3">
          <h3 className="text-primary">
            <i className="fa fa-user-tie me-2"></i>JOBCRAFT
          </h3>
        </Link>
        <div className="d-flex align-items-center ms-4 mb-4">
          <div className="position-relative">
            {auth.regType === "applicant" && profile.regid?.image && (
              <img
                className="rounded-circle"
                src={`http://localhost:5000/assets/${profile.regid?.image}`}
                alt="Profile"
                style={{ width: "40px", height: "40px" }}
              />
            )}
            <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
          </div>
          <div className="ms-3">
            <h6 className="mb-0">{profile.regid?.ceoName || 'N/A'}</h6>
            <span>Company CEO</span>
          </div>
        </div>
        <div className="navbar-nav w-105">
          <Link to="/" className={isActive("/admin")}>
            <i className="fa fa-tachometer-alt me-2"></i>Dashboard
          </Link>
          <Link to="/companyjob" className={isActive("/companyjob")}>
            <i className="fa fa-building me-2"></i>JOB
          </Link>
          <Link to="/companyapply" className={isActive("/companyapply")}>
            <i className="fa fa-user me-2"></i>Applied Jobs
          </Link>
          <Link to="/companytrack" className={isActive("/user")}>
            <i className="fa fa-user me-2"></i>Application Tracking
          </Link>
          <Link to="/companyfeedback" className={isActive("/companyfeedback")}>
            <i className="fa fa-comment me-2"></i>Feedback
          </Link>
        </div>
      </nav>
    </div>
  );
}
