import { useState } from "react";

const toneColors = {
  default: "#6366f1",
  warning: "#f59e0b",
  info: "#3b82f6",
  success: "#10b981",
  danger: "#ef4444",
};

export default function KpiCard({ title, value, subtitle, icon, tone = "default", loading = false, onClick }) {
  const [hover, setHover] = useState(false);
  const clickable = Boolean(onClick);

  const styles = {
    card: {
      background: "#fff",
      border: "1px solid #e5e7eb",
      borderLeft: `4px solid ${toneColors[tone] || toneColors.default}`,
      borderRadius: 10,
      padding: 16,
      boxShadow: hover && clickable ? "0 4px 12px rgba(0,0,0,0.08)" : "0 1px 2px rgba(0,0,0,0.04)",
      transform: hover && clickable ? "translateY(-2px)" : "none",
      transition: "transform 0.1s, box-shadow 0.1s",
      cursor: clickable ? "pointer" : "default",
    },
    header: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    title: { fontSize: 13, color: "#6b7280" },
    icon: { fontSize: 20 },
    value: { fontSize: 28, fontWeight: 700, marginTop: 8, color: "#111827", minHeight: 34 },
    skeleton: { width: 60, height: 28, borderRadius: 6, background: "#e5e7eb", marginTop: 8 },
    subtitle: { fontSize: 12, color: "#9ca3af", marginTop: 4 },
  };

  return (
    <div
      style={styles.card}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
    >
      <div style={styles.header}>
        <span style={styles.title}>{title}</span>
        {icon && <span style={styles.icon}>{icon}</span>}
      </div>
      {loading ? (
        <div style={styles.skeleton} />
      ) : (
        <div style={styles.value}>{value ?? "—"}</div>
      )}
      {subtitle && <div style={styles.subtitle}>{subtitle}</div>}
    </div>
  );
}