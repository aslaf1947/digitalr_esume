import React from 'react'
import Nav from './Nav'
import Footer from './Footer'

export default function About() {
  return (
    <>
        <div style={{ fontFamily: "Inter", backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
    <Nav/>
    <div class="container-xxl py-6">
        <div class="container">
            <div class="row g-5">
                <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div class="position-relative overflow-hidden ps-5 pt-5 h-100" style={{minheight: "400px;"}}>
                        <img class="position-absolute w-100 h-100" src=" assets/img/about-1.png" alt="" style={{objectfit: "cover;"}}/>
                        <img class="position-absolute top-0 start-0 bg-white pe-3 pb-3" src=" assets/img/about-2.png" alt="" style={{width: "200px" , height: "200px;"}}/>
                    </div>
                </div>
                <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
                    <div class="h-100">
                        <h6 class="text-primary text-uppercase mb-2">About Us</h6>
                        <h1 class="display-6 mb-4">We Help You Build a Winning CV & Land the Job on the First Try</h1>
                        <p>We specialize in helping students and professionals craft compelling CVs that make a strong first impression.</p>
                        <p class="mb-4">Our goal is to ensure your resume passes the initial screening and gets you one step closer to your dream job.</p>
                        <div class="row g-2 mb-4 pb-2">
                            <div class="col-sm-6">
                                <i class="fa fa-check text-primary me-2"></i>Expert Resume Writers & Career Coaches
                            </div>
                            <div class="col-sm-6">
                                <i class="fa fa-check text-primary me-2"></i>Certified & Trusted Service
                            </div>
                            <div class="col-sm-6">
                                <i class="fa fa-check text-primary me-2"></i>Afordable plans 
                            </div>
                            <div class="col-sm-6">
                                <i class="fa fa-check text-primary me-2"></i>Real-Time Progress Tracking
                            </div>
                        </div>
                        <div class="row g-4">
                            <div class="col-sm-6">
                                <a class="btn btn-primary py-3 px-5" href="">Read More</a>
                            </div>
                            <div class="col-sm-6">
                                <a class="d-inline-flex align-items-center btn btn-outline-primary border-2 p-2" href="tel:+0123456789">
                                    <span class="flex-shrink-0 btn-square bg-primary">
                                        <i class="fa fa-phone-alt text-white"></i>
                                    </span>
                                    <span class="px-3">+012 345 6789</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container-xxl py-6">
            <div class="container">
                <div class="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{maxwidth:" 500px;"}}>
                    <h6 class="text-primary text-uppercase mb-2">Meet The Team</h6>
                    <h1 class="display-6 mb-4">We Have Great Experience  Trainer</h1>
                </div>
                <div class="row g-0 team-items">
                    <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                        <div class="team-item position-relative">
                            <div class="position-relative">
                                <img class="img-fluid" src=" assets/img/siva.jpeg" alt=""/>
                                <div class="team-social text-center">
                                    <a class="btn btn-square btn-outline-primary border-2 m-1" href=""><i class="fab fa-facebook-f"></i></a>
                                    <a class="btn btn-square btn-outline-primary border-2 m-1" href=""><i class="fab fa-twitter"></i></a>
                                    <a class="btn btn-square btn-outline-primary border-2 m-1" href=""><i class="fab fa-instagram"></i></a>
                                </div>
                            </div>
                            <div class="bg-light text-center p-4">
                                <h5 class="mt-2">Full Name</h5>
                                <span>Trainer</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                        <div class="team-item position-relative">
                            <div class="position-relative">
                                <img class="img-fluid" src=" assets/img/kailas.jpg" alt=""/>
                                <div class="team-social text-center">
                                    <a class="btn btn-square btn-outline-primary border-2 m-1" href=""><i class="fab fa-facebook-f"></i></a>
                                    <a class="btn btn-square btn-outline-primary border-2 m-1" href=""><i class="fab fa-twitter"></i></a>
                                    <a class="btn btn-square btn-outline-primary border-2 m-1" href=""><i class="fab fa-instagram"></i></a>
                                </div>
                            </div>
                            <div class="bg-light text-center p-4">
                                <h5 class="mt-2">Full Name</h5>
                                <span>Trainer</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                        <div class="team-item position-relative">
                            <div class="position-relative">
                                <img class="img-fluid" src=" assets/img/jobin.jpg" alt=""/>
                                <div class="team-social text-center">
                                    <a class="btn btn-square btn-outline-primary border-2 m-1" href=""><i class="fab fa-facebook-f"></i></a>
                                    <a class="btn btn-square btn-outline-primary border-2 m-1" href=""><i class="fab fa-twitter"></i></a>
                                    <a class="btn btn-square btn-outline-primary border-2 m-1" href=""><i class="fab fa-instagram"></i></a>
                                </div>
                            </div>
                            <div class="bg-light text-center p-4">
                                <h5 class="mt-2">Full Name</h5>
                                <span>Trainer</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
                        <div class="team-item position-relative">
                            <div class="position-relative">
                                <img class="img-fluid" src=" assets/img/rifa1.jpg" alt=""/>
                                <div class="team-social text-center">
                                    <a class="btn btn-square btn-outline-primary border-2 m-1" href=""><i class="fab fa-facebook-f"></i></a>
                                    <a class="btn btn-square btn-outline-primary border-2 m-1" href=""><i class="fab fa-twitter"></i></a>
                                    <a class="btn btn-square btn-outline-primary border-2 m-1" href=""><i class="fab fa-instagram"></i></a>
                                </div>
                            </div>
                            <div class="bg-light text-center p-4">
                                <h5 class="mt-2">Full Name</h5>
                                <span>Trainer</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
        <Footer/>
      </div>    
    </>
  )
}
