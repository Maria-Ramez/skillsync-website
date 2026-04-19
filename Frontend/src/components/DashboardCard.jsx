import { useEffect, useState } from "react";

function DashboardCard({ title, value, subtitle, accent }) {
  const [themeMode, setThemeMode] = useState("Dark");

  useEffect(() => {
    const loadTheme = () => {
      const savedSettings = localStorage.getItem("adminSettings");

      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings);
          setThemeMode(parsed.themeMode || "Dark");
        } catch (error) {
          console.error("Failed to load dashboard card theme:", error);
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

  return (
    <div
      style={{
        borderRadius: "24px",
        padding: "20px 22px",
        transition: "all 0.25s ease",
        background: isLight
          ? "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(248,250,252,0.98) 100%)"
          : "linear-gradient(180deg, rgba(20,53,70,0.95) 0%, rgba(16,38,50,0.98) 100%)",
        border: isLight
          ? "1px solid rgba(15,23,42,0.08)"
          : "1px solid rgba(255,255,255,0.05)",
        boxShadow: isLight
          ? "0 10px 24px rgba(15,23,42,0.08)"
          : "0 12px 26px rgba(0,0,0,0.15)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {!isLight && (
        <>
          <div
            style={{
              position: "absolute",
              right: "18px",
              bottom: "-8px",
              width: "54px",
              height: "54px",
              borderRadius: "50%",
              background: `${accent}22`,
              filter: "blur(10px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: "48px",
              bottom: "8px",
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              background: `${accent}18`,
              filter: "blur(6px)",
            }}
          />
        </>
      )}

      <div
        style={{
          fontSize: "14px",
          fontWeight: "600",
          marginBottom: "10px",
          color: isLight ? "rgba(15,23,42,0.62)" : "rgba(249,250,251,0.62)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: "32px",
          fontWeight: "800",
          marginBottom: "8px",
          color: isLight ? "#0f172a" : "#F9FAFB",
          position: "relative",
          zIndex: 1,
        }}
      >
        {value}
      </div>

      <div
        style={{
          fontSize: "13px",
          fontWeight: "700",
          color: accent,
          position: "relative",
          zIndex: 1,
        }}
      >
        {subtitle}
      </div>
    </div>
  );
}

export default DashboardCard;