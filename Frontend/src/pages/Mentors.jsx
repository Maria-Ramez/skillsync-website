import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";

function Mentors() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedMentor, setSelectedMentor] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    field: "",
    rating: 0,
    sessions: 0,
    status: "Active",
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [mentorToDelete, setMentorToDelete] = useState(null);
  const [themeMode, setThemeMode] = useState("Dark");

  useEffect(() => {
    const loadTheme = () => {
      const saved = localStorage.getItem("adminSettings");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setThemeMode(parsed.themeMode || "Dark");
        } catch {}
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

  const isLight = themeMode === "Light";

  const textPrimary = isLight ? "#0f172a" : "#F9FAFB";
  const textSecondary = isLight ? "#64748b" : "rgba(249,250,251,0.6)";
  const tableText = isLight ? "#475569" : "rgba(255,255,255,0.75)";
  const borderColor = isLight
    ? "1px solid rgba(15,23,42,0.08)"
    : "1px solid rgba(255,255,255,0.05)";
  const cardBg = isLight
    ? "#ffffff"
    : "rgba(255,255,255,0.03)";
  const modalBg = isLight
    ? "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)"
    : "linear-gradient(180deg, rgba(20,53,70,0.97) 0%, rgba(16,38,50,0.99) 100%)";

  const token = localStorage.getItem("token");

  const fetchMentors = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:5000/api/mentors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

  const openEditModal = (mentor) => {
    setSelectedMentor(mentor);
    setEditForm({
      name: mentor.name || "",
      email: mentor.email || "",
      field: mentor.field || "",
      rating: mentor.rating || 0,
      sessions: mentor.sessions || 0,
      status: mentor.status || "Active",
    });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedMentor(null);
    setIsEditModalOpen(false);
  };

  const openDeleteModal = (mentor) => {
    setMentorToDelete(mentor);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setMentorToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: name === "rating" || name === "sessions" ? Number(value) : value,
    }));
  };

  const handleUpdateMentor = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/mentors/${selectedMentor._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editForm),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update mentor");
      }

      closeEditModal();
      fetchMentors();
    } catch (err) {
      alert(err.message || "Failed to update mentor");
    }
  };

  const handleDeleteMentor = async () => {
    if (!mentorToDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/mentors/${mentorToDelete._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete mentor");
      }

      closeDeleteModal();
      fetchMentors();
    } catch (err) {
      alert(err.message || "Failed to delete mentor");
    }
  };

  const getStatusStyle = (status) => {
    const normalized = (status || "").toLowerCase();

    if (normalized === "active") {
      return {
        background: "rgba(34,197,94,0.15)",
        color: isLight ? "#15803d" : "#86efac",
        border: "1px solid rgba(34,197,94,0.25)",
      };
    }

    if (normalized === "rejected") {
      return {
        background: "rgba(239,68,68,0.15)",
        color: isLight ? "#b91c1c" : "#fca5a5",
        border: "1px solid rgba(239,68,68,0.25)",
      };
    }

    return {
      background: "rgba(245,161,0,0.12)",
      color: "#F5A100",
      border: "1px solid rgba(245,161,0,0.25)",
    };
  };

  const actionBtn = {
    padding: "6px 12px",
    borderRadius: "10px",
    border: isLight
      ? "1px solid rgba(15,23,42,0.12)"
      : "1px solid rgba(255,255,255,0.08)",
    background: isLight ? "rgba(15,23,42,0.03)" : "transparent",
    color: textPrimary,
    cursor: "pointer",
  };

  const deleteBtn = {
    padding: "6px 12px",
    borderRadius: "10px",
    border: "1px solid rgba(239,68,68,0.25)",
    background: isLight ? "rgba(239,68,68,0.05)" : "transparent",
    color: "#ff7d7d",
    cursor: "pointer",
  };

  const overlayStyle = {
    position: "fixed",
    inset: 0,
    background: isLight ? "rgba(15,23,42,0.28)" : "rgba(5,12,18,0.58)",
    backdropFilter: "blur(5px)",
    WebkitBackdropFilter: "blur(5px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    padding: "24px",
    animation: "fadeIn 0.2s ease",
  };

  const modalStyle = {
    width: "100%",
    maxWidth: "560px",
    borderRadius: "24px",
    overflow: "hidden",
    background: modalBg,
    border: isLight
      ? "1px solid rgba(15,23,42,0.08)"
      : "1px solid rgba(255,255,255,0.08)",
    boxShadow: isLight
      ? "0 24px 60px rgba(15,23,42,0.14)"
      : "0 24px 60px rgba(0,0,0,0.35)",
    animation: "modalSlide 0.25s ease",
  };

  const deleteModalStyle = {
    width: "100%",
    maxWidth: "520px",
    borderRadius: "24px",
    overflow: "hidden",
    background: isLight
      ? "linear-gradient(180deg, #fff7f7 0%, #fff1f1 100%)"
      : "linear-gradient(180deg, rgba(39,20,20,0.97) 0%, rgba(30,16,16,0.99) 100%)",
    border: "1px solid rgba(239,68,68,0.16)",
    boxShadow: isLight
      ? "0 24px 60px rgba(15,23,42,0.14)"
      : "0 24px 60px rgba(0,0,0,0.35)",
    animation: "modalSlide 0.25s ease",
  };

  const closeBtn = {
    position: "absolute",
    top: "18px",
    right: "18px",
    background: "transparent",
    border: "none",
    color: isLight ? "rgba(15,23,42,0.5)" : "rgba(255,255,255,0.55)",
    fontSize: "34px",
    lineHeight: 1,
    cursor: "pointer",
  };

  const cancelBtn = {
    padding: "12px 24px",
    borderRadius: "14px",
    border: isLight
      ? "1px solid rgba(15,23,42,0.12)"
      : "1px solid rgba(255,255,255,0.12)",
    background: isLight ? "rgba(15,23,42,0.03)" : "rgba(255,255,255,0.02)",
    color: textPrimary,
    fontSize: "15px",
    cursor: "pointer",
  };

  const saveBtn = {
    padding: "12px 24px",
    borderRadius: "14px",
    border: "1px solid rgba(245,161,0,0.25)",
    background: "rgba(245,161,0,0.12)",
    color: isLight ? "#9a6700" : "#F9FAFB",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
  };

  const confirmDeleteBtn = {
    padding: "12px 24px",
    borderRadius: "14px",
    border: "1px solid rgba(239,68,68,0.28)",
    background: "rgba(239,68,68,0.16)",
    color: isLight ? "#b91c1c" : "#fecaca",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "14px",
    border: isLight
      ? "1px solid rgba(15,23,42,0.12)"
      : "1px solid rgba(255,255,255,0.08)",
    background: isLight ? "#f8fafc" : "rgba(255,255,255,0.03)",
    color: textPrimary,
    outline: "none",
    fontSize: "14px",
    boxSizing: "border-box",
  };

  const detailsLabel = {
    margin: "0 0 8px 0",
    color: isLight ? "#64748b" : "rgba(249,250,251,0.58)",
    fontSize: "13px",
    fontWeight: "600",
    letterSpacing: "0.2px",
  };

  const detailsValue = {
    margin: 0,
    color: textPrimary,
    fontSize: "15px",
    lineHeight: 1.7,
    whiteSpace: "pre-wrap",
  };

  return (
    <AdminLayout>
      <div style={{ marginBottom: "24px" }}>
        <h1
          style={{
            fontSize: "26px",
            margin: 0,
            color: textPrimary,
          }}
        >
          Mentor Monitoring
        </h1>

        <p style={{ color: textSecondary, fontSize: "14px" }}>
          View mentor profiles, specialization, ratings, and activity.
        </p>
      </div>

      <div
        style={{
          background: cardBg,
          border: borderColor,
          borderRadius: "20px",
          padding: "24px",
          boxShadow: isLight
            ? "0 10px 20px rgba(15,23,42,0.06)"
            : "none",
        }}
      >
        {loading ? (
          <p style={{ color: tableText }}>Loading mentors...</p>
        ) : error ? (
          <p style={{ color: "#ff7d7d" }}>{error}</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr
                style={{
                  fontSize: "12px",
                  color: isLight ? "#64748b" : "rgba(255,255,255,0.55)",
                }}
              >
                <th align="left">Mentor</th>
                <th align="left">Specialization</th>
                <th align="left">Rating</th>
                <th align="left">Sessions</th>
                <th align="left">Status</th>
                <th align="left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {mentors.map((mentor) => (
                <tr key={mentor._id} style={{ borderTop: borderColor }}>
                  <td
                    style={{
                      padding: "14px 0",
                      fontWeight: "600",
                      color: textPrimary,
                    }}
                  >
                    {mentor.name}
                  </td>

                  <td style={{ color: tableText }}>{mentor.field}</td>

                  <td style={{ color: "#F5A100", fontWeight: "600" }}>
                    ⭐ {mentor.rating}
                  </td>

                  <td style={{ color: tableText }}>{mentor.sessions}</td>

                  <td>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "6px 12px",
                        borderRadius: "999px",
                        fontSize: "12px",
                        fontWeight: "700",
                        ...getStatusStyle(mentor.status),
                      }}
                    >
                      {mentor.status || "Active"}
                    </span>
                  </td>

                  <td>
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        flexWrap: "wrap",
                        padding: "10px 0",
                      }}
                    >
                      <button onClick={() => openViewModal(mentor)} style={actionBtn}>
                        View
                      </button>

                      <button onClick={() => openEditModal(mentor)} style={actionBtn}>
                        Edit
                      </button>

                      <button onClick={() => openDeleteModal(mentor)} style={deleteBtn}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {mentors.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    style={{
                      padding: "18px 0",
                      color: tableText,
                      borderTop: borderColor,
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
        <div onClick={closeViewModal} style={overlayStyle}>
          <div onClick={(e) => e.stopPropagation()} style={modalStyle}>
            <div style={{ padding: "28px", position: "relative" }}>
              <button onClick={closeViewModal} style={closeBtn}>×</button>

              <h2 style={{ margin: "4px 0 18px 0", color: textPrimary, fontSize: "24px", fontWeight: "800" }}>
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

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", padding: "18px 28px 22px 28px", borderTop: borderColor }}>
              <button onClick={closeViewModal} style={cancelBtn}>Close</button>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && selectedMentor && (
        <div onClick={closeEditModal} style={overlayStyle}>
          <div onClick={(e) => e.stopPropagation()} style={modalStyle}>
            <div style={{ padding: "28px", position: "relative" }}>
              <button onClick={closeEditModal} style={closeBtn}>×</button>

              <h2 style={{ margin: "4px 0 18px 0", color: textPrimary, fontSize: "24px", fontWeight: "800" }}>
                Edit Mentor
              </h2>

              <form onSubmit={handleUpdateMentor} style={{ display: "grid", gap: "16px" }}>
                <div>
                  <p style={detailsLabel}>Name</p>
                  <input type="text" name="name" value={editForm.name} onChange={handleEditChange} required style={inputStyle} />
                </div>

                <div>
                  <p style={detailsLabel}>Email</p>
                  <input type="email" name="email" value={editForm.email} onChange={handleEditChange} required style={inputStyle} />
                </div>

                <div>
                  <p style={detailsLabel}>Specialization</p>
                  <input type="text" name="field" value={editForm.field} onChange={handleEditChange} required style={inputStyle} />
                </div>

                <div>
                  <p style={detailsLabel}>Rating</p>
                  <input type="number" name="rating" value={editForm.rating} onChange={handleEditChange} min="0" step="0.1" style={inputStyle} />
                </div>

                <div>
                  <p style={detailsLabel}>Sessions</p>
                  <input type="number" name="sessions" value={editForm.sessions} onChange={handleEditChange} min="0" style={inputStyle} />
                </div>

                <div>
                  <p style={detailsLabel}>Status</p>
                  <select name="status" value={editForm.status} onChange={handleEditChange} style={inputStyle}>
                    <option value="Active">Active</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "8px" }}>
                  <button type="button" onClick={closeEditModal} style={cancelBtn}>Cancel</button>
                  <button type="submit" style={saveBtn}>Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && mentorToDelete && (
        <div onClick={closeDeleteModal} style={overlayStyle}>
          <div onClick={(e) => e.stopPropagation()} style={deleteModalStyle}>
            <div style={{ padding: "28px", position: "relative" }}>
              <button onClick={closeDeleteModal} style={closeBtn}>×</button>

              <h2 style={{ margin: "4px 0 14px 0", color: textPrimary, fontSize: "24px", fontWeight: "800" }}>
                Delete Mentor
              </h2>

              <p style={{ margin: 0, color: isLight ? "#475569" : "rgba(255,255,255,0.72)", fontSize: "15px", lineHeight: 1.7 }}>
                Are you sure you want to delete{" "}
                <span style={{ color: textPrimary, fontWeight: "700" }}>
                  {mentorToDelete.name}
                </span>
                ? This action cannot be undone.
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", padding: "18px 28px 22px 28px", borderTop: isLight ? "1px solid rgba(239,68,68,0.16)" : "1px solid rgba(255,255,255,0.08)" }}>
              <button onClick={closeDeleteModal} style={cancelBtn}>Cancel</button>
              <button onClick={handleDeleteMentor} style={confirmDeleteBtn}>Delete</button>
            </div>
          </div>
        </div>
      )}

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
    </AdminLayout>
  );
}

export default Mentors;