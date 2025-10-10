import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./CompanySide";
import NavBar from "./CompanyNav";

const stages = ["Aptitude", "Technical", "HR", "Offer"];

export default function CompanyTrack() {
  const [applications, setApplications] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // ✅ Get login user from localStorage
  const [auth] = useState(JSON.parse(localStorage.getItem("user")));
  const companyId = auth?.regid;

  // ✅ Fetch approved applications when companyId or refresh changes
  useEffect(() => {
    if (!companyId) return;

    axios
      .get(`http://localhost:5000/demo/approved/${companyId}`)
      .then((res) => setApplications(res.data))
      .catch((err) => console.error("Error fetching applications", err));
  }, [refresh, companyId]);

  // ✅ Move to next stage (Aptitude → Technical → HR → Offer)
  const updateStage = async (applicationId, round) => {
    try {
      await axios.post("http://localhost:5000/demo/update-stage", {
        applicationId,
        round,
        result: "pass",
      });

      // ✅ Trigger refresh after small delay
      setTimeout(() => {
        setRefresh((prev) => !prev);
      }, 500);
    } catch (err) {
      console.error("Error updating stage", err);
    }
  };

  return (
    <div className="container-xxl position-relative bg-white d-flex p-0">
      <SideBar />
      <div className="content">
        <NavBar />
        <div style={{ padding: 20 }}>
          <h2>Candidate Application Tracker</h2>

          {applications.length === 0 && (
            <p>No approved applications found.</p>
          )}

          {applications.map((app) => {
            const completedRounds = app.roundStatus?.filter((r) => r.completed) || [];
            const lastRound = completedRounds.length
              ? completedRounds[completedRounds.length - 1].round
              : null;
            const currentIndex = stages.indexOf(lastRound);
            const nextStage = stages[currentIndex + 1] || stages[0];

            return (
              <div
                key={app._id}
                style={{
                  border: "1px solid #ccc",
                  marginBottom: 20,
                  padding: 20,
                  borderRadius: 8,
                  background: "#f9f9f9",
                }}
              >
                <h3>{app.postid?.title}</h3>
                <p><strong>Email:</strong> {app.email}</p>
                <p><strong>Status:</strong> {app.status}</p>
                <p><strong>Current Round:</strong> {lastRound || "Not started"}</p>

                {lastRound !== "Offer" && currentIndex < stages.length - 1 && (
                  <button
                    onClick={() => updateStage(app._id, nextStage)}
                    style={{
                      background: "#009688",
                      color: "white",
                      border: "none",
                      padding: "10px 15px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      marginTop: "10px",
                    }}
                  >
                    Move to Next Stage ({nextStage})
                  </button>
                )}

                {lastRound === "Offer" && (
                  <p style={{ color: "green", fontWeight: "bold" }}>
                    🎉 Offer Sent
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
