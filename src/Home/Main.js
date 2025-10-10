import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import Chatbot from "./Chatbot";

export default function Main() {
  const handleAlert = () => {
    alert("please login first");
  };
  return (
    <>
        <div style={{ fontFamily: "Inter", backgroundColor: "#f4f6f8", minHeight: "100vh" }}>

      <Nav />
      <div class="container-fluid p-0 wow fadeIn" data-wow-delay="0.1s">
        <div
          id="header-carousel"
          class="carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img class="w-60" src="assets/img/carousel-1.png" alt="Image" />
              <div class="carousel-caption">
                <div class="container">
                  <div class="row justify-content-center">
                    <div class="col-lg-7">
                      <h1 class="display-2 text-light mb-5 animated slideInDown">
                        Choose Your CV
                      </h1>
                      <a href="" class="btn btn-primary py-sm-3 px-sm-5">
                        Learn More
                      </a>
                      <a
                        href=""
                        class="btn btn-light py-sm-3 px-sm-5 ms-3"
                        // onClick={handleAlert}
                      >
                        CV
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <img class="w-100" src="assets/img/carousel-2.png" alt="Image" />
              <div class="carousel-caption">
                <div class="container">
                  <div class="row justify-content-center">
                    <div class="col-lg-7">
                      <h1 class="display-2 text-light mb-5 animated slideInDown">
                        Find Your Dream Job
                      </h1>
                      <a href="" class="btn btn-primary py-sm-3 px-sm-5">
                        Learn More
                      </a>
                      <a
                        href=""
                        class="btn btn-light py-sm-3 px-sm-5 ms-3"
                        onClick={handleAlert}
                      >
                        Job
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div class="container-fluid facts py-5 pt-lg-0">
        <div class="container py-5 pt-lg-0">
          <div class="row gx-0">
            <div class="col-lg-4 wow fadeIn" data-wow-delay="0.1s">
              <div
                class="bg-white shadow d-flex align-items-center h-100 p-4"
                style={{ minheight: "150px" }}
              >
                <div class="d-flex">
                  <div class="flex-shrink-0 btn-lg-square bg-primary">
                    <i class="fa fa-file text-white"></i>
                  </div>
                  <div class="ps-4">
                    <h5>Easy Resume Creation </h5>
                    <span>
                      Craft your professional CV effortlessly with our
                      user-friendly builder.Stand out to employers without the
                      stress.
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 wow fadeIn" data-wow-delay="0.3s">
              <div
                class="bg-white shadow d-flex align-items-center h-100 p-4"
                style={{ minheight: "150px;" }}
              >
                <div class="d-flex">
                  <div class="flex-shrink-0 btn-lg-square bg-primary">
                    <i class="fa fa-graduation-cap text-white"></i>
                  </div>
                  <div class="ps-4">
                    <h5>Certified Career Experts</h5>
                    <span>
                      Get guidance from certified resume experts and career
                      advisors.We help highlight what makes you unique.
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 wow fadeIn" data-wow-delay="0.5s">
              <div
                class="bg-white shadow d-flex align-items-center h-100 p-4"
                style={{ minheight: " 150px;" }}
              >
                <div class="d-flex">
                  <div class="flex-shrink-0 btn-lg-square bg-primary">
                    <i class="fa fa-check text-white"></i>
                  </div>
                  <div class="ps-4">
                    <h5>Land Your Dream Job</h5>
                    <span>
                      Apply confidently with a CV that gets results.We connect
                      you with job opportunities that match your skills.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-xxl py-6">
        <div class="container">
          <div class="row g-5">
            <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
              <div
                class="position-relative overflow-hidden ps-5 pt-5 h-100"
                style={{ minheight: "400px;" }}
              >
                <img
                  class="position-absolute w-100 h-100"
                  src=" assets/img/about-1.png"
                  alt=""
                  style={{ objectfit: "cover;" }}
                />
                <img
                  class="position-absolute top-0 start-0 bg-white pe-3 pb-3"
                  src=" assets/img/about-2.png"
                  alt=""
                  style={{ width: "200px", height: "200px;" }}
                />
              </div>
            </div>
            <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
              <div class="h-100">
                <h6 class="text-primary text-uppercase mb-2">About Us</h6>
                <h1 class="display-6 mb-4">
                  We Help You Build a Winning CV & Land the Job on the First Try
                </h1>
                <p>
                  We specialize in helping students and professionals craft
                  compelling CVs that make a strong first impression.
                </p>
                <p class="mb-4">
                  Our goal is to ensure your resume passes the initial screening
                  and gets you one step closer to your dream job.
                </p>
                <div class="row g-2 mb-4 pb-2">
                  <div class="col-sm-6">
                    <i class="fa fa-check text-primary me-2"></i>Expert Resume
                    Writers & Career Coaches
                  </div>
                  <div class="col-sm-6">
                    <i class="fa fa-check text-primary me-2"></i>Certified &
                    Trusted Service
                  </div>
                  <div class="col-sm-6">
                    <i class="fa fa-check text-primary me-2"></i>Afordable plans
                  </div>
                  <div class="col-sm-6">
                    <i class="fa fa-check text-primary me-2"></i>Real-Time
                    Progress Tracking
                  </div>
                </div>
                <div class="row g-4">
                  <div class="col-sm-6">
                    <a class="btn btn-primary py-3 px-5" href="">
                      Read More
                    </a>
                  </div>
                  <div class="col-sm-6">
                    <a
                      class="d-inline-flex align-items-center btn btn-outline-primary border-2 p-2"
                      href="tel:+0123456789"
                    >
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
      <div class="container-xxl courses my-6 py-6 pb-0">
        <div class="container">
          <div
            class="text-center mx-auto mb-5 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxwidth: "500px;" }}
          >
            <h6 class="text-primary text-uppercase mb-2">Templates</h6>
            <h1 class="display-6 mb-4">Sample Templates Design</h1>
          </div>
          <div class="row g-4 justify-content-center">
            <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
              <div class="courses-item d-flex flex-column bg-white overflow-hidden h-100">
                <div class="position-relative mt-auto">
                  <img
                    class="img-fluid"
                    src=" assets/img/template-1.png"
                    alt=""
                  />
                  <div class="courses-overlay">
                    <a class="btn btn-outline-primary border-2" href="">
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
              <div class="courses-item d-flex flex-column bg-white overflow-hidden h-100">
                <div class="position-relative mt-auto">
                  <img
                    class="img-fluid"
                    src=" assets/img/template-2.png"
                    alt=""
                  />
                  <div class="courses-overlay">
                    <a class="btn btn-outline-primary border-2" href="">
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
              <div class="courses-item d-flex flex-column bg-white overflow-hidden h-100">
                <div class="position-relative mt-auto">
                  <img
                    class="img-fluid"
                    src=" assets/img/template-3.png"
                    alt=""
                  />
                  <div class="courses-overlay">
                    <a class="btn btn-outline-primary border-2" href="">
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-8 my-6 mb-0 wow fadeInUp" data-wow-delay="0.1s">
              <div class="bg-primary text-center p-5">
                <h1 class="mb-4">Feedback</h1>
                <form>
                  <div class="row g-3">
                    <div class="col-sm-6">
                      <div class="form-floating">
                        <input
                          type="text"
                          class="form-control border-0"
                          id="gname"
                          placeholder="Gurdian Name"
                        />
                        <label for="gname">Your Name</label>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-floating">
                        <input
                          type="email"
                          class="form-control border-0"
                          id="gmail"
                          placeholder="Gurdian Email"
                        />
                        <label for="gmail">Your Email</label>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="form-floating">
                        <textarea
                          class="form-control border-0"
                          placeholder="Leave a message here"
                          id="message"
                          style={{ height: "100px" }}
                        ></textarea>
                        <label for="message">Message</label>
                      </div>
                    </div>
                    <div class="col-12">
                      <button class="btn btn-dark w-100 py-3" type="submit">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-xxl py-6">
        <div class="container">
          <div class="row g-5">
            <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
              <h6 class="text-primary text-uppercase mb-2">Why Choose Us!</h6>
              <h1 class="display-6 mb-4">Best Job Finder Platform</h1>
              <p class="mb-5">
                We simplify your job search with smart tools, expert support,
                and access to the best employers in your industry.
              </p>
              <div class="row gy-5 gx-4">
                <div class="col-sm-6 wow fadeIn" data-wow-delay="0.1s">
                  <div class="d-flex align-items-center mb-3">
                    <div class="flex-shrink-0 btn-square bg-primary me-3">
                      <i class="fa fa-check text-white"></i>
                    </div>
                    <h5 class="mb-0">Verified & Licensed Platform</h5>
                  </div>
                  <span>
                    Trustworthy and secure — we work only with genuine employers
                    and verified job listings.s
                  </span>
                </div>
                <div class="col-sm-6 wow fadeIn" data-wow-delay="0.2s">
                  <div class="d-flex align-items-center mb-3">
                    <div class="flex-shrink-0 btn-square bg-primary me-3">
                      <i class="fa fa-check text-white"></i>
                    </div>
                    <h5 class="mb-0">Real-Time Application Tracking</h5>
                  </div>
                  <span>
                    Track your job applications every step of the way with our
                    live status updates.
                  </span>
                </div>
                <div class="col-sm-6 wow fadeIn" data-wow-delay="0.3s">
                  <div class="d-flex align-items-center mb-3">
                    <div class="flex-shrink-0 btn-square bg-primary me-3">
                      <i class="fa fa-check text-white"></i>
                    </div>
                    <h5 class="mb-0">Affordable Premium Plans</h5>
                  </div>
                  <span>
                    Boost your visibility and get noticed — all at
                    budget-friendly rates.
                  </span>
                </div>
                <div class="col-sm-6 wow fadeIn" data-wow-delay="0.4s">
                  <div class="d-flex align-items-center mb-3">
                    <div class="flex-shrink-0 btn-square bg-primary me-3">
                      <i class="fa fa-check text-white"></i>
                    </div>
                    <h5 class="mb-0">Expert Career Guidance</h5>
                  </div>
                  <span>
                    Get support from experienced career coaches and resume
                    professionals to increase your chances of landing the job.
                  </span>
                </div>
              </div>
            </div>
            <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
              <div
                class="position-relative overflow-hidden pe-5 pt-5 h-100"
                style={{ minheight: " 400px;" }}
              >
                <img
                  class="position-absolute w-100 h-100"
                  src=" assets/img/about-1.png"
                  alt=""
                  style={{ objectfit: "cover;" }}
                />
                <img
                  class="position-absolute top-0 end-0 bg-white ps-3 pb-3"
                  src=" assets/img/about-2.png"
                  alt=""
                  style={{ width: "200px", height: "200px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-xxl py-6">
        <div class="container">
          <div
            class="text-center mx-auto mb-5 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxwidth: " 500px;" }}
          >
            <h6 class="text-primary text-uppercase mb-2">Meet The Team</h6>
            <h1 class="display-6 mb-4">We Have Great Experience Trainer</h1>
          </div>
          <div class="row g-0 team-items">
            <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
              <div class="team-item position-relative">
                <div class="position-relative">
                  <img class="img-fluid" src=" assets/img/siva.jpeg" alt="" />
                  <div class="team-social text-center">
                    <a
                      class="btn btn-square btn-outline-primary border-2 m-1"
                      href=""
                    >
                      <i class="fab fa-facebook-f"></i>
                    </a>
                    <a
                      class="btn btn-square btn-outline-primary border-2 m-1"
                      href=""
                    >
                      <i class="fab fa-twitter"></i>
                    </a>
                    <a
                      class="btn btn-square btn-outline-primary border-2 m-1"
                      href=""
                    >
                      <i class="fab fa-instagram"></i>
                    </a>
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
                  <img class="img-fluid" src=" assets/img/kailas.jpg" alt="" />
                  <div class="team-social text-center">
                    <a
                      class="btn btn-square btn-outline-primary border-2 m-1"
                      href=""
                    >
                      <i class="fab fa-facebook-f"></i>
                    </a>
                    <a
                      class="btn btn-square btn-outline-primary border-2 m-1"
                      href=""
                    >
                      <i class="fab fa-twitter"></i>
                    </a>
                    <a
                      class="btn btn-square btn-outline-primary border-2 m-1"
                      href=""
                    >
                      <i class="fab fa-instagram"></i>
                    </a>
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
                  <img class="img-fluid" src=" assets/img/jobin.jpg" alt="" />
                  <div class="team-social text-center">
                    <a
                      class="btn btn-square btn-outline-primary border-2 m-1"
                      href=""
                    >
                      <i class="fab fa-facebook-f"></i>
                    </a>
                    <a
                      class="btn btn-square btn-outline-primary border-2 m-1"
                      href=""
                    >
                      <i class="fab fa-twitter"></i>
                    </a>
                    <a
                      class="btn btn-square btn-outline-primary border-2 m-1"
                      href=""
                    >
                      <i class="fab fa-instagram"></i>
                    </a>
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
                  <img class="img-fluid" src=" assets/img/rifa1.jpg" alt="" />
                  <div class="team-social text-center">
                    <a
                      class="btn btn-square btn-outline-primary border-2 m-1"
                      href=""
                    >
                      <i class="fab fa-facebook-f"></i>
                    </a>
                    <a
                      class="btn btn-square btn-outline-primary border-2 m-1"
                      href=""
                    >
                      <i class="fab fa-twitter"></i>
                    </a>
                    <a
                      class="btn btn-square btn-outline-primary border-2 m-1"
                      href=""
                    >
                      <i class="fab fa-instagram"></i>
                    </a>
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
      <Chatbot />
      <Footer />
      </div>
    </>
  );
}
