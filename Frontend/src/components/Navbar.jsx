import { useNavigate } from "react-router-dom";

function Navbar({ themeMode = "Dark" }) {
  const navigate = useNavigate();
  const isLight = themeMode === "Light";

  const handleReload = () => {
    window.location.reload();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    localStorage.removeItem("adminLoggedIn");
    navigate("/");
  };

  return (
    <div
      style={{
        height: "70px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        borderBottom: isLight
          ? "1px solid rgba(15,23,42,0.08)"
          : "1px solid rgba(255,255,255,0.05)",
        transition: "all 0.25s ease",
      }}
    >
      <div>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "700",
            margin: 0,
            color: isLight ? "#0f172a" : "#F9FAFB",
            transition: "all 0.25s ease",
          }}
        >
          SkillSync Dashboard
        </h2>

        <p
          style={{
            margin: "2px 0 0",
            fontSize: "12px",
            color: isLight ? "rgba(15,23,42,0.55)" : "rgba(255,255,255,0.55)",
            transition: "all 0.25s ease",
          }}
        >
          Admin Panel
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <button
          onClick={handleReload}
          title="Reload page"
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "10px",
            border: isLight
              ? "1px solid rgba(15,23,42,0.10)"
              : "1px solid rgba(255,255,255,0.08)",
            background: isLight
              ? "rgba(15,23,42,0.03)"
              : "rgba(255,255,255,0.03)",
            color: isLight ? "#0f172a" : "#F9FAFB",
            cursor: "pointer",
            transition: "all 0.25s ease",
          }}
        >
          ⟳
        </button>

        <div
          style={{
            padding: "6px 14px",
            borderRadius: "999px",
            background: isLight
              ? "rgba(15,23,42,0.05)"
              : "rgba(255,255,255,0.05)",
            fontSize: "13px",
            fontWeight: "600",
            color: isLight ? "#0f172a" : "#F9FAFB",
            transition: "all 0.25s ease",
          }}
        >
          Admin
        </div>

        <button
          onClick={handleLogout}
          style={{
            padding: "8px 14px",
            borderRadius: "12px",
            border: "1px solid rgba(245,161,0,0.28)",
            background: isLight
              ? "rgba(245,161,0,0.14)"
              : "rgba(245,161,0,0.12)",
            color: isLight ? "#0f172a" : "#F9FAFB",
            fontSize: "13px",
            fontWeight: "700",
            cursor: "pointer",
            transition: "all 0.25s ease",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;