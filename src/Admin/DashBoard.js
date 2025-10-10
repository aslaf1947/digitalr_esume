import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import NavBar from './NavBar';
import AdminFooter from './AdminFooter';

export default function DashBoard() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 200);
  }, []);

  const companies = [
    { name: "TechNova", rating: 9.5 },
    { name: "CodeCrafters", rating: 9.0 },
    { name: "ByteWorks", rating: 8.7 },
    { name: "DevSphere", rating: 8.4 },
    { name: "StackMint", rating: 8.1 },
  ];

  const maxRating = 10;

  return (
    <>
      <div className="container-xxl position-relative bg-white d-flex p-0">
        <SideBar />
        <div className="content">
          <NavBar />

          {/* Company Ratings Chart */}
          <div style={{ padding: "30px", backgroundColor: "#f9f9f9", borderRadius: "12px", fontFamily: "Arial, sans-serif", width: "100%", maxWidth: "600px", margin: "40px auto" }}>
            <h2 style={{ textAlign: "center", marginBottom: "25px", color: "#333" }}>
              🌟 Best-Rated Companies
            </h2>

            {companies.map((company, index) => (
              <div key={index} style={{ marginBottom: "20px" }}>
                <div style={{ marginBottom: "5px", fontWeight: "bold", color: "#444" }}>
                  {company.name} ({company.rating}/10)
                </div>
                <div style={{
                  backgroundColor: "#ddd",
                  height: "20px",
                  borderRadius: "10px",
                  overflow: "hidden"
                }}>
                  <div
                    style={{
                      width: loaded ? `${(company.rating / maxRating) * 100}%` : "0%",
                      height: "100%",
                      background: "linear-gradient(90deg, #fdd835, #fbc02d)",
                      borderRadius: "10px",
                      transition: "width 1s ease-out"
                    }}
                  ></div>
                </div>
              </div>
            ))}

            <style>{`
              @keyframes popFade {
                from { opacity: 0; transform: scale(0.9); }
                to { opacity: 1; transform: scale(1); }
              }
            `}</style>
          </div>

          {/* Other Cards and Widgets */}
          {/* Leave this part unchanged from your version — it’s well structured */}
          
          <div className="container-fluid pt-4 px-4">
            <div className="row g-4">

              {/* Messages Panel */}
              <div className="col-sm-12 col-md-6 col-xl-4">
                <div className="h-100 bg-light rounded p-4">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h6 className="mb-0">Companies & Users Messages</h6>
                    <a href="#">Show All</a>
                  </div>

                  <div className="d-flex align-items-center border-bottom py-3">
                    <img className="rounded-circle flex-shrink-0" src="dash/img/company.png" alt="Company" style={{ width: "40px", height: "40px" }} />
                    <div className="w-100 ms-3">
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-0 text-primary">TechSoft Inc</h6>
                        <small className="text-muted">10 minutes ago</small>
                      </div>
                      <span>Looking to hire a front-end developer.</span>
                    </div>
                  </div>

                  <div className="d-flex align-items-center border-bottom py-3">
                    <img className="rounded-circle flex-shrink-0" src="dash/img/user.jpg" alt="User" style={{ width: "40px", height: "40px" }} />
                    <div className="w-100 ms-3">
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-0 text-warning">Jane Smith</h6>
                        <small className="text-muted">20 minutes ago</small>
                      </div>
                      <span>Updated her resume for review.</span>
                    </div>
                  </div>

                  <div className="d-flex align-items-center border-bottom py-3">
                    <img className="rounded-circle flex-shrink-0" src="dash/img/company2.png" alt="Company" style={{ width: "40px", height: "40px" }} />
                    <div className="w-100 ms-3">
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-0 text-primary">CodeCrafters</h6>
                        <small className="text-muted">30 minutes ago</small>
                      </div>
                      <span>Interested in premium employer features.</span>
                    </div>
                  </div>

                  <div className="d-flex align-items-center pt-3">
                    <img className="rounded-circle flex-shrink-0" src="dash/img/user2.jpg" alt="User" style={{ width: "40px", height: "40px" }} />
                    <div className="w-100 ms-3">
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-0 text-warning">Ali Raza</h6>
                        <small className="text-muted">45 minutes ago</small>
                      </div>
                      <span>Requested job recommendation assistance.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Companies List */}
              <div className="col-sm-12 col-md-6 col-xl-4">
                <div className="h-100 bg-light rounded p-4">
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <h6 className="mb-0">Job Companies</h6>
                    <a href="#">View All</a>
                  </div>
                  <ul className="list-group list-group-flush">
                    {["Google", "Microsoft", "Amazon", "Apple", "Netflix", "TCS", "Infosys", "IBM", "Wipro"].map((name, i) => (
                      <li key={i} className="list-group-item d-flex align-items-center">
                        <i className={`fa fa-building me-2 text-${["primary", "success", "danger", "warning", "info", "warning", "secondary", "dark", "primary"][i]}`}></i> {name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Technologies List */}
              <div className="col-sm-12 col-md-6 col-xl-4">
                <div className="h-100 bg-light rounded p-4">
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <h6 className="mb-0">Top Trending Technologies</h6>
                    <a href="#">See All</a>
                  </div>
                  <ul className="list-group list-group-flush">
                    {[
                      ["Artificial Intelligence (AI)", "rocket", "warning", "🔥"],
                      ["Web3 & Blockchain", "code", "primary", "New"],
                      ["Cloud Native DevOps", "cloud", "success", "In Demand"],
                      ["Microservices Architecture", "cubes", "info", "Hot"],
                      ["Machine Learning (ML)", "robot", "danger", "🔥"],
                      ["Data Engineering", "database", "primary", "Booming"],
                      ["Natural Language Processing", "brain", "warning", "Trending"],
                      ["Cybersecurity", "shield-alt", "success", "Essential"]
                    ].map(([tech, icon, badge, tag], i) => (
                      <li key={i} className="list-group-item d-flex justify-content-between align-items-center bg-light border-bottom">
                        <span><i className={`fa fa-${icon} text-${badge} me-2`}></i>{tech}</span>
                        <span className={`badge bg-${badge} ${badge === "warning" ? "text-dark" : ""}`}>{tag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>

          <AdminFooter />
        </div>
      </div>
    </>
  );
}
