import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import axios from "axios";

const Template = () => {
  const [boxes, setBoxes] = useState([]);

  const loadCanvas = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/demo/get-template`);
      setBoxes(res.data);
      console.log(res.data, "from the backend");
    } catch (err) {
      alert("No saved canvas found in DB.");
    }
  };

  useEffect(() => {
    loadCanvas();
  }, []);

  return (
    <>
      <div
        style={{
          fontFamily: "Inter",
          backgroundColor: "#f4f6f8",
          minHeight: "100vh",
        }}
      >
        <Nav />
        <div
          style={{
            backgroundColor: "#f5f7fa",
            color: "#333",
            lineHeight: "1.6",
          }}
        >
          {/* Header Section */}
          <header
            style={{
              backgroundColor: "#2c3e50",
              color: "white",
              padding: "1.5rem 0",
              textAlign: "center",
            }}
          >
            <div
              style={{
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "0 20px",
              }}
            >
              <h1>Professional CV Templates</h1>
              <p style={{ fontSize: "1.1rem", opacity: 0.8 }}>
                Choose from our professionally designed templates or customize
                your own
              </p>
            </div>
          </header>

          {/* Main Content */}
          <main>
            {/* Templates Section */}
            <section style={{ padding: "3rem 0" }}>
              <div
                style={{
                  maxWidth: "1200px",
                  margin: "0 auto",
                  padding: "0 20px",
                }}
              >
                <h2
                  style={{
                    fontSize: "2rem",
                    marginBottom: "2rem",
                    textAlign: "center",
                    color: "#2c3e50",
                  }}
                >
                  Select Your Template
                </h2>

                {/* Table format starts here */}
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    backgroundColor: "#fff",
                  }}
                >
                  <thead>
                    <tr style={{ backgroundColor: "#e0e0e0" }}>
                      <th style={thStyle}>#</th>
                      <th style={thStyle}>Template Name</th>
                      <th style={thStyle}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {boxes.map((template, index) => (
                      <tr
                        key={template._id}
                        style={{ borderBottom: "1px solid #ddd" }}
                      >
                        <td style={tdStyle}>{index + 1}</td>
                        <td style={tdStyle}>{template.name}</td>
                        <td style={tdStyle}>
                          <Link to="/viewtemplate" state={{ id: template._id }}>
                            <button style={buttonStyle}>Use</button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

const thStyle = {
  padding: "12px 15px",
  textAlign: "left",
  fontWeight: "600",
};

const tdStyle = {
  padding: "12px 15px",
};

const buttonStyle = {
  padding: "8px 12px",
  backgroundColor: "#4caf50",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default Template;
