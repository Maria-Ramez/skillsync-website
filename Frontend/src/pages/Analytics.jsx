import AdminLayout from "../layouts/AdminLayout";

function Analytics() {
  const bars = [90, 140, 110, 170, 150, 190];

  return (
    <AdminLayout>
      <div style={{ marginBottom: "22px" }}>
        <h1 style={{ color: "#F9FAFB", fontSize: "32px", fontWeight: "800", margin: 0 }}>
          Analytics & Reports
        </h1>
        <p style={{ color: "rgba(249,250,251,0.6)", marginTop: "8px", fontSize: "15px" }}>
          Monitor growth, usage, and platform engagement.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: "18px",
        }}
      >
        <div style={cardStyle}>
          <h3 style={titleStyle}>User Growth</h3>
          <div
            style={{
              display: "flex",
              alignItems: "end",
              gap: "12px",
              height: "260px",
              paddingTop: "10px",
            }}
          >
            {bars.map((height, i) => (
              <div key={i} style={{ flex: 1, textAlign: "center" }}>
                <div
                  style={{
                    height: `${height}px`,
                    borderRadius: "18px 18px 8px 8px",
                    background:
                      i % 2 === 0
                        ? "linear-gradient(180deg, #F5A100 0%, #C58000 100%)"
                        : "linear-gradient(180deg, #7DB3D1 0%, #355D75 100%)",
                  }}
                />
                <div style={{ marginTop: "10px", color: "rgba(249,250,251,0.55)", fontSize: "12px" }}>
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i]}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={cardStyle}>
          <h3 style={titleStyle}>Top Metrics</h3>
          <div style={{ display: "grid", gap: "12px" }}>
            {[
              ["Most Selected Career", "AI / ML"],
              ["Most Used Skill", "React"],
              ["Highest Mentor Rating", "4.9"],
              ["Engagement Rate", "87%"],
            ].map(([label, value]) => (
              <div key={label} style={miniCard}>
                <span style={{ color: "rgba(249,250,251,0.68)", fontSize: "15px" }}>{label}</span>
                <span style={{ color: "#F5A100", fontSize: "18px", fontWeight: "800" }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

const cardStyle = {
  background: "linear-gradient(180deg, rgba(20,53,70,0.95) 0%, rgba(16,38,50,0.98) 100%)",
  borderRadius: "28px",
  padding: "24px",
  border: "1px solid rgba(255,255,255,0.05)",
  boxShadow: "0 12px 26px rgba(0,0,0,0.15)",
};

const titleStyle = {
  color: "#F9FAFB",
  fontSize: "22px",
  fontWeight: "800",
  marginBottom: "18px",
};

const miniCard = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.05)",
  borderRadius: "18px",
  padding: "16px 18px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export default Analytics;