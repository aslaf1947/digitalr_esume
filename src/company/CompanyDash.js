// CompanyDash.jsx
import React, { useEffect, useState } from "react";
import {
  FaUsers,
  FaBuilding,
  FaChartLine,
  FaEnvelopeOpenText,
} from "react-icons/fa";
import SideBar from "./CompanySide";
import NavBar from "./CompanyNav";

export default function CompanyDash() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 300);
  }, []);

  const statCards = [
    { icon: <FaBuilding />, label: "Companies", value: 128 },
    { icon: <FaUsers />, label: "Active Users", value: 940 },
    { icon: <FaChartLine />, label: "Job Posts", value: 312 },
    { icon: <FaEnvelopeOpenText />, label: "Messages", value: 76 },
  ];

  const technologies = [
    "AI & Machine Learning",
    "Cloud DevOps",
    "Cybersecurity",
    "Web3 & Blockchain",
    "Data Science",
    "NLP & Chatbots",
  ];

  const messages = [
    {
      sender: "TechSoft Inc",
      text: "Hiring full-stack developers.",
      time: "5m ago",
    },
    {
      sender: "Jane Smith",
      text: "Updated resume for review.",
      time: "15m ago",
    },
    {
      sender: "CodeCrafters",
      text: "Interested in enterprise solutions.",
      time: "30m ago",
    },
  ];

  const containerStyle = {
    fontFamily: "Segoe UI, sans-serif",
    padding: "30px",
    background: "linear-gradient(to right, #f0f4ff, #ffffff)",
    minHeight: "100vh",
    animation: "fadeIn 0.6s ease-in-out",
  };

  const titleStyle = {
    textAlign: "center",
    marginBottom: "40px",
    fontSize: "2.5rem",
    color: "#2c3e50",
  };

  const cardGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "25px",
    marginBottom: "40px",
  };

  const cardStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "15px",
    padding: "25px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.06)",
    textAlign: "center",
    transition: "transform 0.3s ease",
  };

  const iconStyle = {
    fontSize: "2rem",
    color: "#007bff",
    marginBottom: "10px",
  };

  const valueStyle = {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#333",
  };

  const labelStyle = {
    fontSize: "1rem",
    color: "#777",
  };

  const panelsStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "30px",
  };

  const panelStyle = {
    flex: "1 1 300px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.05)",
  };

  const headingStyle = {
    marginBottom: "20px",
    color: "#333",
    fontSize: "1.3rem",
  };

  const messageTextStyle = {
    marginBottom: "15px",
    color: "#444",
  };

  const techIconStyle = {
    color: "#28a745",
    marginRight: "10px",
  };

  return (
      <div className="container-xxl position-relative bg-white d-flex p-0">
                <SideBar />
                <div className="content">
                  <NavBar />
    <div style={containerStyle}>
      <div style={cardGridStyle}>
        {statCards.map((card, index) => (
          <div
            style={{ ...cardStyle, transform: loaded ? "translateY(0)" : "translateY(20px)", opacity: loaded ? 1 : 0, transition: "all 0.5s ease" }}
            key={index}
          >
            <div style={iconStyle}>{card.icon}</div>
            <div style={valueStyle}>{card.value}</div>
            <div style={labelStyle}>{card.label}</div>
          </div>
        ))}
      </div>

      <div style={panelsStyle}>
        <div style={panelStyle}>
          <h2 style={headingStyle}>📬 Latest Messages</h2>
          <ul style={{ padding: 0, listStyle: "none" }}>
            {messages.map((msg, i) => (
              <li key={i} style={messageTextStyle}>
                <strong>{msg.sender}</strong>
                <div>{msg.text}</div>
                <small style={{ color: "#aaa" }}>{msg.time}</small>
              </li>
            ))}
          </ul>
        </div>

        <div style={panelStyle}>
          <h2 style={headingStyle}>🔥 Trending Technologies</h2>
          <ul style={{ padding: 0, listStyle: "none" }}>
            {technologies.map((tech, i) => (
              <li key={i} style={messageTextStyle}>
                <FaChartLine style={techIconStyle} /> {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}
