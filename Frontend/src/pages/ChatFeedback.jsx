import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";

function ChatFeedback() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [summary, setSummary] = useState({
    mentorRating: 0,
    applicationRating: 0,
    chatExperience: 0,
  });

  const [statusFilter, setStatusFilter] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [openStatusMenuId, setOpenStatusMenuId] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [feedbackToDelete, setFeedbackToDelete] = useState(null);

  const [themeMode, setThemeMode] = useState("Dark");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadTheme = () => {
      const savedSettings = localStorage.getItem("adminSettings");

      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings);
          setThemeMode(parsed.themeMode || "Dark");
        } catch (error) {
          console.error("Failed to load theme settings:", error);
        }
      } else {
        setThemeMode("Dark");
      }
    };

    loadTheme();
    window.addEventListener("storage", loadTheme);
    window.addEventListener("admin-theme-change", loadTheme);

    return () => {
      window.removeEventListener("storage", loadTheme);
      window.removeEventListener("admin-theme-change", loadTheme);
    };
  }, []);

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:5000/api/feedback", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load feedback");
      }

      setFeedbackList(data);

      if (data.length > 0) {
        const totalRating = data.reduce(
          (sum, item) => sum + (item.rating || 0),
          0
        );

        const averageRating = (totalRating / data.length).toFixed(1);

        setSummary({
          mentorRating: averageRating,
          applicationRating: averageRating,
          chatExperience: averageRating,
        });
      } else {
        setSummary({
          mentorRating: 0,
          applicationRating: 0,
          chatExperience: 0,
        });
      }
    } catch (err) {
      setError(err.message || "Failed to load feedback");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, [token]);

  const handleStatusUpdate = async (feedback, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/feedback/${feedback._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            session: feedback.session,
            issue: feedback.issue,
            rating: feedback.rating,
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update feedback status");
      }

      setOpenStatusMenuId(null);
      fetchFeedback();
    } catch (err) {
      alert(err.message || "Failed to update feedback status");
    }
  };

  const openDeleteModal = (feedback) => {
    setFeedbackToDelete(feedback);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setFeedbackToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteFeedback = async () => {
    if (!feedbackToDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/feedback/${feedbackToDelete._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete feedback");
      }

      closeDeleteModal();
      fetchFeedback();
    } catch (err) {
      alert(err.message || "Failed to delete feedback");
    }
  };

  const isLight = themeMode === "Light";

  const textPrimary = isLight ? "#0f172a" : "#F9FAFB";
  const textSecondary = isLight
    ? "rgba(15,23,42,0.62)"
    : "rgba(249,250,251,0.6)";
  const cardBackground = isLight
    ? "linear-gradient(180deg, rgba(255,255,255,0.88) 0%, rgba(248,250,252,0.96) 100%)"
    : "linear-gradient(180deg, rgba(20,53,70,0.95) 0%, rgba(16,38,50,0.98) 100%)";
  const cardBorder = isLight
    ? "1px solid rgba(15,23,42,0.08)"
    : "1px solid rgba(255,255,255,0.05)";
  const cardShadow = isLight
    ? "0 12px 26px rgba(15,23,42,0.08)"
    : "0 12px 26px rgba(0,0,0,0.15)";
  const miniCardBackground = isLight
    ? "rgba(255,255,255,0.74)"
    : "rgba(255,255,255,0.03)";
  const miniCardBorder = isLight
    ? "1px solid rgba(15,23,42,0.08)"
    : "1px solid rgba(255,255,255,0.05)";
  const labelColor = isLight
    ? "rgba(15,23,42,0.72)"
    : "rgba(249,250,251,0.68)";
  const issueColor = isLight
    ? "rgba(15,23,42,0.62)"
    : "rgba(249,250,251,0.62)";
  const customSelectBorder = isLight
    ? "1px solid rgba(15,23,42,0.10)"
    : "1px solid rgba(255,255,255,0.08)";
  const customSelectBg = isLight
    ? "rgba(255,255,255,0.85)"
    : "rgba(255,255,255,0.04)";
  const customSelectText = isLight ? "#0f172a" : "#F9FAFB";
  const arrowColor = isLight
    ? "rgba(15,23,42,0.65)"
    : "rgba(249,250,251,0.72)";
  const dropdownMenuBg = isLight
    ? "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,1) 100%)"
    : "linear-gradient(180deg, rgba(20,53,70,0.98) 0%, rgba(16,38,50,1) 100%)";
  const dropdownMenuBorder = isLight
    ? "1px solid rgba(15,23,42,0.10)"
    : "1px solid rgba(255,255,255,0.08)";
  const dropdownItemColor = isLight ? "#0f172a" : "#F9FAFB";
  const overlayBackground = isLight
    ? "rgba(15, 23, 42, 0.28)"
    : "rgba(5, 12, 18, 0.58)";
  const deleteModalBg = isLight
    ? "linear-gradient(180deg, rgba(255,248,248,0.98) 0%, rgba(255,243,243,0.99) 100%)"
    : "linear-gradient(180deg, rgba(39,20,20,0.97) 0%, rgba(30,16,16,0.99) 100%)";
  const deleteModalBorder = isLight
    ? "1px solid rgba(239,68,68,0.18)"
    : "1px solid rgba(239,68,68,0.16)";
  const deleteModalShadow = isLight
    ? "0 24px 60px rgba(15,23,42,0.14)"
    : "0 24px 60px rgba(0,0,0,0.35)";
  const closeButtonColor = isLight
    ? "rgba(15,23,42,0.45)"
    : "rgba(255,255,255,0.55)";
  const cancelBtnBorder = isLight
    ? "1px solid rgba(15,23,42,0.12)"
    : "1px solid rgba(255,255,255,0.12)";
  const cancelBtnBg = isLight
    ? "rgba(15,23,42,0.04)"
    : "rgba(255,255,255,0.02)";
  const cancelBtnColor = isLight ? "#0f172a" : "#F9FAFB";
  const modalTextSecondary = isLight
    ? "rgba(15,23,42,0.72)"
    : "rgba(255,255,255,0.72)";
  const dividerBorder = isLight
    ? "1px solid rgba(15,23,42,0.08)"
    : "1px solid rgba(255,255,255,0.08)";
  const deleteBtnBorder = isLight
    ? "1px solid rgba(239,68,68,0.22)"
    : "1px solid rgba(239,68,68,0.25)";
  const deleteBtnBg = isLight ? "rgba(239,68,68,0.05)" : "transparent";

  const getStatusBadgeStyle = (status) => {
    const normalized = (status || "").toLowerCase();

    if (normalized === "resolved") {
      return {
        background: "rgba(34,197,94,0.16)",
        color: isLight ? "#166534" : "#F9FAFB",
        border: "1px solid rgba(34,197,94,0.22)",
      };
    }

    if (normalized === "under review") {
      return {
        background: "rgba(125,179,209,0.18)",
        color: isLight ? "#1e3a5f" : "#F9FAFB",
        border: "1px solid rgba(125,179,209,0.22)",
      };
    }

    return {
      background: "rgba(245,161,0,0.16)",
      color: isLight ? "#9a6700" : "#F9FAFB",
      border: "1px solid rgba(245,161,0,0.22)",
    };
  };

  const filteredFeedback =
    statusFilter === "All"
      ? feedbackList
      : feedbackList.filter(
          (item) =>
            (item.status || "").toLowerCase() === statusFilter.toLowerCase()
        );

  const filterOptions = ["All", "Open", "Resolved", "Under Review"];
  const statusOptions = ["Open", "Under Review", "Resolved"];

  return (
    <AdminLayout>
      <div style={{ marginBottom: "22px" }}>
        <h1
          style={{
            color: textPrimary,
            fontSize: "32px",
            fontWeight: "800",
            margin: 0,
          }}
        >
          Chat & Feedback
        </h1>
        <p
          style={{
            color: textSecondary,
            marginTop: "8px",
            fontSize: "15px",
          }}
        >
          Review reports, complaints, and session feedback.
        </p>
      </div>

      {loading ? (
        <p style={{ color: textPrimary, opacity: 0.8 }}>Loading feedback...</p>
      ) : error ? (
        <p style={{ color: "#ff7d7d" }}>{error}</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "18px",
          }}
        >
          <div
            style={{
              background: cardBackground,
              borderRadius: "28px",
              padding: "24px",
              border: cardBorder,
              boxShadow: cardShadow,
            }}
          >
            <h3
              style={{
                color: textPrimary,
                fontSize: "22px",
                fontWeight: "800",
                marginBottom: "18px",
              }}
            >
              Feedback Summary
            </h3>
            <div style={{ display: "grid", gap: "14px" }}>
              <div
                style={{
                  background: miniCardBackground,
                  border: miniCardBorder,
                  borderRadius: "18px",
                  padding: "16px 18px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ color: labelColor, fontSize: "15px" }}>
                  Mentor Rating
                </span>
                <span style={{ color: "#F5A100", fontSize: "18px", fontWeight: "800" }}>
                  {summary.mentorRating} / 5
                </span>
              </div>

              <div
                style={{
                  background: miniCardBackground,
                  border: miniCardBorder,
                  borderRadius: "18px",
                  padding: "16px 18px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ color: labelColor, fontSize: "15px" }}>
                  Application Rating
                </span>
                <span style={{ color: "#F5A100", fontSize: "18px", fontWeight: "800" }}>
                  {summary.applicationRating} / 5
                </span>
              </div>

              <div
                style={{
                  background: miniCardBackground,
                  border: miniCardBorder,
                  borderRadius: "18px",
                  padding: "16px 18px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ color: labelColor, fontSize: "15px" }}>
                  Chat Experience
                </span>
                <span style={{ color: "#F5A100", fontSize: "18px", fontWeight: "800" }}>
                  {summary.chatExperience} / 5
                </span>
              </div>
            </div>
          </div>

          <div
            style={{
              background: cardBackground,
              borderRadius: "28px",
              padding: "24px",
              border: cardBorder,
              boxShadow: cardShadow,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "18px",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <h3
                style={{
                  color: textPrimary,
                  fontSize: "22px",
                  fontWeight: "800",
                  marginBottom: 0,
                }}
              >
                Reported Sessions
              </h3>

              <div style={{ position: "relative", minWidth: "190px" }}>
                <button
                  onClick={() => setIsFilterOpen((prev) => !prev)}
                  style={{
                    width: "190px",
                    padding: "12px 16px",
                    borderRadius: "16px",
                    border: customSelectBorder,
                    background: customSelectBg,
                    color: customSelectText,
                    fontSize: "15px",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    boxShadow: isLight
                      ? "0 8px 20px rgba(15,23,42,0.08)"
                      : "0 8px 20px rgba(0,0,0,0.12)",
                  }}
                >
                  <span>{statusFilter}</span>
                  <span style={{ color: arrowColor, fontSize: "14px" }}>
                    {isFilterOpen ? "▴" : "▾"}
                  </span>
                </button>

                {isFilterOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      left: 0,
                      right: 0,
                      background: dropdownMenuBg,
                      border: dropdownMenuBorder,
                      borderRadius: "16px",
                      padding: "8px",
                      boxShadow: isLight
                        ? "0 18px 36px rgba(15,23,42,0.12)"
                        : "0 18px 36px rgba(0,0,0,0.22)",
                      zIndex: 100,
                      display: "grid",
                      gap: "6px",
                    }}
                  >
                    {filterOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setStatusFilter(option);
                          setIsFilterOpen(false);
                        }}
                        style={{
                          width: "100%",
                          textAlign: "left",
                          padding: "12px 14px",
                          borderRadius: "12px",
                          border: "none",
                          background:
                            statusFilter === option
                              ? "rgba(245,161,0,0.14)"
                              : "transparent",
                          color:
                            statusFilter === option
                              ? "#F5A100"
                              : dropdownItemColor,
                          fontSize: "14px",
                          fontWeight: "600",
                          cursor: "pointer",
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: "grid", gap: "12px" }}>
              {filteredFeedback.length > 0 ? (
                filteredFeedback.map((report) => (
                  <div
                    key={report._id}
                    style={{
                      background: miniCardBackground,
                      border: miniCardBorder,
                      borderRadius: "18px",
                      padding: "16px 18px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "16px",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          color: textPrimary,
                          fontWeight: "700",
                          marginBottom: "4px",
                        }}
                      >
                        {report.session}
                      </div>

                      <div
                        style={{
                          color: issueColor,
                          fontSize: "14px",
                          marginBottom: "10px",
                        }}
                      >
                        {report.issue}
                      </div>

                      <div
                        style={{
                          color: "#F5A100",
                          fontSize: "14px",
                          fontWeight: "700",
                        }}
                      >
                        Rating: {report.rating} / 5
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        alignItems: "flex-end",
                        minWidth: "150px",
                      }}
                    >
                      <div style={{ position: "relative", width: "150px" }}>
                        <button
                          onClick={() =>
                            setOpenStatusMenuId((prev) =>
                              prev === report._id ? null : report._id
                            )
                          }
                          style={{
                            width: "150px",
                            padding: "10px 14px",
                            borderRadius: "16px",
                            fontSize: "13px",
                            fontWeight: "700",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            cursor: "pointer",
                            boxShadow: isLight
                              ? "0 8px 20px rgba(15,23,42,0.08)"
                              : "0 8px 20px rgba(0,0,0,0.12)",
                            ...getStatusBadgeStyle(report.status),
                          }}
                        >
                          <span>{report.status}</span>
                          <span style={{ color: arrowColor, fontSize: "14px" }}>
                            {openStatusMenuId === report._id ? "▴" : "▾"}
                          </span>
                        </button>

                        {openStatusMenuId === report._id && (
                          <div
                            style={{
                              position: "absolute",
                              top: "calc(100% + 8px)",
                              left: 0,
                              right: 0,
                              background: dropdownMenuBg,
                              border: dropdownMenuBorder,
                              borderRadius: "16px",
                              padding: "8px",
                              boxShadow: isLight
                                ? "0 18px 36px rgba(15,23,42,0.12)"
                                : "0 18px 36px rgba(0,0,0,0.22)",
                              zIndex: 100,
                              display: "grid",
                              gap: "6px",
                            }}
                          >
                            {statusOptions.map((option) => (
                              <button
                                key={option}
                                onClick={() => handleStatusUpdate(report, option)}
                                style={{
                                  width: "100%",
                                  textAlign: "left",
                                  padding: "12px 14px",
                                  borderRadius: "12px",
                                  border: "none",
                                  background:
                                    report.status === option
                                      ? "rgba(245,161,0,0.14)"
                                      : "transparent",
                                  color:
                                    report.status === option
                                      ? "#F5A100"
                                      : dropdownItemColor,
                                  fontSize: "14px",
                                  fontWeight: "600",
                                  cursor: "pointer",
                                }}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => openDeleteModal(report)}
                        style={{
                          padding: "8px 12px",
                          borderRadius: "10px",
                          border: deleteBtnBorder,
                          background: deleteBtnBg,
                          color: "#ff7d7d",
                          fontSize: "13px",
                          fontWeight: "700",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    background: miniCardBackground,
                    border: miniCardBorder,
                    borderRadius: "18px",
                    padding: "16px 18px",
                    display: "flex",
                    justifyContent: "space-between",
                    color: issueColor,
                    fontSize: "14px",
                  }}
                >
                  No feedback found.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && feedbackToDelete && (
        <div
          onClick={closeDeleteModal}
          style={{
            position: "fixed",
            inset: 0,
            background: overlayBackground,
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            padding: "24px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "520px",
              borderRadius: "24px",
              overflow: "hidden",
              background: deleteModalBg,
              border: deleteModalBorder,
              boxShadow: deleteModalShadow,
            }}
          >
            <div style={{ padding: "28px", position: "relative" }}>
              <button
                onClick={closeDeleteModal}
                style={{
                  position: "absolute",
                  top: "18px",
                  right: "18px",
                  background: "transparent",
                  border: "none",
                  color: closeButtonColor,
                  fontSize: "34px",
                  lineHeight: 1,
                  cursor: "pointer",
                }}
              >
                ×
              </button>

              <h2
                style={{
                  margin: "4px 0 14px 0",
                  color: textPrimary,
                  fontSize: "24px",
                  fontWeight: "800",
                }}
              >
                Delete Feedback
              </h2>

              <p
                style={{
                  margin: 0,
                  color: modalTextSecondary,
                  fontSize: "15px",
                  lineHeight: 1.7,
                }}
              >
                Are you sure you want to delete feedback for{" "}
                <span style={{ color: textPrimary, fontWeight: "700" }}>
                  {feedbackToDelete.session}
                </span>
                ? This action cannot be undone.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
                padding: "18px 28px 22px 28px",
                borderTop: dividerBorder,
              }}
            >
              <button
                onClick={closeDeleteModal}
                style={{
                  padding: "12px 24px",
                  borderRadius: "14px",
                  border: cancelBtnBorder,
                  background: cancelBtnBg,
                  color: cancelBtnColor,
                  fontSize: "15px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteFeedback}
                style={{
                  padding: "12px 24px",
                  borderRadius: "14px",
                  border: "1px solid rgba(239,68,68,0.28)",
                  background: "rgba(239,68,68,0.16)",
                  color: isLight ? "#b91c1c" : "#fecaca",
                  fontSize: "15px",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default ChatFeedback;