import AdminLayout from "../layouts/AdminLayout";

function Settings() {
  return (
    <AdminLayout>
      <div style={{ marginBottom: "22px" }}>
        <h1 style={{ color: "#F9FAFB", fontSize: "32px", fontWeight: "800", margin: 0 }}>
          Settings & Security
        </h1>
        <p style={{ color: "rgba(249,250,251,0.6)", marginTop: "8px", fontSize: "15px" }}>
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
        <div style={cardStyle}>
          <h3 style={titleStyle}>Platform Settings</h3>

          <div style={{ display: "grid", gap: "14px" }}>
            <div style={rowStyle}>
              <span>Enable Notifications</span>
              <span style={toggleStyle}>ON</span>
            </div>
            <div style={rowStyle}>
              <span>Payment Gateway</span>
              <span style={toggleStyle}>Configured</span>
            </div>
            <div style={rowStyle}>
              <span>Mentor Verification</span>
              <span style={toggleStyle}>Active</span>
            </div>
          </div>
        </div>

        <div style={cardStyle}>
          <h3 style={titleStyle}>Security Logs</h3>

          <div style={{ display: "grid", gap: "12px" }}>
            {[
              "Admin login from new device",
              "Mentor account approved",
              "User account blocked",
              "Settings updated successfully",
            ].map((log) => (
              <div key={log} style={logStyle}>
                {log}
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

const rowStyle = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.05)",
  borderRadius: "18px",
  padding: "16px 18px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "#F9FAFB",
};

const toggleStyle = {
  padding: "6px 14px",
  borderRadius: "999px",
  background: "rgba(245,161,0,0.16)",
  color: "#F9FAFB",
  fontSize: "13px",
  fontWeight: "700",
};

const logStyle = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.05)",
  borderRadius: "18px",
  padding: "16px 18px",
  color: "rgba(249,250,251,0.8)",
};

export default Settings;