import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";

function Mentors() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedMentor, setSelectedMentor] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const fetchMentors = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:5000/api/mentors");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load mentors");
      }

      setMentors(data);
    } catch (err) {
      setError(err.message || "Failed to load mentors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  const openViewModal = (mentor) => {
    setSelectedMentor(mentor);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setSelectedMentor(null);
    setIsViewModalOpen(false);
  };

  return (
    <AdminLayout>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "26px", margin: 0 }}>
          Mentor Monitoring
        </h1>

        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>
          View mentor profiles, specialization, ratings, and activity.
        </p>
      </div>

      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.05)",
          borderRadius: "20px",
          padding: "24px",
        }}
      >
        {loading ? (
          <p style={{ color: "rgba(255,255,255,0.75)" }}>Loading mentors...</p>
        ) : error ? (
          <p style={{ color: "#ff7d7d" }}>{error}</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)" }}>
                <th align="left">Mentor</th>
                <th align="left">Specialization</th>
                <th align="left">Rating</th>
                <th align="left">Sessions</th>
                <th align="left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {mentors.map((mentor) => (
                <tr
                  key={mentor._id}
                  style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <td style={{ padding: "14px 0", fontWeight: "600" }}>
                    {mentor.name}
                  </td>

                  <td style={{ color: "rgba(255,255,255,0.75)" }}>
                    {mentor.field}
                  </td>

                  <td style={{ color: "#F5A100", fontWeight: "600" }}>
                    ⭐ {mentor.rating}
                  </td>

                  <td style={{ color: "rgba(255,255,255,0.75)" }}>
                    {mentor.sessions}
                  </td>

                  <td>
                    <button
                      onClick={() => openViewModal(mentor)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "10px",
                        border: "1px solid rgba(255,255,255,0.08)",
                        background: "transparent",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {mentors.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      padding: "18px 0",
                      color: "rgba(255,255,255,0.6)",
                      borderTop: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    No mentors found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {isViewModalOpen && selectedMentor && (
        <div
          onClick={closeViewModal}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(5, 12, 18, 0.58)",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            padding: "24px",
            animation: "fadeIn 0.2s ease",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "560px",
              borderRadius: "24px",
              overflow: "hidden",
              background:
                "linear-gradient(180deg, rgba(20,53,70,0.97) 0%, rgba(16,38,50,0.99) 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
              animation: "modalSlide 0.25s ease",
            }}
          >
            <div style={{ padding: "28px", position: "relative" }}>
              <button onClick={closeViewModal} style={closeBtn}>
                ×
              </button>

              <h2
                style={{
                  margin: "4px 0 18px 0",
                  color: "#F9FAFB",
                  fontSize: "24px",
                  fontWeight: "800",
                }}
              >
                Mentor Details
              </h2>

              <div style={{ display: "grid", gap: "18px" }}>
                <div>
                  <p style={detailsLabel}>Name</p>
                  <p style={detailsValue}>{selectedMentor.name}</p>
                </div>

                <div>
                  <p style={detailsLabel}>Email</p>
                  <p style={detailsValue}>{selectedMentor.email}</p>
                </div>

                <div>
                  <p style={detailsLabel}>Specialization</p>
                  <p style={detailsValue}>{selectedMentor.field}</p>
                </div>

                <div>
                  <p style={detailsLabel}>Rating</p>
                  <p style={detailsValue}>⭐ {selectedMentor.rating}</p>
                </div>

                <div>
                  <p style={detailsLabel}>Sessions</p>
                  <p style={detailsValue}>{selectedMentor.sessions}</p>
                </div>

                <div>
                  <p style={detailsLabel}>Status</p>
                  <p style={detailsValue}>{selectedMentor.status}</p>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
                padding: "18px 28px 22px 28px",
                borderTop: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <button onClick={closeViewModal} style={cancelBtn}>
                Close
              </button>
            </div>
          </div>

          <style>
            {`
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }

              @keyframes modalSlide {
                from {
                  opacity: 0;
                  transform: translateY(14px) scale(0.98);
                }
                to {
                  opacity: 1;
                  transform: translateY(0) scale(1);
                }
              }
            `}
          </style>
        </div>
      )}
    </AdminLayout>
  );
}

const closeBtn = {
  position: "absolute",
  top: "18px",
  right: "18px",
  background: "transparent",
  border: "none",
  color: "rgba(255,255,255,0.55)",
  fontSize: "34px",
  lineHeight: 1,
  cursor: "pointer",
};

const cancelBtn = {
  padding: "12px 24px",
  borderRadius: "14px",
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.02)",
  color: "#F9FAFB",
  fontSize: "15px",
  cursor: "pointer",
};

const detailsLabel = {
  margin: "0 0 8px 0",
  color: "rgba(249,250,251,0.58)",
  fontSize: "13px",
  fontWeight: "600",
  letterSpacing: "0.2px",
};

const detailsValue = {
  margin: 0,
  color: "#F9FAFB",
  fontSize: "15px",
  lineHeight: 1.7,
  whiteSpace: "pre-wrap",
};

export default Mentors;