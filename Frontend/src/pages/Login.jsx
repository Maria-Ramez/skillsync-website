import AdminLayout from "../layouts/AdminLayout";
import { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);
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

  return (
    <AdminLayout>
      <div style={{ marginBottom: "22px" }}>
        <h1
          style={{
            color: isLight ? "#0f172a" : "#F9FAFB",
            fontSize: "32px",
            fontWeight: "800",
            margin: 0,
          }}
        >
          User Management
        </h1>

        <p
          style={{
            color: isLight
              ? "rgba(15,23,42,0.6)"
              : "rgba(249,250,251,0.6)",
            marginTop: "8px",
            fontSize: "15px",
          }}
        >
          View and manage all registered users.
        </p>
      </div>

      {/* MAIN CARD */}
      <div
        style={{
          borderRadius: "28px",
          padding: "24px",
          transition: "all 0.25s ease",

          background: isLight
            ? "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)"
            : "linear-gradient(180deg, rgba(20,53,70,0.95) 0%, rgba(16,38,50,0.98) 100%)",

          border: isLight
            ? "1px solid rgba(15,23,42,0.08)"
            : "1px solid rgba(255,255,255,0.05)",

          boxShadow: isLight
            ? "0 10px 24px rgba(15,23,42,0.08)"
            : "0 12px 26px rgba(0,0,0,0.15)",
        }}
      >
        {/* SEARCH */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "18px",
          }}
        >
          <input
            placeholder="Search by name or email"
            style={{
              flex: 1,
              padding: "14px 16px",
              borderRadius: "14px",
              border: isLight
                ? "1px solid rgba(15,23,42,0.1)"
                : "1px solid rgba(255,255,255,0.07)",

              background: isLight
                ? "rgba(15,23,42,0.03)"
                : "rgba(255,255,255,0.03)",

              color: isLight ? "#0f172a" : "#F9FAFB",
              outline: "none",
            }}
          />

          <button
            style={{
              padding: "0 18px",
              borderRadius: "12px",
              border: "none",
              background: "#F5A100",
              color: "#102632",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </div>

        {/* TABLE */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left" }}>
              {["Name", "Email", "Role", "Status", "Actions"].map((item) => (
                <th
                  key={item}
                  style={{
                    color: isLight
                      ? "rgba(15,23,42,0.55)"
                      : "rgba(249,250,251,0.52)",
                    fontSize: "13px",
                    fontWeight: "600",
                    paddingBottom: "14px",
                  }}
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5">
                  <div
                    style={{
                      padding: "20px 0",
                      color: isLight
                        ? "#64748b"
                        : "rgba(255,255,255,0.6)",
                    }}
                  >
                    No users found.
                  </div>
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id}>
                  <td style={cellStyle(isLight)}>{user.name}</td>
                  <td style={cellStyle(isLight)}>{user.email}</td>
                  <td style={cellStyle(isLight)}>{user.role}</td>
                  <td style={cellStyle(isLight)}>{user.status}</td>
                  <td style={cellStyle(isLight)}>...</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

const cellStyle = (isLight) => ({
  padding: "16px 0",
  borderTop: isLight
    ? "1px solid rgba(15,23,42,0.08)"
    : "1px solid rgba(255,255,255,0.05)",
  color: isLight ? "#0f172a" : "#F9FAFB",
});

export default Users;