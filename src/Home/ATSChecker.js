import React, { useState } from "react";
import Nav from "./Nav";

const containerStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #f0fdf4 0%, #f0f9ff 50%, #ecfdf5 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "1rem",
};

const mainCardStyle = {
  width: "100%",
  maxWidth: "48rem",
};

const cardStyle = {
  background: "rgba(255, 255, 255, 0.8)",
  backdropFilter: "blur(16px)",
  borderRadius: "1.5rem",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  overflow: "hidden",
  transition: "all 0.5s ease",
  ":hover": {
    transform: "scale(1.005)",
  },
};

const headerStyle = {
  background: "linear-gradient(90deg, #064e3b 0%, #065f46 50%, #047857 100%)",
  padding: "2rem",
  textAlign: "center",
  position: "relative",
  overflow: "hidden",
};

const headerOverlayStyle = {
  position: "absolute",
  inset: "0",
  background: "rgba(0, 0, 0, 0.1)",
};

const headerContentStyle = {
  position: "relative",
  zIndex: "10",
};

const titleStyle = {
  fontSize: "1.875rem",
  fontWeight: "bold",
  color: "white",
  marginBottom: "0.5rem",
};

const subtitleStyle = {
  color: "#d1fae5",
  opacity: "0.9",
};

const contentStyle = {
  padding: "2rem",
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
};

const sectionStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

const labelStyle = {
  display: "block",
  fontSize: "1.125rem",
  fontWeight: "600",
  color: "#1f2937",
  marginBottom: "0.5rem",
};

const fileInputContainerStyle = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "3rem 2rem",
  border: "2px dashed #d1d5db",
  borderRadius: "1rem",
  background: "rgba(255, 255, 255, 0.5)",
  transition: "all 0.3s ease",
  cursor: "pointer",
  ":hover": {
    borderColor: "#10b981",
    background: "rgba(16, 185, 129, 0.05)",
  },
};

const fileInputStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
  opacity: "0",
  cursor: "pointer",
};

const fileInputContentStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.5rem",
  textAlign: "center",
};

const uploadIconStyle = {
  fontSize: "2.5rem",
  color: "#10b981",
};

const fileInputTextStyle = {
  fontWeight: "600",
  color: "#374151",
};

const fileInputSubtextStyle = {
  color: "#6b7280",
  fontSize: "0.875rem",
};

const selectedFileStyle = {
  marginTop: "1rem",
  padding: "0.5rem 1rem",
  background: "#ecfdf5",
  borderRadius: "0.5rem",
  color: "#065f46",
  fontWeight: "500",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
};

const textareaStyle = {
  width: "100%",
  padding: "1.5rem",
  border: "2px solid #d1d5db",
  borderRadius: "1rem",
  resize: "none",
  minHeight: "120px",
  transition: "all 0.3s ease",
  outline: "none",
  background: "rgba(255, 255, 255, 0.7)",
  fontSize: "1rem",
  ":focus": {
    borderColor: "#10b981",
    boxShadow: "0 0 0 4px rgba(16, 185, 129, 0.1)",
  },
};

const buttonContainerStyle = {
  textAlign: "center",
};

const submitButtonStyle = {
  position: "relative",
  padding: "1rem 3rem",
  background: "linear-gradient(90deg, #064e3b 0%, #065f46 50%, #047857 100%)",
  color: "white",
  fontWeight: "bold",
  borderRadius: "1rem",
  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
  border: "none",
  cursor: "pointer",
  transition: "all 0.3s ease",
  overflow: "hidden",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  ":hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
  },
  ":active": {
    transform: "translateY(0)",
  },
  ":disabled": {
    background: "#9ca3af",
    cursor: "not-allowed",
    transform: "none",
  },
};

const buttonShineStyle = {
  position: "absolute",
  top: "0",
  left: "-100%",
  width: "50%",
  height: "100%",
  background:
    "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
  transition: "all 0.5s ease",
};

const getStatusStyle = (statusText) => {
  let bgColor, textColor, borderColor;

  if (statusText.includes("complete")) {
    bgColor = "linear-gradient(90deg, #dcfce7 0%, #d1fae5 100%)";
    textColor = "#166534";
    borderColor = "#bbf7d0";
  } else if (statusText.includes("Error")) {
    bgColor = "linear-gradient(90deg, #fef2f2 0%, #fce7e7 100%)";
    textColor = "#dc2626";
    borderColor = "#fecaca";
  } else {
    bgColor = "linear-gradient(90deg, #fef3c7 0%, #f1f5f9 100%)";
    textColor = "#0f172a";
    borderColor = "#fde68a";
  }

  return {
    padding: "1rem",
    borderRadius: "1rem",
    textAlign: "center",
    fontWeight: "500",
    background: bgColor,
    color: textColor,
    border: `2px solid ${borderColor}`,
    animation: "fadeIn 0.5s ease-out",
  };
};

const resultContainerStyle = {
  marginTop: "2rem",
  animation: "slideUp 0.5s ease-out",
};

const resultCardStyle = {
  background: "white",
  borderRadius: "1rem",
  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
};

const resultHeaderStyle = {
  background: "linear-gradient(90deg, #064e3b 0%, #047857 100%)",
  padding: "1.5rem",
  color: "white",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const resultPercentageStyle = {
  fontSize: "2.5rem",
  fontWeight: "bold",
  color: "#d1fae5",
};

const resultBodyStyle = {
  padding: "1.5rem",
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
};

const resultSectionStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};

const resultSectionTitleStyle = {
  fontSize: "1.125rem",
  fontWeight: "600",
  color: "#064e3b",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
};

const keywordListStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",
};

const foundKeywordStyle = {
  padding: "0.25rem 0.75rem",
  background: "#d1fae5",
  borderRadius: "9999px",
  color: "#065f46",
  fontWeight: "500",
  fontSize: "0.875rem",
};

const missingKeywordStyle = {
  padding: "0.25rem 0.75rem",
  background: "#fee2e2",
  borderRadius: "9999px",
  color: "#b91c1c",
  fontWeight: "500",
  fontSize: "0.875rem",
};

const suggestionListStyle = {
  paddingLeft: "1.5rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};

const suggestionItemStyle = {
  color: "#4b5563",
  position: "relative",
  ":before": {
    content: '"•"',
    position: "absolute",
    left: "-1rem",
    color: "#10b981",
  },
};

const errorTextStyle = {
  color: "#dc2626",
  fontSize: "0.875rem",
  marginTop: "0.25rem",
};

const fileInputContainerErrorStyle = {
  ...fileInputContainerStyle,
  borderColor: "#dc2626",
  background: "rgba(220, 38, 38, 0.05)",
};

const textareaErrorStyle = {
  ...textareaStyle,
  borderColor: "#dc2626",
  ":focus": {
    borderColor: "#dc2626",
    boxShadow: "0 0 0 4px rgba(220, 38, 38, 0.1)",
  },
};

export default function ATSChecker() {
  const [resumeFile, setResumeFile] = useState(null);
  const [keywords, setKeywords] = useState("");
  const [status, setStatus] = useState({ message: "", type: "" });
  const [errors, setErrors] = useState({ resume: "", keywords: "" });
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [auth] = useState(JSON.parse(localStorage.getItem("user")));

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

 const validateForm = () => {
  let valid = true;
  const newErrors = { resume: "", keywords: "" };

  if (!resumeFile) {
    newErrors.resume = "Please upload a resume file";
    valid = false;
  } else if (resumeFile.size > MAX_FILE_SIZE) {
    newErrors.resume = "File size exceeds 5MB limit";
    valid = false;
  } else if (resumeFile.type !== "application/pdf") {
    newErrors.resume = "Only PDF files are allowed";
    valid = false;
  }

  if (!keywords.trim()) {
    newErrors.keywords = "Please enter job keywords";
    valid = false;
  }
  // Removed the check for minimum 3 keywords

  setErrors(newErrors);
  return valid;
};

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResumeFile(file);
    setErrors((prev) => ({ ...prev, resume: "" }));

    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setErrors((prev) => ({ ...prev, resume: "File size exceeds 5MB limit" }));
      setStatus({ message: "File too large", type: "error" });
      return;
    }

    if (file.type !== "application/pdf") {
      setErrors((prev) => ({ ...prev, resume: "Only PDF files are allowed" }));
      setStatus({ message: "Invalid file type", type: "error" });
      return;
    }

    setStatus({ message: `PDF selected: ${file.name}`, type: "success" });
  };

const handleKeywordsChange = (e) => {
  setKeywords(e.target.value);
  setErrors((prev) => ({ ...prev, keywords: "" })); // Just clear any existing error
};

  const handleSubmit = async () => {
    if (!validateForm()) {
      setStatus({ message: "Please fix the errors", type: "error" });
      return;
    }

    setIsLoading(true);
    setStatus({ message: "Analyzing your resume...", type: "loading" });

    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);
      formData.append("keywords", keywords);

      const response = await fetch("http://192.168.1.35:8080", {
        method: "POST",
        body: formData,
      });

      // Check for HTML response
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error(`Server returned: ${text.substring(0, 100)}...`);
      }

      const result = await response.json();
console.log(result,result)
      if (result.error) {
        throw new Error(result.error || result.message || "Analysis failed");
      }

      // Transform the simplified response into the format your component expects
      const similarityPercentage = Math.round(result.similarity * 100);
      setAnalysisResult({
        matchPercentage: similarityPercentage,
        score: similarityPercentage,
        status: result.result,
        foundKeywords: keywords
          .split(",")
          .map((k) => k.trim())
          .filter((k) => k),
        suggestions: [
          result.result.includes("✅")
            ? "Your resume matches well with the job description!"
            : "Consider adding more relevant keywords from the job description",
          "Include specific metrics to quantify achievements",
          "Tailor your skills section to match job requirements",
        ],
        analysis: {
          wordCount: 0, // Not available from simplified backend
          keywordDensity: similarityPercentage, // Using similarity as proxy
        },
      });

      setStatus({ message: "Analysis complete!", type: "success" });
    } catch (error) {
      console.error("Error analyzing resume:", error);
      setStatus({
        message: error.message || "Error analyzing resume. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <div style={containerStyle}>
        <div style={mainCardStyle}>
          <div style={cardStyle}>
            <div style={headerStyle}>
              <div style={headerOverlayStyle}></div>
              <div style={headerContentStyle}>
                <h1 style={titleStyle}>ATS Resume Checker</h1>
                <p style={subtitleStyle}>
                  Optimize your resume for applicant tracking systems
                </p>
              </div>
            </div>

            <div style={contentStyle}>
              <div style={sectionStyle}>
                <label style={labelStyle}>Upload Your Resume (PDF)</label>
                <div
                  style={
                    errors.resume
                      ? fileInputContainerErrorStyle
                      : fileInputContainerStyle
                  }
                >
                  <input
                    type="file"
                    accept=".pdf"
                    style={fileInputStyle}
                    onChange={handleFileChange}
                  />
                  <div style={fileInputContentStyle}>
                    <div style={uploadIconStyle}>📄</div>
                    <div style={fileInputTextStyle}>
                      Click to upload or drag and drop
                    </div>
                    <div style={fileInputSubtextStyle}>
                      PDF files only (max. 5MB)
                    </div>
                    {resumeFile && (
                      <div style={selectedFileStyle}>
                        <span>✓</span>
                        {resumeFile.name}
                      </div>
                    )}
                  </div>
                </div>
                {errors.resume && (
                  <div style={errorTextStyle}>{errors.resume}</div>
                )}
              </div>

              <div style={sectionStyle}>
                <label htmlFor="keywords" style={labelStyle}>
                  Job Description Keywords
                </label>
                <textarea
                  style={errors.keywords ? textareaErrorStyle : textareaStyle}
                  id="keywords"
                  value={keywords}
                  onChange={handleKeywordsChange}
                  placeholder="e.g., JavaScript, React, Project Management, Agile..."
                />
                {errors.keywords && (
                  <div style={errorTextStyle}>{errors.keywords}</div>
                )}
              </div>

              <div style={buttonContainerStyle}>
                <button
                  style={{
                    ...submitButtonStyle,
                    ...(isLoading && { background: "#64748b" }),
                  }}
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span style={{ marginRight: "0.5rem" }}>⏳</span>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <span style={{ marginRight: "0.5rem" }}>🔍</span>
                      Analyze Resume
                    </>
                  )}
                  <span style={buttonShineStyle}></span>
                </button>
              </div>

              {status.message && (
                <div style={getStatusStyle(status.message)}>
                  {status.type === "success" && "✅"}
                  {status.type === "error" && "❌"}
                  {status.type === "loading" && "⏳"}
                  {status.message}
                </div>
              )}

              {analysisResult && (
                <div style={resultContainerStyle}>
                  <div style={resultCardStyle}>
                    <div style={resultHeaderStyle}>
                      <div>
                        <div style={{ fontSize: "0.875rem", color: "#a7f3d0" }}>
                          ATS Match Score
                        </div>
                        <div
                          style={{ fontSize: "1.25rem", fontWeight: "bold" }}
                        >
                          {analysisResult.matchPercentage}% Match
                        </div>
                      </div>
                      <div style={resultPercentageStyle}>
                        {analysisResult.score}/100
                      </div>
                    </div>
                    <div style={resultBodyStyle}>
                      <div style={resultSectionStyle}>
                        <div
                          style={{
                            ...resultSectionTitleStyle,
                            color: analysisResult.status.includes("✅")
                              ? "#065f46"
                              : "#b91c1c",
                          }}
                        >
                          {analysisResult.status}
                        </div>
                        {analysisResult.analysis.wordCount > 0 && (
                          <div
                            style={{ marginTop: "0.5rem", color: "#4b5563" }}
                          >
                            <strong>Keyword Density:</strong>{" "}
                            {analysisResult.analysis.keywordDensity}%
                          </div>
                        )}
                      </div>

                     
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
