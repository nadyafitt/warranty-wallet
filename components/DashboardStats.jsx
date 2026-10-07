const stats = [
  {
    label: "Active",
    description: "Currently protected",
    icon: "✓",
    color: "emerald",
  },
  {
    label: "Expiring Soon",
    description: "Within 30 days",
    icon: "!",
    color: "amber",
  },
  {
    label: "Expired",
    description: "Needs attention",
    icon: "×",
    color: "rose",
  },
];

const colorClasses = {
  emerald: {
    icon: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
    number: "text-emerald-400",
    glow: "hover:border-emerald-500/20",
  },
  amber: {
    icon: "bg-amber-500/10 text-amber-400 ring-amber-500/20",
    number: "text-amber-400",
    glow: "hover:border-amber-500/20",
  },
  rose: {
    icon: "bg-rose-500/10 text-rose-400 ring-rose-500/20",
    number: "text-rose-400",
    glow: "hover:border-rose-500/20",
  },
};

export default function DashboardStats({
  active = 0,
  expiringSoon = 0,
  expired = 0,
}) {
  const values = [active, expiringSoon, expired];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat, index) => {
        const colors = colorClasses[stat.color];

        return (
          <div
            key={stat.label}
            className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.025] p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.04] ${colors.glow}`}
          >
            {/* Decorative glow */}
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/[0.02] blur-2xl" />

            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">
                  {stat.label}
                </p>

                <p
                  className={`mt-3 text-4xl font-bold tracking-tight ${colors.number}`}
                >
                  {values[index]}
                </p>

                <p className="mt-2 text-xs text-slate-600">
                  {stat.description}
                </p>
              </div>

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ring-1 ${colors.icon}`}
              >
                <span className="text-lg font-bold">
                  {stat.icon}
                </span>
              </div>
            </div>

            {/* Bottom line */}
            <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        );
      })}
    </div>
  );
}