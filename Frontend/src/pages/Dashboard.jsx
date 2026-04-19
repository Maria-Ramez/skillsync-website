import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import DashboardCard from "../components/DashboardCard";

function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalMentors: 0,
    totalCareerPaths: 0,
    activeSessions: 0,
    averageMentorRating: 0,
    topFields: [],
    recentMentors: [],
  });

  const [loadingStats, setLoadingStats] = useState(true);
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

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/api/dashboard/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load dashboard stats");
        }

        setStats({
          totalUsers: data.totalUsers || 0,
          totalMentors: data.totalMentors || 0,
          totalCareerPaths: data.totalCareerPaths || 0,
          activeSessions: data.activeSessions || 0,
          averageMentorRating: data.averageMentorRating || 0,
          topFields: data.topFields || [],
          recentMentors: data.recentMentors || [],
        });
      } catch (error) {
        console.error("Failed to load dashboard stats:", error.message);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const isLight = themeMode === "Light";

  const textPrimary = isLight ? "#0f172a" : "#F9FAFB";
  const textSecondary = isLight
    ? "rgba(15,23,42,0.62)"
    : "rgba(249,250,251,0.6)";
  const textMuted = isLight
    ? "rgba(15,23,42,0.55)"
    : "rgba(249,250,251,0.55)";
  const textSoft = isLight
    ? "rgba(15,23,42,0.72)"
    : "rgba(249,250,251,0.75)";
  const sectionCardBackground = isLight
    ? "linear-gradient(180deg, rgba(255,255,255,0.88) 0%, rgba(248,250,252,0.96) 100%)"
    : "linear-gradient(180deg, rgba(20,53,70,0.95) 0%, rgba(16,38,50,0.98) 100%)";
  const sectionCardBorder = isLight
    ? "1px solid rgba(15,23,42,0.08)"
    : "1px solid rgba(255,255,255,0.05)";
  const sectionCardShadow = isLight
    ? "0 12px 26px rgba(15,23,42,0.08)"
    : "0 12px 26px rgba(0,0,0,0.15)";
  const innerCardBackground = isLight
    ? "rgba(255,255,255,0.74)"
    : "rgba(255,255,255,0.02)";
  const innerCardBorder = isLight
    ? "1px solid rgba(15,23,42,0.08)"
    : "1px solid rgba(255,255,255,0.05)";
  const miniStatBackground = isLight
    ? "rgba(255,255,255,0.74)"
    : "rgba(255,255,255,0.025)";
  const miniStatBorder = isLight
    ? "1px solid rgba(15,23,42,0.08)"
    : "1px solid rgba(255,255,255,0.05)";
  const donutInnerBg = isLight ? "#ffffff" : "#143546";
  const rowBorder = isLight
    ? "1px solid rgba(15,23,42,0.08)"
    : "1px solid rgba(255,255,255,0.05)";

  const displayValue = (value) => (loadingStats ? "..." : value);

  const topFields =
    stats.topFields.length > 0
      ? stats.topFields
      : [
          { title: "No data yet", count: 0, subtitle: "No mentor fields found" },
        ];

  const recentMentors =
    stats.recentMentors.length > 0
      ? stats.recentMentors
      : [
          {
            name: "No activity yet",
            area: "-",
            status: "-",
            sessions: "-",
          },
        ];

  const SectionCard = ({ children, style = {} }) => (
    <div
      style={{
        background: sectionCardBackground,
        borderRadius: "28px",
        padding: "24px",
        border: sectionCardBorder,
        boxShadow: sectionCardShadow,
        transition: "all 0.25s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );

  return (
    <AdminLayout>
      <div style={{ marginBottom: "22px" }}>
        <h1
          style={{
            fontSize: "34px",
            fontWeight: "800",
            color: textPrimary,
            margin: 0,
          }}
        >
          Home Overview
        </h1>
        <p
          style={{
            marginTop: "8px",
            color: textSecondary,
            fontSize: "15px",
          }}
        >
          Quick view of platform sectors, mentors, users, sessions, and growth.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "18px",
          marginBottom: "20px",
        }}
      >
        <DashboardCard
          title="Total Users"
          value={displayValue(stats.totalUsers)}
          subtitle="Registered accounts"
          accent="#F5A100"
        />
        <DashboardCard
          title="Total Mentors"
          value={displayValue(stats.totalMentors)}
          subtitle="Available mentors"
          accent="#7DB3D1"
        />
        <DashboardCard
          title="Career Paths"
          value={displayValue(stats.totalCareerPaths)}
          subtitle="Published paths"
          accent="#B0D6EA"
        />
        <DashboardCard
          title="Active Sessions"
          value={displayValue(stats.activeSessions)}
          subtitle="Total mentor sessions"
          accent="#F5A100"
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.7fr 1fr",
          gap: "18px",
          marginBottom: "20px",
        }}
      >
        <SectionCard>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
              marginBottom: "18px",
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "800",
                  color: textPrimary,
                  marginBottom: "6px",
                }}
              >
                Main Sectors
              </h3>
              <p
                style={{
                  color: isLight
                    ? "rgba(15,23,42,0.58)"
                    : "rgba(249,250,251,0.58)",
                  fontSize: "14px",
                }}
              >
                Top mentor specializations currently available.
              </p>
            </div>

            <div style={{ color: isLight ? "rgba(15,23,42,0.25)" : "rgba(249,250,251,0.3)", fontSize: "24px" }}>
              • •
            </div>
          </div>

          <div style={{ display: "grid", gap: "14px", marginBottom: "18px" }}>
            {topFields.map((item) => (
              <div
                key={item.title}
                style={{
                  background: innerCardBackground,
                  border: innerCardBorder,
                  borderRadius: "18px",
                  padding: "18px 20px",
                  display: "grid",
                  gridTemplateColumns: "1.5fr 0.7fr 0.8fr",
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      color: textPrimary,
                      fontSize: "18px",
                      fontWeight: "700",
                      marginBottom: "4px",
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      color: isLight
                        ? "rgba(15,23,42,0.5)"
                        : "rgba(249,250,251,0.5)",
                      fontSize: "13px",
                    }}
                  >
                    {item.title}
                  </div>
                </div>

                <div
                  style={{
                    color: textPrimary,
                    fontSize: "22px",
                    fontWeight: "800",
                    textAlign: "center",
                  }}
                >
                  {displayValue(item.count)}
                </div>

                <div
                  style={{
                    color: isLight
                      ? "rgba(15,23,42,0.62)"
                      : "rgba(249,250,251,0.62)",
                    fontSize: "14px",
                    textAlign: "right",
                  }}
                >
                  {item.subtitle}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              background: innerCardBackground,
              border: innerCardBorder,
              borderRadius: "22px",
              padding: "20px",
            }}
          >
            <div
              style={{
                color: textPrimary,
                fontSize: "19px",
                fontWeight: "800",
                marginBottom: "16px",
              }}
            >
              Recent Activity
            </div>

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr style={{ textAlign: "left" }}>
                  {["Name", "Area", "Status", "Sessions"].map((item) => (
                    <th
                      key={item}
                      style={{
                        color: isLight
                          ? "rgba(15,23,42,0.52)"
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
                {recentMentors.map((mentor, index) => (
                  <tr key={`${mentor.name}-${index}`}>
                    <td
                      style={{
                        color: textPrimary,
                        fontSize: "15px",
                        padding: "14px 0",
                        borderTop: rowBorder,
                      }}
                    >
                      {mentor.name}
                    </td>
                    <td
                      style={{
                        color: textSoft,
                        fontSize: "15px",
                        padding: "14px 0",
                        borderTop: rowBorder,
                      }}
                    >
                      {mentor.area}
                    </td>
                    <td
                      style={{
                        padding: "14px 0",
                        borderTop: rowBorder,
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          padding: "6px 14px",
                          borderRadius: "999px",
                          background:
                            mentor.status === "Active"
                              ? "rgba(245,161,0,0.16)"
                              : isLight
                              ? "rgba(15,23,42,0.06)"
                              : "rgba(255,255,255,0.08)",
                          color: mentor.status === "Active"
                            ? isLight
                              ? "#9a6700"
                              : "#F9FAFB"
                            : textPrimary,
                          fontSize: "13px",
                          fontWeight: "700",
                        }}
                      >
                        {mentor.status}
                      </span>
                    </td>
                    <td
                      style={{
                        color: textPrimary,
                        fontSize: "15px",
                        fontWeight: "700",
                        padding: "14px 0",
                        borderTop: rowBorder,
                      }}
                    >
                      {mentor.sessions}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <div style={{ display: "grid", gap: "18px" }}>
          <SectionCard>
            <div
              style={{
                color: textPrimary,
                fontSize: "20px",
                fontWeight: "800",
                marginBottom: "18px",
              }}
            >
              Mentor Distribution
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <div
                style={{
                  width: "180px",
                  height: "180px",
                  borderRadius: "50%",
                  margin: "0 auto",
                  background:
                    "conic-gradient(#F5A100 0% 33%, #7DB3D1 33% 66%, #B0D6EA 66% 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: isLight
                    ? "inset 0 0 30px rgba(15,23,42,0.10)"
                    : "inset 0 0 30px rgba(0,0,0,0.18)",
                }}
              >
                <div
                  style={{
                    width: "96px",
                    height: "96px",
                    borderRadius: "50%",
                    background: donutInnerBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: textPrimary,
                    fontSize: "20px",
                    fontWeight: "800",
                  }}
                >
                  {displayValue(stats.totalMentors)}
                </div>
              </div>

              <div style={{ display: "grid", gap: "12px" }}>
                {topFields.map((item, index) => (
                  <div
                    key={item.title}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      background: miniStatBackground,
                      border: miniStatBorder,
                      borderRadius: "16px",
                      padding: "12px 14px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <div
                        style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          background:
                            index === 0
                              ? "#F5A100"
                              : index === 1
                              ? "#7DB3D1"
                              : "#B0D6EA",
                        }}
                      />
                      <span
                        style={{
                          color: isLight
                            ? "rgba(15,23,42,0.72)"
                            : "rgba(249,250,251,0.72)",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        {item.title}
                      </span>
                    </div>

                    <span
                      style={{
                        color: textPrimary,
                        fontSize: "15px",
                        fontWeight: "800",
                      }}
                    >
                      {displayValue(item.count)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>

          <SectionCard>
            <div
              style={{
                color: textPrimary,
                fontSize: "20px",
                fontWeight: "800",
                marginBottom: "18px",
              }}
            >
              Quick Stats
            </div>

            <div style={{ display: "grid", gap: "12px" }}>
              {[
                ["Total Users", displayValue(stats.totalUsers)],
                ["Total Mentors", displayValue(stats.totalMentors)],
                ["Career Paths", displayValue(stats.totalCareerPaths)],
                ["Average Rating", displayValue(stats.averageMentorRating)],
              ].map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    background: miniStatBackground,
                    border: miniStatBorder,
                    borderRadius: "16px",
                    padding: "16px 18px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      color: isLight
                        ? "rgba(15,23,42,0.68)"
                        : "rgba(249,250,251,0.68)",
                      fontSize: "15px",
                      fontWeight: "600",
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      color: textPrimary,
                      fontSize: "20px",
                      fontWeight: "800",
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: "18px",
        }}
      >
        <SectionCard>
          <div
            style={{
              color: textPrimary,
              fontSize: "20px",
              fontWeight: "800",
              marginBottom: "18px",
            }}
          >
            Sessions Overview
          </div>

          <div
            style={{
              height: "240px",
              borderRadius: "22px",
              background: isLight
                ? "linear-gradient(180deg, rgba(255,255,255,0.74) 0%, rgba(248,250,252,0.88) 100%)"
                : "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)",
              border: innerCardBorder,
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                color: "#F5A100",
                fontSize: "48px",
                fontWeight: "800",
                lineHeight: 1,
                marginBottom: "12px",
              }}
            >
              {displayValue(stats.activeSessions)}
            </div>

            <div
              style={{
                color: textPrimary,
                fontSize: "18px",
                fontWeight: "700",
                marginBottom: "8px",
              }}
            >
              Total Mentor Sessions
            </div>

            <div
              style={{
                color: isLight
                  ? "rgba(15,23,42,0.58)"
                  : "rgba(249,250,251,0.58)",
                fontSize: "14px",
                maxWidth: "360px",
                lineHeight: 1.6,
              }}
            >
              This value is currently based on the total sessions stored for all mentors in the dashboard database.
            </div>
          </div>
        </SectionCard>

        <SectionCard>
          <div
            style={{
              color: textPrimary,
              fontSize: "20px",
              fontWeight: "800",
              marginBottom: "18px",
            }}
          >
            Growth Bars
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "end",
              justifyContent: "space-between",
              gap: "12px",
              height: "240px",
              padding: "14px 6px 0",
            }}
          >
            {topFields.map((item, i) => {
              const safeMax = Math.max(...topFields.map((field) => field.count), 1);
              const height = Math.max((item.count / safeMax) * 180, 30);

              return (
                <div key={item.title} style={{ flex: 1, textAlign: "center" }}>
                  <div
                    style={{
                      width: "100%",
                      height: `${height}px`,
                      borderRadius: "18px 18px 8px 8px",
                      background:
                        i % 2 === 0
                          ? "linear-gradient(180deg, #F5A100 0%, #C58000 100%)"
                          : "linear-gradient(180deg, #7DB3D1 0%, #355D75 100%)",
                      boxShadow: isLight
                        ? "0 10px 16px rgba(15,23,42,0.10)"
                        : "0 10px 16px rgba(0,0,0,0.12)",
                    }}
                  />
                  <div
                    style={{
                      marginTop: "10px",
                      color: textMuted,
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {item.title}
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>
      </div>
    </AdminLayout>
  );
}

export default Dashboard;