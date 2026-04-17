function EmptyState({ title, description }) {
  return (
    <div className="glass-panel rounded-3xl border border-white/60 px-4 py-8 sm:px-6 sm:py-12 text-center shadow-xl">
      <div className="mx-auto mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-slate-900 text-xl sm:text-2xl text-white">
        ?
      </div>
      <h3 className="text-lg sm:text-xl font-semibold text-ink">{title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm text-slate-600">{description}</p>
    </div>
  );
}

export default EmptyState;
