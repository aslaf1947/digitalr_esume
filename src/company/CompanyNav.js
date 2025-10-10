import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
    const handlLogout = () => {
        localStorage.clear();
        window.location.href = "/";
    };

    return (
        <>
            <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0">
                <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
                    <h2 className="text-primary mb-0"><i className="fa fa-hashtag"></i></h2>
                </a>
                <a href="#" className="sidebar-toggler flex-shrink-0">
                    <i className="fa fa-bars"></i>
                </a>
                <form className="d-none d-md-flex ms-4">
                    <input className="form-control border-0" type="search" placeholder="Search" />
                </form>

                <div className="navbar-nav align-items-center ms-auto">
                    <Link to='/companyprofile' className="nav-link d-flex align-items-center gap-2 text-dark">
                        <i className="fa fa-user-circle fs-4"></i>
                        <span className="d-none d-lg-inline">Profile</span>
                    </Link>

                    {/* Messages */}
                    <a href="#" className="nav-link">
                        <Link to='/companyreply' className="nav-link">
                        <i className="fa fa-envelope me-lg-2"></i>
                        <span className="d-none d-lg-inline">Message</span></Link>
                    </a>

                    {/* Notifications */}
                    <a href="#" className="nav-link">
                        <i className="fa fa-bell me-lg-2"></i>
                        <span className="d-none d-lg-inline">Notification</span>
                       
                    </a>

                    {/* User Avatar & Logout */}
                    <div className="d-flex align-items-center gap-3 ms-3">
                        {/* <img src="dash/img/user.jpg" alt="User" className="rounded-circle" style={{ width: "40px", height: "40px" }} />
                        <span className="fw-semibold">Moosa</span> */}
                        <a href="#" className="text-decoration-none text-dark">
                            <i className="fa fa-cog fs-5"></i>
                        </a>
                        <a href="#" className="text-decoration-none text-danger" onClick={handlLogout}>
                            <i className="fa fa-sign-out-alt fs-5"></i>
                        </a>
                    </div>
                </div>
            </nav>
        </>
    );
}
