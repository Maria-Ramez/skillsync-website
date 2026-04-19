import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";

function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    autoRefresh: false,
    themeMode: "Dark",
    tableDensity: "Comfortable",
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem("adminSettings");

    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error("Failed to load settings:", error);
      }
    }
  }, []);

  const updateSetting = (key, value) => {
    const updatedSettings = {
      ...settings,
      [key]: value,
    };

    setSettings(updatedSettings);
    localStorage.setItem("adminSettings", JSON.stringify(updatedSettings));
    window.dispatchEvent(new Event("admin-theme-change"));
  };

  const securityLogs = [
    "Admin login from new device",
    "User account blocked",
    "Feedback status updated",
    "Settings updated successfully",
  ];

  const isLight = settings.themeMode === "Light";

  const textPrimary = isLight ? "#0f172a" : "#F9FAFB";
  const textSecondary = isLight
    ? "rgba(15,23,42,0.62)"
    : "rgba(249,250,251,0.6)";
  const cardBg = isLight
    ? "rgba(255,255,255,0.82)"
    : "linear-gradient(180deg, rgba(20,53,70,0.95) 0%, rgba(16,38,50,0.98) 100%)";
  const rowBg = isLight ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.03)";
  const rowBorder = isLight
    ? "1px solid rgba(15,23,42,0.08)"
    : "1px solid rgba(255,255,255,0.05)";
  const inactiveBg = isLight ? "rgba(15,23,42,0.06)" : "rgba(255,255,255,0.08)";
  const inactiveText = isLight ? "#0f172a" : "#F9FAFB";
  const optionInactiveBg = isLight ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.03)";
  const optionInactiveColor = isLight ? "#0f172a" : "#F9FAFB";

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
          Settings & Security
        </h1>
        <p
          style={{
            color: textSecondary,
            marginTop: "8px",
            fontSize: "15px",
          }}
        >
          Manage admin preferences, platform controls, and security logs.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "18px",
        }}
      >
        <div
          style={{
            background: cardBg,
            borderRadius: "28px",
            padding: "24px",
            border: rowBorder,
            boxShadow: isLight
              ? "0 12px 26px rgba(15,23,42,0.08)"
              : "0 12px 26px rgba(0,0,0,0.15)",
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
            Platform Settings
          </h3>

          <div style={{ display: "grid", gap: "14px" }}>
            <div style={{ ...rowStyle, background: rowBg, border: rowBorder, color: textPrimary }}>
              <span>Enable Notifications</span>
              <button
                onClick={() =>
                  updateSetting("notifications", !settings.notifications)
                }
                style={{
                  ...toggleBtn,
                  ...(settings.notifications
                    ? activePill
                    : { background: inactiveBg, color: inactiveText }),
                }}
              >
                {settings.notifications ? "ON" : "OFF"}
              </button>
            </div>

            <div style={{ ...rowStyle, background: rowBg, border: rowBorder, color: textPrimary }}>
              <span>Auto Refresh Dashboard</span>
              <button
                onClick={() =>
                  updateSetting("autoRefresh", !settings.autoRefresh)
                }
                style={{
                  ...toggleBtn,
                  ...(settings.autoRefresh
                    ? activePill
                    : { background: inactiveBg, color: inactiveText }),
                }}
              >
                {settings.autoRefresh ? "ON" : "OFF"}
              </button>
            </div>

            <div style={{ ...rowStyle, background: rowBg, border: rowBorder, color: textPrimary }}>
              <span>Payment Gateway</span>
              <span style={statusPill}>Configured</span>
            </div>

            <div
              style={{
                ...rowStyleColumn,
                background: rowBg,
                border: rowBorder,
              }}
            >
              <span style={{ color: textPrimary }}>Theme Mode</span>

              <div style={optionGroup}>
                {["Dark", "Light"].map((option) => (
                  <button
                    key={option}
                    onClick={() => updateSetting("themeMode", option)}
                    style={{
                      ...optionBtn,
                      ...(settings.themeMode === option
                        ? activeOptionBtn
                        : {
                            background: optionInactiveBg,
                            color: optionInactiveColor,
                          }),
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div
              style={{
                ...rowStyleColumn,
                background: rowBg,
                border: rowBorder,
              }}
            >
              <span style={{ color: textPrimary }}>Table Density</span>

              <div style={optionGroup}>
                {["Compact", "Comfortable"].map((option) => (
                  <button
                    key={option}
                    onClick={() => updateSetting("tableDensity", option)}
                    style={{
                      ...optionBtn,
                      ...(settings.tableDensity === option
                        ? activeOptionBtn
                        : {
                            background: optionInactiveBg,
                            color: optionInactiveColor,
                          }),
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            background: cardBg,
            borderRadius: "28px",
            padding: "24px",
            border: rowBorder,
            boxShadow: isLight
              ? "0 12px 26px rgba(15,23,42,0.08)"
              : "0 12px 26px rgba(0,0,0,0.15)",
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
            Security Logs
          </h3>

          <div style={{ display: "grid", gap: "12px" }}>
            {securityLogs.map((log) => (
              <div
                key={log}
                style={{
                  background: rowBg,
                  border: rowBorder,
                  borderRadius: "18px",
                  padding: "16px 18px",
                  color: textSecondary,
                }}
              >
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

const rowStyle = {
  borderRadius: "18px",
  padding: "16px 18px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const rowStyleColumn = {
  borderRadius: "18px",
  padding: "16px 18px",
  display: "grid",
  gap: "14px",
};

const toggleBtn = {
  padding: "6px 14px",
  borderRadius: "999px",
  fontSize: "13px",
  fontWeight: "700",
  border: "none",
  cursor: "pointer",
};

const activePill = {
  background: "rgba(245,161,0,0.16)",
  color: "#0f172a",
};

const statusPill = {
  padding: "6px 14px",
  borderRadius: "999px",
  background: "rgba(245,161,0,0.16)",
  color: "#0f172a",
  fontSize: "13px",
  fontWeight: "700",
};

const optionGroup = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
};

const optionBtn = {
  padding: "10px 16px",
  borderRadius: "12px",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
  border: "1px solid rgba(245,161,0,0.18)",
};

const activeOptionBtn = {
  background: "rgba(245,161,0,0.14)",
  color: "#F5A100",
};

export default Settings;