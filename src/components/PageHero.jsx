function PageHero({ badge, title, description, actions }) {
  return (
    <section className="glass-panel relative overflow-hidden rounded-2xl border border-white/70 px-4 py-6 shadow-xl sm:rounded-[2rem] sm:px-6 sm:py-8 md:px-10 md:py-10">
      <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-brand-200/40 blur-3xl sm:h-40 sm:w-40" />
      <div className="relative max-w-3xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-700 sm:mb-4 sm:tracking-[0.34em]">
          {badge}
        </p>
        <h2 className="text-balance text-2xl font-bold tracking-tight text-ink sm:text-3xl md:text-4xl lg:text-5xl">
          {title}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:mt-4 sm:text-base md:text-lg">
          {description}
        </p>
        {actions ? <div className="mt-4 flex flex-wrap gap-2 sm:mt-6 sm:gap-3">{actions}</div> : null}
      </div>
    </section>
  );
}

export default PageHero;
