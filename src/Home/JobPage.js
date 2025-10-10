import React, { useState, useEffect } from "react";
import Nav from "../Home/Nav";
import Footer from "../Home/Footer";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const JobPage = () => {
  const [searchText, setSearchText] = useState("");
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]); // this will store just job IDs
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("");
  const location = useLocation();
  const url = "http://localhost:5000/assets/";

  const filters = ["Full-Time", "Part-time", "Work from Home", "Remote"];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.regid?._id;
    if (!userId) return;

    // Fetch all jobs
    fetch(`http://localhost:5000/demo/jobfullview/${userId}`)
      .then((res) => res.json())
      .then((result) => {
        setJobs(result.jobs || []);
      })
      .catch((err) => console.error("Error fetching jobs:", err));

    // Fetch applied jobs
    fetch("http://localhost:5000/demo/appliedjobs", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userid: userId }),
    })
      .then((res) => res.json())
      .then((result) => {
        const appliedIds = result.map((el) => String(el.postid?._id || el.postid));
        setAppliedJobs(appliedIds); // just the job IDs
      })
      .catch((e) => console.error("Failed to fetch applied jobs:", e));
  }, [location]);

  const filteredJobs = selectedFilter
    ? jobs.filter((job) =>
      job.cateogry?.toLowerCase().includes(selectedFilter.toLowerCase())
    )
    : jobs;

  const searchFilteredJobs = filteredJobs.filter((job) =>
    [
      job.title,
      job.rid?.companyName,
      job.cateogry,
      job.location,
      job.salary,
      job.qualification,
      job.description,
      job.skills,
      job.experience,
    ]
      .join(" ")
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  const toggleExpand = (jobId) => {
    setExpandedJobId((prev) => (prev === jobId ? null : jobId));
  };

  return (
    <div style={{ fontFamily: "Inter", backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <Nav />

      <motion.div
        style={{
          backgroundImage: "linear-gradient(90deg, #f59e0b, #facc15)",
          color: "white",
          padding: "40px 20px",
          textAlign: "center",
        }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 style={{ fontSize: "40px" }}>Find Your Dream Job</h1>
        <motion.input
          type="text"
          placeholder="Search job title, company, location..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            padding: "12px 20px",
            borderRadius: "30px",
            border: "none",
            width: "80%",
            maxWidth: "500px",
            marginTop: "20px",
            fontSize: "16px",
            backgroundColor: "#fff",
            color: "black",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          }}
        />

        <div style={{ marginTop: "20px" }}>
          {filters.map((filter, i) => (
            <motion.button
              key={i}
              onClick={() => setSelectedFilter(filter)}
              style={{
                background: selectedFilter === filter ? "#f59e0b" : "white",
                color: selectedFilter === filter ? "black" : "#1f2937",
                border: "none",
                padding: "10px 20px",
                margin: "5px",
                borderRadius: "20px",
                cursor: "pointer",
              }}
            >
              {filter}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "40px auto",
          padding: "0 20px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: "30px",
        }}
      >
        {searchFilteredJobs.length > 0 ? (
          searchFilteredJobs.map((job) => {
            const jobId = String(job._id);
            const isApplied = appliedJobs.includes(jobId);

            return (
              <motion.div
                key={jobId}
                onClick={() => toggleExpand(jobId)}
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  padding: "20px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  border:
                    expandedJobId === jobId
                      ? "2px solid #f59e0b"
                      : "2px solid transparent",
                }}
                whileHover={{ scale: 1.03 }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                  <img
                    src={
                      job.rid?.image
                        ? url + job.rid.image
                        : "https://via.placeholder.com/50"
                    }
                    alt="Logo"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                  <div>
                    <h3 style={{ margin: 0 }}>{job.title}</h3>
                    <p style={{ margin: 0 }}>{job.rid?.companyName}</p>
                  </div>
                </div>

                <div style={{ marginTop: "10px", fontSize: "14px" }}>
                  <p>📍 {job.location}</p>
                  <p>💰 {job.salary}</p>
                  <p>
                    🎓{" "}
                    {Array.isArray(job.qualification)
                      ? job.qualification.join(", ")
                      : job.qualification}
                  </p>
                  <p>👥 {job.appliedCount} applied</p>
                </div>

                {expandedJobId === jobId && (
                  <div
                    style={{
                      marginTop: "15px",
                      background: "#f9fafb",
                      padding: "15px",
                      borderRadius: "8px",
                      fontSize: "14px",
                    }}
                  >
                    <p>
                      <strong>Description:</strong> {job.description}
                    </p>
                    <p>
                      <strong>Skills:</strong> {job.skills?.join(", ")}
                    </p>
                    <p>
                      <strong>Experience:</strong> {job.experience}
                    </p>
                  </div>
                )}

                <div style={{ marginTop: "15px", textAlign: "right" }}>
                  <Link
                    to={isApplied ? "#" : "/apply"}
                    state={{ job }}
                    style={{
                      padding: "10px 20px",
                      background: isApplied ? "#10b981" : "#f59e0b",  // 🌿 green for applied
                      color: "white",
                      borderRadius: "6px",
                      fontWeight: "bold",
                      textDecoration: "none",
                      pointerEvents: isApplied ? "none" : "auto",
                    }}

                  >
                    {isApplied ? "Applied" : "Apply Now"}
                  </Link>
                </div>
              </motion.div>
            );
          })
        ) : (
          <p>No jobs found.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default JobPage;
