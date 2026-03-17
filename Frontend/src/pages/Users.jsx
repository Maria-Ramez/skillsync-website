import AdminLayout from "../layouts/AdminLayout";

function Users() {
  const users = [
    { name: "Mariam Ali", email: "mariam@mail.com", role: "Student", status: "Active" },
    { name: "Omar Hassan", email: "omar@mail.com", role: "Graduate", status: "Blocked" },
    { name: "Sara Ahmed", email: "sara@mail.com", role: "Student", status: "Active" },
    { name: "Youssef Tarek", email: "youssef@mail.com", role: "Graduate", status: "Active" },
  ];

  return (
    <AdminLayout>
      <div style={{ marginBottom: "22px" }}>
        <h1 style={{ color: "#F9FAFB", fontSize: "32px", fontWeight: "800", margin: 0 }}>
          User Management
        </h1>
        <p style={{ color: "rgba(249,250,251,0.6)", marginTop: "8px", fontSize: "15px" }}>
          View and manage all registered students and graduates.
        </p>
      </div>

      <div
        style={{
          background: "linear-gradient(180deg, rgba(20,53,70,0.95) 0%, rgba(16,38,50,0.98) 100%)",
          borderRadius: "28px",
          padding: "24px",
          border: "1px solid rgba(255,255,255,0.05)",
          boxShadow: "0 12px 26px rgba(0,0,0,0.15)",
        }}
      >
        <div style={{ display: "flex", gap: "14px", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search by name or email"
            style={{
              flex: 1,
              padding: "14px 16px",
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.07)",
              background: "rgba(255,255,255,0.03)",
              color: "#F9FAFB",
              fontSize: "15px",
              outline: "none",
            }}
          />
          <button
            style={{
              padding: "14px 22px",
              borderRadius: "14px",
              border: "none",
              background: "linear-gradient(180deg, #F5A100 0%, #D68C00 100%)",
              color: "#102632",
              fontWeight: "800",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left" }}>
              {["Name", "Email", "Role", "Status", "Actions"].map((item) => (
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
            {users.map((user) => (
              <tr key={user.email}>
                <td style={cellStyle}>{user.name}</td>
                <td style={cellStyle}>{user.email}</td>
                <td style={cellStyle}>{user.role}</td>
                <td style={cellStyle}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "6px 14px",
                      borderRadius: "999px",
                      background:
                        user.status === "Active"
                          ? "rgba(245,161,0,0.16)"
                          : "rgba(255,255,255,0.08)",
                      color: "#F9FAFB",
                      fontSize: "13px",
                      fontWeight: "700",
                    }}
                  >
                    {user.status}
                  </span>
                </td>
                <td style={cellStyle}>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button style={smallBtn}>Block</button>
                    <button style={smallBtn}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

const cellStyle = {
  color: "#F9FAFB",
  fontSize: "15px",
  padding: "16px 0",
  borderTop: "1px solid rgba(255,255,255,0.05)",
};

const smallBtn = {
  padding: "8px 14px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.04)",
  color: "#F9FAFB",
  cursor: "pointer",
  fontWeight: "600",
};

export default Users;