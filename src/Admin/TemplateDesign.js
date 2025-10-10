import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import axios from "axios";

const TemplateDesign = () => {
  const [animate, setAnimate] = useState(false);
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

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
    <div className="container-xxl position-relative bg-white d-flex p-0">
      <SideBar />
      <div className="content">
        <NavBar />
        <div
          style={{ padding: "40px", background: "#f4f6f8", minHeight: "100vh" }}
        >
          <h2
            style={{
              textAlign: "center",
              fontFamily: "sans-serif",
              marginBottom: "30px",
            }}
          >
            ✨ Stylish & Animated CV Templates
          </h2>

          <div>
            <a href="/createtemplate" target="blank">
              <button className="btn btn-success mb-4">Create Template</button>
            </a>
          </div>

          <table
            className="table table-bordered table-hover"
            style={{ background: "#fff" }}
          >
            <thead className="thead-dark">
              <tr>
                <th style={{ width: "5%" }}>#</th>
                <th style={{ width: "20%" }}>Template Name</th>
                <th style={{ width: "20%" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {boxes.map((template, index) => (
                <tr key={template._id} style={template.style}>
                  <td>{index + 1}</td>
                  <td>{template.name}</td>

                  <td>
                    <Link to="/createtemplate" state={{ id: template._id }}>
                      <button
                        className="btn btn-success"
                        style={{ padding: "6px 12px", borderRadius: "5px" }}
                      >
                        Update Template
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Animations */}
          <style>{`
            @keyframes slideInLeft {
              0% { transform: translateX(-50px); opacity: 0; }
              100% { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideInRight {
              0% { transform: translateX(50px); opacity: 0; }
              100% { transform: translateX(0); opacity: 1; }
            }
            @keyframes fadeInUp {
              0% { opacity: 0; transform: translateY(30px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            @keyframes bounceIn {
              0% { transform: scale(0.3); }
              50% { transform: scale(1.1); }
              70% { transform: scale(0.9); }
              100% { transform: scale(1); }
            }
            @keyframes zoomIn {
              0% { transform: scale(0.3); opacity: 0; }
              100% { transform: scale(1); opacity: 1; }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default TemplateDesign;
