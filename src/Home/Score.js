import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Score() {
  const [file, setFile] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [score, setScore] = useState(null);
  const navigate = useNavigate(); // 🧭 for navigation

  const handleUpload = async () => {
    if (!file || !jobTitle) {
      alert("Please enter a job title and upload a PDF.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_title", jobTitle);

    try {
      const res = await axios.post("http://localhost:4000/cv", formData);
      setScore({
        job_title: res.data.job_title,
        semantic_score: res.data.semantic_score,
        lr_score: res.data.lr_score,
        knn_score: res.data.knn_score,
        final_score: res.data.ml_final_score,
        suggestions: res.data.suggestions || [],
      });
    } catch (err) {
      console.error("Server error:", err.response?.data || err);
      alert(`Error scoring resume: ${err.response?.data?.error || err.message}`);
    }
  };

  const styles = {
    container: {
      maxWidth: "500px",
      margin: "40px auto",
      padding: "30px",
      background: "#f4f8ff",
      borderRadius: "16px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      fontFamily: "Segoe UI, sans-serif",
      textAlign: "center",
    },
    heading: {
      color: "#2c3e50",
      marginBottom: "20px",
    },
    input: {
      width: "90%",
      padding: "10px",
      margin: "10px 0",
      border: "1px solid #ccc",
      borderRadius: "8px",
      fontSize: "14px",
    },
    button: {
      backgroundColor: "#007BFF",
      color: "#fff",
      padding: "10px 20px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
      marginTop: "10px",
    },
    resultBox: {
      marginTop: "30px",
      background: "#e8f0fe",
      padding: "20px",
      borderRadius: "12px",
      border: "1px solid #c3d9ff",
    },
    suggestionItem: {
      textAlign: "left",
      color: "#444",
      fontSize: "14px",
    },
    label: {
      fontWeight: "bold",
    },
    backButton: {
      marginTop: "30px",
      backgroundColor: "#6c757d",
      color: "white",
      padding: "10px 20px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📄 Resume Scorer</h2>

      <input
        type="text"
        placeholder="Enter Job Title"
        onChange={(e) => setJobTitle(e.target.value)}
        style={styles.input}
      />
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
        style={styles.input}
      />
      <button style={styles.button} onClick={handleUpload}>
        🚀 Submit
      </button>

      {score && (
        <div style={styles.resultBox}>
          <h4>
            Result for: <span style={styles.label}>{score.job_title}</span>
          </h4>
          <p>
            <span style={styles.label}>Semantic Score:</span>{" "}
            {score.semantic_score}%
          </p>
          <p>
            <span style={styles.label}>Linear Regression Score:</span>{" "}
            {score.lr_score}%
          </p>
          <p>
            <span style={styles.label}>KNN Score:</span> {score.knn_score}%
          </p>
          <p>
            <span style={styles.label}>ML Final Score:</span>{" "}
            {score.final_score}%
          </p>

          {score.final_score < 50 && score.suggestions.length > 0 && (
            <div>
              <h4>🔧 Suggestions to Improve:</h4>
              <ul>
                {score.suggestions.map((tip, idx) => (
                  <li key={idx} style={styles.suggestionItem}>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* 🔙 Back Button */}
      <button style={styles.backButton} onClick={() => navigate(-1)}>
        🔙 Go Back
      </button>
    </div>
  );
}

export default Score;
