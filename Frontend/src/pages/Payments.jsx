import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";

function Payments() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [providerFilter, setProviderFilter] = useState("All");
  const [entityFilter, setEntityFilter] = useState("All");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [themeMode, setThemeMode] = useState("Dark");

  useEffect(() => {
    const loadTheme = () => {
      const saved = localStorage.getItem("adminSettings");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setThemeMode(parsed.themeMode || "Dark");
        } catch {}
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

  const textPrimary = isLight ? "#0f172a" : "#F9FAFB";
  const textSecondary = isLight ? "#64748b" : "rgba(249,250,251,0.6)";
  const cardBg = isLight
    ? "#ffffff"
    : "linear-gradient(180deg, rgba(20,53,70,0.95) 0%, rgba(16,38,50,0.98) 100%)";
  const borderColor = isLight
    ? "1px solid rgba(15,23,42,0.08)"
    : "1px solid rgba(255,255,255,0.05)";
  const cardShadow = isLight
    ? "0 10px 24px rgba(15,23,42,0.08)"
    : "0 12px 26px rgba(0,0,0,0.15)";

  const transactions = [
    {
      id: "TXN001",
      user: "Ahmed Samir",
      amount: 120,
      currency: "EGP",
      type: "deposit",
      provider: "fawry",
      status: "completed",
      entityType: "wallet_topup",
      providerStatus: "TOPUP_APPLIED",
      reference: "FWR-2026-001",
      date: "2026-04-15",
    },
    {
      id: "TXN002",
      user: "Nour Emad",
      amount: 90,
      currency: "EGP",
      type: "hold",
      provider: "internal",
      status: "pending",
      entityType: "mentor_session",
      providerStatus: "PENDING",
      reference: "INT-2026-002",
      date: "2026-04-16",
    },
    {
      id: "TXN003",
      user: "Mona Adel",
      amount: 150,
      currency: "EGP",
      type: "refund",
      provider: "fawry",
      status: "failed",
      entityType: "group_event",
      providerStatus: "FAILED",
      reference: "FWR-2026-003",
      date: "2026-04-14",
    },
  ];

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesStatus = statusFilter === "All" || tx.status === statusFilter;
      const matchesProvider =
        providerFilter === "All" || tx.provider === providerFilter;
      const matchesEntity =
        entityFilter === "All" || tx.entityType === entityFilter;

      return matchesStatus && matchesProvider && matchesEntity;
    });
  }, [statusFilter, providerFilter, entityFilter]);

  const statusOptions = [
    { label: "All", value: "All" },
    { label: "Pending", value: "pending" },
    { label: "Completed", value: "completed" },
    { label: "Failed", value: "failed" },
  ];

  const providerOptions = [
    { label: "All", value: "All" },
    { label: "Internal", value: "internal" },
    { label: "Fawry", value: "fawry" },
  ];

  const entityOptions = [
    { label: "All", value: "All" },
    { label: "Wallet Topup", value: "wallet_topup" },
    { label: "Mentor Session", value: "mentor_session" },
    { label: "Group Event", value: "group_event" },
    { label: "Other", value: "other" },
  ];

  const title = {
    color: textPrimary,
    fontSize: "32px",
    fontWeight: "800",
    margin: 0,
  };

  const subtitle = {
    color: textSecondary,
    marginTop: "8px",
    fontSize: "15px",
  };

  const statCard = {
    background: cardBg,
    borderRadius: "24px",
    padding: "22px",
    border: borderColor,
    boxShadow: cardShadow,
  };

  const statLabel = {
    color: isLight ? "#64748b" : "rgba(249,250,251,0.62)",
    fontSize: "15px",
    marginBottom: "12px",
  };

  const statValue = {
    color: textPrimary,
    fontSize: "34px",
    fontWeight: "800",
  };

  const tableCard = {
    background: cardBg,
    borderRadius: "28px",
    padding: "24px",
    border: borderColor,
    boxShadow: cardShadow,
    overflowX: "auto",
  };

  const filterLabel = {
    color: isLight ? "#475569" : "rgba(249,250,251,0.68)",
    fontSize: "13px",
    fontWeight: "600",
  };

  const customSelectButton = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "16px",
    border: isLight
      ? "1px solid rgba(15,23,42,0.12)"
      : "1px solid rgba(255,255,255,0.08)",
    background: isLight ? "#f8fafc" : "rgba(255,255,255,0.04)",
    color: textPrimary,
    fontSize: "15px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    boxShadow: isLight
      ? "0 8px 20px rgba(15,23,42,0.06)"
      : "0 8px 20px rgba(0,0,0,0.12)",
  };

  const arrowStyle = {
    color: isLight ? "#64748b" : "rgba(249,250,251,0.72)",
    fontSize: "14px",
  };

  const customDropdownMenu = {
    position: "absolute",
    top: "calc(100% + 8px)",
    left: 0,
    right: 0,
    background: isLight
      ? "#ffffff"
      : "linear-gradient(180deg, rgba(20,53,70,0.98) 0%, rgba(16,38,50,1) 100%)",
    border: isLight
      ? "1px solid rgba(15,23,42,0.1)"
      : "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    padding: "8px",
    boxShadow: isLight
      ? "0 18px 36px rgba(15,23,42,0.12)"
      : "0 18px 36px rgba(0,0,0,0.22)",
    zIndex: 100,
    display: "grid",
    gap: "6px",
  };

  const dropdownItemStyle = {
    width: "100%",
    textAlign: "left",
    padding: "12px 14px",
    borderRadius: "12px",
    border: "none",
    background: "transparent",
    color: textPrimary,
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  };

  const activeDropdownItemStyle = {
    background: "rgba(245,161,0,0.14)",
    color: "#F5A100",
  };

  const thStyle = {
    textAlign: "left",
    color: isLight ? "#64748b" : "rgba(249,250,251,0.52)",
    fontSize: "13px",
    fontWeight: "600",
    paddingBottom: "14px",
    whiteSpace: "nowrap",
  };

  const cellStyle = {
    color: textPrimary,
    fontSize: "15px",
    padding: "16px 12px 16px 0",
    borderTop: borderColor,
    whiteSpace: "nowrap",
  };

  const emptyStateStyle = {
    color: textSecondary,
    fontSize: "15px",
    padding: "20px 0",
    borderTop: borderColor,
    textAlign: "center",
  };

  const getStatusStyle = (status) => {
    if (status === "completed") {
      return {
        display: "inline-block",
        padding: "6px 14px",
        borderRadius: "999px",
        background: "rgba(34,197,94,0.16)",
        color: isLight ? "#15803d" : "#F9FAFB",
        fontSize: "13px",
        fontWeight: "700",
      };
    }

    if (status === "pending") {
      return {
        display: "inline-block",
        padding: "6px 14px",
        borderRadius: "999px",
        background: "rgba(245,161,0,0.16)",
        color: isLight ? "#9a6700" : "#F9FAFB",
        fontSize: "13px",
        fontWeight: "700",
      };
    }

    return {
      display: "inline-block",
      padding: "6px 14px",
      borderRadius: "999px",
      background: "rgba(239,68,68,0.16)",
      color: isLight ? "#b91c1c" : "#F9FAFB",
      fontSize: "13px",
      fontWeight: "700",
    };
  };

  return (
    <AdminLayout>
      <div style={{ marginBottom: "22px" }}>
        <h1 style={title}>Payments & Transactions</h1>
        <p style={subtitle}>
          Monitor transactions, wallet activity, providers, and payment status.
        </p>
      </div>

      <div style={statsGrid}>
        <div style={statCard}>
          <div style={statLabel}>Total Transaction Volume</div>
          <div style={statValue}>4,320 EGP</div>
        </div>

        <div style={statCard}>
          <div style={statLabel}>Wallet Top-Ups</div>
          <div style={statValue}>1,850 EGP</div>
        </div>

        <div style={statCard}>
          <div style={statLabel}>Pending Transactions</div>
          <div style={statValue}>540 EGP</div>
        </div>
      </div>

      <div style={tableCard}>
        <div style={filterBar}>
          <FilterDropdown
            label="Status"
            options={statusOptions}
            value={statusFilter}
            type="status"
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            onChange={setStatusFilter}
            filterLabel={filterLabel}
            customSelectButton={customSelectButton}
            arrowStyle={arrowStyle}
            customDropdownMenu={customDropdownMenu}
            dropdownItemStyle={dropdownItemStyle}
            activeDropdownItemStyle={activeDropdownItemStyle}
          />

          <FilterDropdown
            label="Provider"
            options={providerOptions}
            value={providerFilter}
            type="provider"
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            onChange={setProviderFilter}
            filterLabel={filterLabel}
            customSelectButton={customSelectButton}
            arrowStyle={arrowStyle}
            customDropdownMenu={customDropdownMenu}
            dropdownItemStyle={dropdownItemStyle}
            activeDropdownItemStyle={activeDropdownItemStyle}
          />

          <FilterDropdown
            label="Entity Type"
            options={entityOptions}
            value={entityFilter}
            type="entity"
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            onChange={setEntityFilter}
            filterLabel={filterLabel}
            customSelectButton={customSelectButton}
            arrowStyle={arrowStyle}
            customDropdownMenu={customDropdownMenu}
            dropdownItemStyle={dropdownItemStyle}
            activeDropdownItemStyle={activeDropdownItemStyle}
          />
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {[
                "Transaction ID",
                "User",
                "Amount",
                "Type",
                "Provider",
                "Entity",
                "Status",
                "Provider Status",
                "Reference",
                "Date",
              ].map((item) => (
                <th key={item} style={thStyle}>
                  {item}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx) => (
                <tr key={tx.id}>
                  <td style={cellStyle}>{tx.id}</td>
                  <td style={cellStyle}>{tx.user}</td>
                  <td style={cellStyle}>
                    {tx.amount} {tx.currency}
                  </td>
                  <td style={cellStyle}>{formatLabel(tx.type)}</td>
                  <td style={cellStyle}>{formatLabel(tx.provider)}</td>
                  <td style={cellStyle}>{formatLabel(tx.entityType)}</td>
                  <td style={cellStyle}>
                    <span style={getStatusStyle(tx.status)}>
                      {formatLabel(tx.status)}
                    </span>
                  </td>
                  <td style={cellStyle}>{formatLabel(tx.providerStatus)}</td>
                  <td style={cellStyle}>{tx.reference}</td>
                  <td style={cellStyle}>{tx.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" style={emptyStateStyle}>
                  No transactions match the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

function FilterDropdown({
  label,
  options,
  value,
  type,
  openDropdown,
  setOpenDropdown,
  onChange,
  filterLabel,
  customSelectButton,
  arrowStyle,
  customDropdownMenu,
  dropdownItemStyle,
  activeDropdownItemStyle,
}) {
  return (
    <div style={filterGroup}>
      <label style={filterLabel}>{label}</label>
      <div style={{ position: "relative" }}>
        <button
          onClick={() =>
            setOpenDropdown((prev) => (prev === type ? null : type))
          }
          style={customSelectButton}
        >
          <span>{getSelectedLabel(options, value)}</span>
          <span style={arrowStyle}>{openDropdown === type ? "▴" : "▾"}</span>
        </button>

        {openDropdown === type && (
          <div style={customDropdownMenu}>
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setOpenDropdown(null);
                }}
                style={{
                  ...dropdownItemStyle,
                  ...(value === option.value ? activeDropdownItemStyle : {}),
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function getSelectedLabel(options, value) {
  const match = options.find((option) => option.value === value);
  return match ? match.label : "All";
}

function formatLabel(value) {
  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "18px",
  marginBottom: "18px",
};

const filterBar = {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "16px",
  marginBottom: "22px",
};

const filterGroup = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

export default Payments;