import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import NavBar from "./NavBar";

const Feedback = () => {
  const [companyFeedback, setCompanyFeedback] = useState([]);
  const [userFeedback, setUserFeedback] = useState([]);
  const [showReplyBox, setShowReplyBox] = useState(null);
  const [replyText, setReplyText] = useState({});
  const [viewType, setViewType] = useState("all");

  const fetchCompanyFeedback = () => {
    fetch("http://localhost:5000/demo/companyfeedbackview")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(item => item.status === 1);
        setCompanyFeedback(filtered);
      })
      .catch((err) => console.error("Error fetching company feedback:", err));
  };

  const fetchUserFeedback = () => {
    fetch("http://localhost:5000/demo/userfeedbackview")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(item => item.status === 2);
        setUserFeedback(filtered);
      })
      .catch((err) => console.error("Error fetching user feedback:", err));
  };

  useEffect(() => {
    fetchCompanyFeedback();
    fetchUserFeedback();
  }, []);

  const handleReplyClick = (id) => {
    setShowReplyBox(showReplyBox === id ? null : id);
    setReplyText((prev) => ({ ...prev, [id]: "" }));
  };

  const handleSendReply = (id, type) => {
    const endpoint =
      type === "company"
        ? "http://localhost:5000/demo/companyfeedbackreply"
        : "http://localhost:5000/demo/companyfeedbackreply";

    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, reply: replyText[id] || "" }),
    })
      .then((res) => res.json())
      .then(() => {
        fetchCompanyFeedback();
        fetchUserFeedback();
        setShowReplyBox(null);
        setReplyText((prev) => ({ ...prev, [id]: "" }));
      })
      .catch((err) => console.error("Error sending reply:", err));
  };

  const renderFeedback = (data, type) => {
    return data.map((item) => {
      const isCompany = type === "company";
      const name = isCompany
        ? item.rid?.companyName || "Not Available"
        : item.uid?.name || "Not Available";

      return (
        <div
          key={item._id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "15px",
            marginBottom: "15px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <p><strong>{isCompany ? "Company Name" : "User Name"}:</strong> {name}</p>
          <p><strong>Rating:</strong> {item.rating || "Not Rated"}</p>
          <p><strong>Message:</strong> {item.message}</p>
          {item.reply && (
            <p style={{ color: "green", marginTop: "10px" }}>
              <strong>Reply:</strong> {item.reply}
            </p>
          )}
          <button
            onClick={() => handleReplyClick(item._id)}
            style={{
              marginTop: "10px",
              padding: "5px 10px",
              backgroundColor: "#ffc107",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              color: "#000",
            }}
          >
            {showReplyBox === item._id ? "Cancel" : "Reply"}
          </button>
          {showReplyBox === item._id && (
            <div style={{ marginTop: "10px" }}>
              <textarea
                value={replyText[item._id] || ""}
                onChange={(e) =>
                  setReplyText((prev) => ({
                    ...prev,
                    [item._id]: e.target.value,
                  }))
                }
                placeholder="Type your reply..."
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
              <button
                onClick={() => handleSendReply(item._id, type)}
                style={{
                  marginTop: "10px",
                  padding: "6px 12px",
                  backgroundColor: "#28a745",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  color: "#fff",
                }}
              >
                Send Reply
              </button>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="container-xxl position-relative bg-white d-flex p-0">
      <SideBar />
      <div className="content">
        <NavBar />
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
          <div
            style={{
              marginBottom: "20px",
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => setViewType("all")}
              style={{
                padding: "8px 16px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              View All
            </button>
            <button
              onClick={() => setViewType("company")}
              style={{
                padding: "8px 16px",
                backgroundColor: "#17a2b8",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              View Company Feedback
            </button>
            <button
              onClick={() => setViewType("user")}
              style={{
                padding: "8px 16px",
                backgroundColor: "#6c757d",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              View User Feedback
            </button>
          </div>

          {(viewType === "all" || viewType === "company") && (
            <>
              <h2 style={{ color: "#333" }}>Company Feedback</h2>
              {companyFeedback.length === 0 ? (
                <p>No company feedback available.</p>
              ) : (
                renderFeedback(companyFeedback, "company")
              )}
            </>
          )}

          {(viewType === "all" || viewType === "user") && (
            <>
              <h2 style={{ color: "#333", marginTop: "40px" }}>User Feedback</h2>
              {userFeedback.length === 0 ? (
                <p>No user feedback available.</p>
              ) : (
                renderFeedback(userFeedback, "user")
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
