import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";

function Analytics() {
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    totalMentors: 0,
    totalCareerPaths: 0,
    totalFeedback: 0,
    totalSessions: 0,
    averageMentorRating: 0,
    growthBars: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("http://localhost:5000/api/analytics", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load analytics");
        }

        setAnalytics({
          totalUsers: data.totalUsers || 0,
          totalMentors: data.totalMentors || 0,
          totalCareerPaths: data.totalCareerPaths || 0,
          totalFeedback: data.totalFeedback || 0,
          totalSessions: data.totalSessions || 0,
          averageMentorRating: data.averageMentorRating || 0,
          growthBars: data.growthBars || [],
        });
      } catch (err) {
        setError(err.message || "Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [token]);

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
  const innerCardBackground = isLight
    ? "rgba(255,255,255,0.72)"
    : "rgba(255,255,255,0.03)";
  const innerCardBorder = isLight
    ? "1px solid rgba(15,23,42,0.08)"
    : "1px solid rgba(255,255,255,0.05)";
  const labelColor = isLight
    ? "rgba(15,23,42,0.72)"
    : "rgba(249,250,251,0.68)";
  const barLabelColor = isLight
    ? "rgba(15,23,42,0.62)"
    : "rgba(249,250,251,0.55)";

  const growthBars =
    analytics.growthBars.length > 0
      ? analytics.growthBars
      : [
          { label: "Users", value: 0 },
          { label: "Mentors", value: 0 },
          { label: "Paths", value: 0 },
          { label: "Feedback", value: 0 },
          { label: "Sessions", value: 0 },
          { label: "Ratings", value: 0 },
        ];

  const maxBarValue = Math.max(...growthBars.map((item) => item.value), 1);

  const analyticsMetrics = [
    ["Total Users", analytics.totalUsers],
    ["Total Mentors", analytics.totalMentors],
    ["Career Paths", analytics.totalCareerPaths],
    ["Average Mentor Rating", analytics.averageMentorRating],
    ["Total Sessions", analytics.totalSessions],
    ["Total Feedback Reports", analytics.totalFeedback],
  ];

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
          Analytics & Reports
        </h1>
        <p
          style={{
            color: textSecondary,
            marginTop: "8px",
            fontSize: "15px",
          }}
        >
          Monitor growth, usage, and platform engagement.
        </p>
      </div>

      {loading ? (
        <p style={{ color: textPrimary, opacity: 0.8 }}>Loading analytics...</p>
      ) : error ? (
        <p style={{ color: "#ff7d7d" }}>{error}</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
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
              Platform Growth Overview
            </h3>

            <div
              style={{
                display: "flex",
                alignItems: "end",
                gap: "12px",
                height: "260px",
                paddingTop: "10px",
              }}
            >
              {growthBars.map((item, i) => {
                const scaledHeight = Math.max(
                  (item.value / maxBarValue) * 190,
                  20
                );

                return (
                  <div key={item.label} style={{ flex: 1, textAlign: "center" }}>
                    <div
                      style={{
                        height: `${scaledHeight}px`,
                        borderRadius: "18px 18px 8px 8px",
                        background:
                          i % 2 === 0
                            ? "linear-gradient(180deg, #F5A100 0%, #C58000 100%)"
                            : "linear-gradient(180deg, #7DB3D1 0%, #355D75 100%)",
                        boxShadow: isLight
                          ? "0 10px 18px rgba(15,23,42,0.12)"
                          : "0 10px 18px rgba(0,0,0,0.14)",
                      }}
                    />
                    <div
                      style={{
                        marginTop: "10px",
                        color: barLabelColor,
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {item.label}
                    </div>
                  </div>
                );
              })}
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
            <h3
              style={{
                color: textPrimary,
                fontSize: "22px",
                fontWeight: "800",
                marginBottom: "18px",
              }}
            >
              Top Metrics
            </h3>

            <div style={{ display: "grid", gap: "12px" }}>
              {analyticsMetrics.map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    background: innerCardBackground,
                    border: innerCardBorder,
                    borderRadius: "18px",
                    padding: "16px 18px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      color: labelColor,
                      fontSize: "15px",
                    }}
                  >
                    {label}
                  </span>

                  <span
                    style={{
                      color: "#F5A100",
                      fontSize: "18px",
                      fontWeight: "800",
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default Analytics;