// import React, { useState, useEffect } from "react";
// import Nav from "./Nav";
// import Footer from "./Footer";
// import { Link } from "react-router-dom";

// const ApplicationTracking = () => {
//   const [refersh, setRefersh] = useState(0);
//   const [searchText, setSearchText] = useState("");
//   const [jobs, setJobs] = useState([]);
//   const [selectedFilter, setSelectedFilter] = useState("");
//   const [companyImages, setCompanyImages] = useState({});
//   const [jobStatus, setJobStatus] = useState({});
//   const [appliedJobs, setAppliedJobs] = useState(() => {
//     const saved = localStorage.getItem("appliedJobs");
//     return saved ? JSON.parse(saved) : [];
//   });

//   const url = "http://localhost:5000/";
//   const filters = ["Full-time", "Part-time", "Work from Home", "Remote"];

//   const user = JSON.parse(localStorage.getItem("user"));
//   const userId = user?.regid?._id;

//   useEffect(() => {
//     if (!userId) return;

//     fetch(`http://localhost:5000/demo/jobfullview/${userId}`)
//       .then((res) => res.json())
//       .then((result) => {
//         if (Array.isArray(result)) {
//           setJobs(result);
//         } else {
//           console.error("Expected array but got:", result);
//           setJobs([]);
//         }
//       })
//       .catch((e) => console.error("Failed to fetch jobs:", e));
//   }, [refersh]);

//   useEffect(() => {
//     if (!userId) return;

//     fetch("http://localhost:5000/demo/appliedjobs", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ userid: userId }),
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         const appliedJobsArr = result.map((el) => el.postid);
//         const jobStatusObject = {};
//         result.forEach((el) => {
//           jobStatusObject[el.postid] = el;
//         });
//         setAppliedJobs(appliedJobsArr);
//         setJobStatus(jobStatusObject);
//       })
//       .catch((e) => console.error("Failed to fetch applied jobs:", e));
//   }, []);

//   useEffect(() => {
//     fetch("http://localhost:5000/demo/imagefullview")
//       .then((res) => res.json())
//       .then((result) => {
//         const imageMap = {};
//         result.forEach((entry) => {
//           if (entry.rid && entry.rid._id) {
//             imageMap[entry.rid._id] = entry.image;
//           }
//         });
//         setCompanyImages(imageMap);
//       })
//       .catch((err) => console.error("Error fetching images:", err));
//   }, [refersh]);

//   const [visible, setVisible] = useState(false);
//   useEffect(() => {
//     setVisible(true);
//   }, []);

//   const fadeIn = {
//     opacity: visible ? 1 : 0,
//     transition: "opacity 1s ease-in",
//   };

//   const slideIn = {
//     transform: visible ? "translateY(0)" : "translateY(50px)",
//     opacity: visible ? 1 : 0,
//     transition: "transform 0.8s ease-out, opacity 0.8s ease-out",
//   };

//   const pulse = (index) => ({
//     animation: `pulse 2s infinite ${index * 0.2}s`,
//     transform: "scale(1)",
//     transition: "transform 0.3s ease",
//   });

//   const filteredJobs = Array.isArray(jobs)
//     ? selectedFilter
//       ? jobs.filter((job) =>
//           job.cateogry?.toLowerCase().includes(selectedFilter.toLowerCase())
//         )
//       : jobs
//     : [];

//   const sortedJobs = Array.isArray(filteredJobs)
//     ? filteredJobs.sort((a, b) => {
//         const dateA = new Date(a.postedDate);
//         const dateB = new Date(b.postedDate);
//         return dateB - dateA;
//       })
//     : [];

//   const searchFilteredJobs = Array.isArray(sortedJobs)
//     ? sortedJobs.filter(
//         (job) =>
//           job.title?.toLowerCase().includes(searchText.toLowerCase()) ||
//           job.rid?.companyName?.toLowerCase().includes(searchText.toLowerCase()) ||
//           job.cateogry?.toLowerCase().includes(searchText.toLowerCase())
//       )
//     : [];

//   return (
//     <div style={{ fontFamily: "Inter", backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
//       <header
//         style={{
//           background: "linear-gradient(135deg,#F3BD00, #f7a2a1)",
//           color: "white",
//           padding: "20px 0",
//           textAlign: "center",
//           ...fadeIn,
//         }}
//       >
//         <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 20px" }}>
//           <Nav />
//           <div style={{ padding: "60px 0", textAlign: "center" }}>
//             <h1 style={{ fontSize: "42px", marginBottom: "20px", ...slideIn }}>
//               Your Job Applications
//             </h1>
//           </div>
//         </div>
//       </header>

//       {/* Job Listings */}
//       <section style={{ padding: "50px 0", background: "white", ...fadeIn }}>
//         <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
//               gap: "25px",
//             }}
//           >
//             {searchFilteredJobs.map((job, index) =>
//               jobStatus[job._id]?.status === "approved" ? (
//                 <div
//                   key={job._id}
//                   style={{
//                     background: "white",
//                     borderRadius: "8px",
//                     overflow: "hidden",
//                     boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)",
//                     ...pulse(index),
//                   }}
//                 >
//                   <div
//                     style={{
//                       padding: "20px",
//                       borderBottom: "1px solid #eee",
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "10px",
//                     }}
//                   >
//                     <img
//                       className="rounded-circle"
//                       src={job.rid && job.rid.image ? url + job.rid.image : 'n/a'}
//                       alt="Company Logo"
//                       style={{ width: "40px", height: "40px" }}
//                     />
//                     <div>
//                       <h3 style={{ fontSize: "18px", marginBottom: "5px" }}>{job.title}</h3>
//                       <p style={{ color: "blue", fontSize: "15px" }}>
//                         {job.rid ? job.rid.companyName : "n/a"}
//                       </p>
//                     </div>
//                   </div>
//                   <div style={{ padding: "20px" }}>
//                     <p>📍 {job.location}</p>
//                     <p>💰 {job.salary}</p>
//                     <p>🕒 {job.cateogry}</p>
//                     <div>
//                       <span
//                         style={{
//                           background: "#f0f0f0",
//                           padding: "5px 10px",
//                           borderRadius: "15px",
//                           fontSize: "12px",
//                         }}
//                       >
//                         {job.description}
//                       </span>
//                     </div>
//                   </div>
//                   <div
//                     style={{
//                       padding: "15px 20px",
//                       background: "#f9f9f9",
//                       borderTop: "1px solid #eee",
//                       display: "flex",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <span style={{ fontSize: "12px", color: "#777" }}>{job.postedDate}</span>
//                     <Link
//                       to={appliedJobs.includes(job._id) ? "#" : "/apply"}
//                       style={{
//                         background: appliedJobs.includes(job._id) ? "gray" : "#F3BD00",
//                         color: "white",
//                         padding: "8px 15px",
//                         borderRadius: "4px",
//                         textDecoration: "none",
//                         textTransform: "capitalize",
//                         pointerEvents: appliedJobs.includes(job._id) ? "none" : "auto",
//                         opacity: appliedJobs.includes(job._id) ? 0.6 : 1,
//                       }}
//                       state={{ job }}
//                     >
//                       {jobStatus[job._id]?.status}
//                     </Link>
//                   </div>
//                 </div>
//               ) : null
//             )}
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default ApplicationTracking;

import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const ApplicationTracking = () => {
  const [jobs, setJobs] = useState([]);
  const [approvedApplications, setApprovedApplications] = useState([]);
  const navigate = useNavigate();

  const url = "http://localhost:5000/";
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.regid?._id;

  useEffect(() => {
    if (!userId) return;
    fetch("http://localhost:5000/demo/jobfullview")
      .then((res) => res.json())
      .then((result) => {
        if (Array.isArray(result)) setJobs(result);
        else setJobs([]);
      })
      .catch((e) => console.error("Failed to fetch jobs:", e));
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    fetch("http://localhost:5000/demo/appliedjobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userid: userId }),
    })
      .then((res) => res.json())
      .then((result) => {
        const approved = result.filter(
          (app) => app.status === "approved" || app.status === "selected"
        );
        setApprovedApplications(approved);
      })
      .catch((err) => console.error("Failed to fetch applications:", err));
  }, [userId]);

  const approvedJobCards = approvedApplications
    .map((app) => {
      const matchedJob = jobs.find((job) => job._id === app.postid);
      return matchedJob ? { job: matchedJob, application: app } : null;
    })
    .filter(Boolean);

  const getLastRoundStatus = (roundStatus) => {
    if (!Array.isArray(roundStatus) || roundStatus.length === 0) return "Track Process";
    const lastCompleted = [...roundStatus].reverse().find((r) => r.completed);
    if (!lastCompleted) return "Track Process";
    return lastCompleted.round === "Offer" ? "🎉 Offer Sent" : `Next: ${lastCompleted.round}`;
  };

  return (
    <div style={{ fontFamily: "Inter", backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <Nav />

      <motion.div
        style={{
          backgroundImage: "linear-gradient(90deg,rgb(245, 132, 11),rgba(250, 170, 21, 0.92))",
          color: "white",
          padding: "40px 20px",
          textAlign: "center",
        }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
          <div style={{ padding: "60px 0" }}>
            <h1 style={{ fontSize: "42px" }}>Approved Applications</h1>
          </div>
         </motion.div>
      <section style={{ padding: "50px 0", background: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          {approvedJobCards.length === 0 ? (
            <h3 style={{ textAlign: "center" }}>No approved applications yet.</h3>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "25px",
              }}
            >
              {approvedJobCards.map(({ job, application }) => (
                <div
                  key={job._id}
                  style={{
                    background: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)",
                    transition: "0.3s",
                  }}
                  // onClick={() => navigate("/track-process", { state: { job, application } })}
                >
                  <div
                    style={{
                      padding: "20px",
                      borderBottom: "1px solid #eee",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <img
                      className="rounded-circle"
                      src={job.rid?.image ? url + job.rid.image : "n/a"}
                      alt="Company Logo"
                      style={{ width: "40px", height: "40px" }}
                    />
                    <div>
                      <h3 style={{ fontSize: "18px", marginBottom: "5px" }}>{job.title}</h3>
                      <p style={{ color: "blue", fontSize: "15px" }}>{job.rid?.companyName || "Company"}</p>
                    </div>
                  </div>
                  <div style={{ padding: "20px" }}>
                    <p>📍 {job.location}</p>
                    <p>💰 {job.salary}</p>
                    <p>🕒 {job.cateogry}</p>
                    <p>{job.description}</p>
                  </div>
                  <div
                    style={{
                      padding: "15px 20px",
                      background: "#f9f9f9",
                      borderTop: "1px solid #eee",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ fontSize: "12px", color: "#777" }}>
                      {job.postedDate?.slice(0, 10)}
                    </span>
                    <button
                      style={{
                        background: "#009688",
                        color: "white",
                        padding: "8px 15px",
                        borderRadius: "4px",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      {getLastRoundStatus(application.roundStatus)}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ApplicationTracking;


