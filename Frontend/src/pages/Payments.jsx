import AdminLayout from "../layouts/AdminLayout";

function Payments() {
  const payments = [
    { mentor: "Ahmed Samir", amount: "$120", commission: "$18", status: "Paid" },
    { mentor: "Nour Emad", amount: "$90", commission: "$13", status: "Pending" },
    { mentor: "Mona Adel", amount: "$150", commission: "$22", status: "Paid" },
  ];

  return (
    <AdminLayout>
      <div style={{ marginBottom: "22px" }}>
        <h1 style={{ color: "#F9FAFB", fontSize: "32px", fontWeight: "800", margin: 0 }}>
          Payments & Transactions
        </h1>
        <p style={{ color: "rgba(249,250,251,0.6)", marginTop: "8px", fontSize: "15px" }}>
          Track mentor payments, commissions, and transaction status.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "18px",
          marginBottom: "18px",
        }}
      >
        <div style={statCard}>
          <div style={statLabel}>Total Revenue</div>
          <div style={statValue}>$12,450</div>
        </div>
        <div style={statCard}>
          <div style={statLabel}>Platform Commission</div>
          <div style={statValue}>$2,140</div>
        </div>
        <div style={statCard}>
          <div style={statLabel}>Pending Payouts</div>
          <div style={statValue}>$540</div>
        </div>
      </div>

      <div style={tableCard}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left" }}>
              {["Mentor", "Amount", "Commission", "Status"].map((item) => (
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
            {payments.map((payment) => (
              <tr key={payment.mentor}>
                <td style={cellStyle}>{payment.mentor}</td>
                <td style={cellStyle}>{payment.amount}</td>
                <td style={cellStyle}>{payment.commission}</td>
                <td style={cellStyle}>
                  <span style={badgeStyle}>{payment.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

const statCard = {
  background: "linear-gradient(180deg, rgba(20,53,70,0.95) 0%, rgba(16,38,50,0.98) 100%)",
  borderRadius: "24px",
  padding: "22px",
  border: "1px solid rgba(255,255,255,0.05)",
  boxShadow: "0 12px 26px rgba(0,0,0,0.15)",
};

const statLabel = {
  color: "rgba(249,250,251,0.62)",
  fontSize: "15px",
  marginBottom: "12px",
};

const statValue = {
  color: "#F9FAFB",
  fontSize: "34px",
  fontWeight: "800",
};

const tableCard = {
  background: "linear-gradient(180deg, rgba(20,53,70,0.95) 0%, rgba(16,38,50,0.98) 100%)",
  borderRadius: "28px",
  padding: "24px",
  border: "1px solid rgba(255,255,255,0.05)",
  boxShadow: "0 12px 26px rgba(0,0,0,0.15)",
};

const cellStyle = {
  color: "#F9FAFB",
  fontSize: "15px",
  padding: "16px 0",
  borderTop: "1px solid rgba(255,255,255,0.05)",
};

const badgeStyle = {
  display: "inline-block",
  padding: "6px 14px",
  borderRadius: "999px",
  background: "rgba(245,161,0,0.16)",
  color: "#F9FAFB",
  fontSize: "13px",
  fontWeight: "700",
};

export default Payments;