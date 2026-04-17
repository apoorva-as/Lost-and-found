function StatCard({ label, value, tone = "blue" }) {
  const tones = {
    blue: "from-brand-500 to-brand-700",
    green: "from-accent-500 to-emerald-700",
    dark: "from-slate-800 to-slate-950"
  };

  return (
    <div className={`rounded-3xl bg-gradient-to-br ${tones[tone]} p-[1px] shadow-lg`}>
      <div className="h-full rounded-[calc(1.5rem-1px)] bg-slate-950/90 px-4 py-4 sm:px-5 sm:py-5 text-white">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-300">{label}</p>
        <p className="mt-3 text-2xl sm:text-3xl font-bold">{value}</p>
      </div>
    </div>
  );
}

export default StatCard;
