import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function AdminLayout({ children }) {
  const [themeMode, setThemeMode] = useState("Dark");

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

  const isLight = themeMode === "Light";

  const themeVars = isLight
    ? {
        "--app-text": "#0f172a",
        "--app-subtext": "rgba(15,23,42,0.62)",
        "--app-panel": "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.99) 100%)",
        "--app-border": "rgba(15,23,42,0.08)",
        "--app-shadow": "0 20px 45px rgba(15,23,42,0.10)",
        "--app-card": "rgba(255,255,255,0.82)",
        "--app-card-border": "rgba(15,23,42,0.08)",
      }
    : {
        "--app-text": "#F9FAFB",
        "--app-subtext": "rgba(249,250,251,0.62)",
        "--app-panel": "linear-gradient(180deg, rgba(15,29,39,0.95) 0%, rgba(16,38,50,0.98) 100%)",
        "--app-border": "rgba(255,255,255,0.05)",
        "--app-shadow": "0 20px 45px rgba(0,0,0,0.25)",
        "--app-card": "rgba(255,255,255,0.03)",
        "--app-card-border": "rgba(255,255,255,0.05)",
      };

  return (
    <div
      className={isLight ? "theme-light" : "theme-dark"}
      style={{
        ...themeVars,
        minHeight: "100vh",
        display: "flex",
        background: isLight
          ? "radial-gradient(circle at top left, rgba(245,161,0,0.10), transparent 18%), linear-gradient(135deg, #f8fafc 0%, #eef2f7 45%, #e5ebf3 100%)"
          : "radial-gradient(circle at top left, rgba(245,161,0,0.10), transparent 20%), linear-gradient(135deg, #0d1a22 0%, #132733 45%, #183847 100%)",
        transition: "all 0.25s ease",
      }}
    >
      <Sidebar themeMode={themeMode} />

      <div
        style={{
          flex: 1,
          padding: "18px 20px 18px 0",
        }}
      >
        <div
          style={{
            minHeight: "100%",
            borderRadius: "34px",
            overflow: "hidden",
            background: "var(--app-panel)",
            border: "1px solid var(--app-border)",
            boxShadow: "var(--app-shadow)",
            transition: "all 0.25s ease",
          }}
        >
          <Navbar themeMode={themeMode} />
          <div
            style={{
              padding: "28px",
              color: "var(--app-text)",
              transition: "all 0.25s ease",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;