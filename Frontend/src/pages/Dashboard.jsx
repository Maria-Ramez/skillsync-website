import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import DashboardCard from "../components/DashboardCard";

function SectionCard({ children, style = {} }) {
  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, rgba(20,53,70,0.95) 0%, rgba(16,38,50,0.98) 100%)",
        borderRadius: "28px",
        padding: "24px",
        border: "1px solid rgba(255,255,255,0.05)",
        boxShadow: "0 12px 26px rgba(0,0,0,0.15)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalMentors: 0,
    totalCareerPaths: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);

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
        });
      } catch (error) {
        console.error("Failed to load dashboard stats:", error.message);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const displayValue = (value) => (loadingStats ? "..." : value);

  return (
    <AdminLayout>
      <div style={{ marginBottom: "22px" }}>
        <h1
          style={{
            fontSize: "34px",
            fontWeight: "800",
            color: "#F9FAFB",
            margin: 0,
          }}
        >
          Home Overview
        </h1>
        <p
          style={{
            marginTop: "8px",
            color: "rgba(249,250,251,0.6)",
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
          value="24"
          subtitle="Live or scheduled"
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
                  color: "#F9FAFB",
                  marginBottom: "6px",
                }}
              >
                Main Sectors
              </h3>
              <p
                style={{
                  color: "rgba(249,250,251,0.58)",
                  fontSize: "14px",
                }}
              >
                Top areas currently selected by users.
              </p>
            </div>

            <div style={{ color: "rgba(249,250,251,0.3)", fontSize: "24px" }}>
              • •
            </div>
          </div>

          <div style={{ display: "grid", gap: "14px", marginBottom: "18px" }}>
            {[
              ["Web Development", "548", "enrolled users"],
              ["Data Analysis", "620", "enrolled users"],
              ["AI / ML", "850", "enrolled users"],
            ].map(([title, value, subtitle]) => (
              <div
                key={title}
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
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
                      color: "#F9FAFB",
                      fontSize: "18px",
                      fontWeight: "700",
                      marginBottom: "4px",
                    }}
                  >
                    {title}
                  </div>
                  <div
                    style={{
                      color: "rgba(249,250,251,0.5)",
                      fontSize: "13px",
                    }}
                  >
                    {title}
                  </div>
                </div>

                <div
                  style={{
                    color: "#F9FAFB",
                    fontSize: "22px",
                    fontWeight: "800",
                    textAlign: "center",
                  }}
                >
                  {value}
                </div>

                <div
                  style={{
                    color: "rgba(249,250,251,0.62)",
                    fontSize: "14px",
                    textAlign: "right",
                  }}
                >
                  {subtitle}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: "22px",
              padding: "20px",
            }}
          >
            <div
              style={{
                color: "#F9FAFB",
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
                  {["Name", "Area", "Status", "Progress"].map((item) => (
                    <th
                      key={item}
                      style={{
                        color: "rgba(249,250,251,0.52)",
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
                {[
                  ["John Doe", "Web Development", "Active", "75%"],
                  ["Mariam Ali", "Data Analysis", "Active", "58%"],
                  ["Omar Ahmed", "AI / ML", "Pending", "41%"],
                ].map(([name, area, status, progress]) => (
                  <tr key={name}>
                    <td
                      style={{
                        color: "#F9FAFB",
                        fontSize: "15px",
                        padding: "14px 0",
                        borderTop: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      {name}
                    </td>
                    <td
                      style={{
                        color: "rgba(249,250,251,0.75)",
                        fontSize: "15px",
                        padding: "14px 0",
                        borderTop: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      {area}
                    </td>
                    <td
                      style={{
                        padding: "14px 0",
                        borderTop: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          padding: "6px 14px",
                          borderRadius: "999px",
                          background:
                            status === "Active"
                              ? "rgba(245,161,0,0.16)"
                              : "rgba(255,255,255,0.08)",
                          color: "#F9FAFB",
                          fontSize: "13px",
                          fontWeight: "700",
                        }}
                      >
                        {status}
                      </span>
                    </td>
                    <td
                      style={{
                        color: "#F9FAFB",
                        fontSize: "15px",
                        fontWeight: "700",
                        padding: "14px 0",
                        borderTop: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      {progress}
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
                color: "#F9FAFB",
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
                    "conic-gradient(#F5A100 0% 28%, #7DB3D1 28% 58%, #B0D6EA 58% 78%, #284d63 78% 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "inset 0 0 30px rgba(0,0,0,0.18)",
                }}
              >
                <div
                  style={{
                    width: "96px",
                    height: "96px",
                    borderRadius: "50%",
                    background: "#143546",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#F9FAFB",
                    fontSize: "20px",
                    fontWeight: "800",
                  }}
                >
                  {displayValue(stats.totalMentors)}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "end",
                  justifyContent: "center",
                  gap: "10px",
                  height: "150px",
                }}
              >
                {[48, 82, 62, 96, 118, 80].map((height, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div
                      style={{
                        width: "12px",
                        height: `${height}px`,
                        borderRadius: "999px",
                        background: i % 2 === 0 ? "#F5A100" : "#7DB3D1",
                        marginBottom: "10px",
                      }}
                    />
                    <div
                      style={{
                        color: "rgba(249,250,251,0.55)",
                        fontSize: "11px",
                      }}
                    >
                      {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>

          <SectionCard>
            <div
              style={{
                color: "#F9FAFB",
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
                ["Feedback Rate", "92%"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: "16px",
                    padding: "16px 18px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      color: "rgba(249,250,251,0.68)",
                      fontSize: "15px",
                      fontWeight: "600",
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      color: "#F9FAFB",
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
              color: "#F9FAFB",
              fontSize: "20px",
              fontWeight: "800",
              marginBottom: "18px",
            }}
          >
            Sessions Trend
          </div>

          <div
            style={{
              height: "240px",
              borderRadius: "22px",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)",
              border: "1px solid rgba(255,255,255,0.05)",
              padding: "16px",
              overflow: "hidden",
            }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 700 240"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="lineGlow1" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#F5A100" />
                  <stop offset="100%" stopColor="#FFE3A6" />
                </linearGradient>
                <linearGradient id="lineGlow2" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8FC5E0" />
                  <stop offset="100%" stopColor="#F9FAFB" />
                </linearGradient>
              </defs>

              <path
                d="M 0 190 C 80 150, 120 95, 190 120 S 320 210, 390 135 S 540 65, 700 115"
                fill="none"
                stroke="url(#lineGlow1)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M 0 165 C 90 175, 145 110, 210 130 S 350 185, 420 150 S 560 80, 700 95"
                fill="none"
                stroke="url(#lineGlow2)"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.85"
              />

              <circle cx="390" cy="135" r="7" fill="#F5A100" />
              <circle cx="700" cy="115" r="7" fill="#F9FAFB" />

              <text x="10" y="228" fill="rgba(249,250,251,0.55)" fontSize="12">Jan</text>
              <text x="120" y="228" fill="rgba(249,250,251,0.55)" fontSize="12">Feb</text>
              <text x="235" y="228" fill="rgba(249,250,251,0.55)" fontSize="12">Mar</text>
              <text x="350" y="228" fill="rgba(249,250,251,0.55)" fontSize="12">Apr</text>
              <text x="470" y="228" fill="rgba(249,250,251,0.55)" fontSize="12">May</text>
              <text x="590" y="228" fill="rgba(249,250,251,0.55)" fontSize="12">Jun</text>
            </svg>
          </div>
        </SectionCard>

        <SectionCard>
          <div
            style={{
              color: "#F9FAFB",
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
            {[95, 140, 112, 165, 185, 150].map((height, i) => (
              <div key={i} style={{ flex: 1, textAlign: "center" }}>
                <div
                  style={{
                    width: "100%",
                    height: `${height}px`,
                    borderRadius: "18px 18px 8px 8px",
                    background:
                      i % 2 === 0
                        ? "linear-gradient(180deg, #F5A100 0%, #C58000 100%)"
                        : "linear-gradient(180deg, #7DB3D1 0%, #355D75 100%)",
                    boxShadow: "0 10px 16px rgba(0,0,0,0.12)",
                  }}
                />
                <div
                  style={{
                    marginTop: "10px",
                    color: "rgba(249,250,251,0.55)",
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i]}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </AdminLayout>
  );
}

export default Dashboard;