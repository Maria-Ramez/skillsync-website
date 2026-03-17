import AdminLayout from "../layouts/AdminLayout";

function ChatFeedback() {
  const reports = [
    { session: "Session #101", issue: "Late mentor response", status: "Open" },
    { session: "Session #102", issue: "Inappropriate behavior", status: "Under Review" },
    { session: "Session #103", issue: "Technical issue", status: "Resolved" },
  ];

  return (
    <AdminLayout>
      <div style={{ marginBottom: "22px" }}>
        <h1 style={{ color: "#F9FAFB", fontSize: "32px", fontWeight: "800", margin: 0 }}>
          Chat & Feedback
        </h1>
        <p style={{ color: "rgba(249,250,251,0.6)", marginTop: "8px", fontSize: "15px" }}>
          Review reports, complaints, and session feedback.
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
          <h3 style={titleStyle}>Feedback Summary</h3>
          <div style={{ display: "grid", gap: "14px" }}>
            <div style={miniCard}>
              <span style={labelStyle}>Mentor Rating</span>
              <span style={valueStyle}>4.8 / 5</span>
            </div>
            <div style={miniCard}>
              <span style={labelStyle}>Application Rating</span>
              <span style={valueStyle}>4.6 / 5</span>
            </div>
            <div style={miniCard}>
              <span style={labelStyle}>Chat Experience</span>
              <span style={valueStyle}>4.7 / 5</span>
            </div>
          </div>
        </div>

        <div style={cardStyle}>
          <h3 style={titleStyle}>Reported Sessions</h3>
          <div style={{ display: "grid", gap: "12px" }}>
            {reports.map((report) => (
              <div key={report.session} style={miniCard}>
                <div>
                  <div style={{ color: "#F9FAFB", fontWeight: "700", marginBottom: "4px" }}>
                    {report.session}
                  </div>
                  <div style={{ color: "rgba(249,250,251,0.62)", fontSize: "14px" }}>
                    {report.issue}
                  </div>
                </div>
                <span style={statusBadge}>{report.status}</span>
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

const labelStyle = {
  color: "rgba(249,250,251,0.68)",
  fontSize: "15px",
};

const valueStyle = {
  color: "#F5A100",
  fontSize: "18px",
  fontWeight: "800",
};

const statusBadge = {
  display: "inline-block",
  padding: "6px 14px",
  borderRadius: "999px",
  background: "rgba(245,161,0,0.16)",
  color: "#F9FAFB",
  fontSize: "13px",
  fontWeight: "700",
};

export default ChatFeedback;