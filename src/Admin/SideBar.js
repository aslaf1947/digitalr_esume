import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function SideBar() {
  const location = useLocation();

  // Helper to check if the path matches the current URL
  const isActive = (path) => location.pathname === path ? 'nav-item nav-link active' : 'nav-item nav-link';

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
            <img className="rounded-circle" src="dash/img/user.jpg" alt="" style={{ width: "40px", height: "40px" }} />
            <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
          </div>
          <div className="ms-3">
            <h6 className="mb-0">Moosa</h6>
            <span>Admin</span>
          </div>
        </div>
        <div className="navbar-nav w-100">
          <Link to="/admin" className={isActive("/admin")}><i className="fa fa-tachometer-alt me-2"></i>Dashboard</Link>
          <Link to="/admintemplate" className={isActive("/admintemplate")}><i className="fa fa-file me-2"></i>Template</Link>
          <Link to="/jobapplicant" className={isActive("/jobapplicant")}><i className="fa fa-building me-2"></i>Companies</Link>
          <Link to="/user" className={isActive("/user")}><i className="fa fa-user me-2"></i>User</Link>
          <Link to="/feedback" className={isActive("/feedback")}><i className="fa fa-comment me-2"></i>Feedback</Link>
        </div>
      </nav>
    </div>
  );
}
