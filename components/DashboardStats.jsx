export default function DashboardStats({
  active = 0,
  expiringSoon = 0,
  expired = 0,
}) {
  const stats = [
    {
      label: "Active",
      value: active,
      description: "Warranties currently active",
      icon: "✓",
      className: "ww-dashboard-stat-active",
    },
    {
      label: "Expiring Soon",
      value: expiringSoon,
      description: "Expiring within 30 days",
      icon: "!",
      className: "ww-dashboard-stat-warning",
    },
    {
      label: "Expired",
      value: expired,
      description: "Warranties that have expired",
      icon: "×",
      className: "ww-dashboard-stat-expired",
    },
  ];

  return (
    <div className="ww-dashboard-stats">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`ww-dashboard-stat ${stat.className}`}
        >
          <div className="ww-dashboard-stat-top">
            <div className="ww-dashboard-stat-icon">
              {stat.icon}
            </div>

            <span className="ww-dashboard-stat-label">
              {stat.label}
            </span>
          </div>

          <p className="ww-dashboard-stat-value">
            {stat.value}
          </p>

          <p className="ww-dashboard-stat-description">
            {stat.description}
          </p>
        </div>
      ))}
    </div>
  );
}