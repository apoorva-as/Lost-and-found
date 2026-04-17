import PageHero from "../components/PageHero";

function About() {
  return (
    <div className="space-y-8">
      <PageHero
        badge="About Project"
        title="AI-Powered Lost & Found System for faster campus item recovery."
        description="This product-style demo helps teams log found items, search quickly, and support smart claim workflows through an intuitive interface."
      />

      <section className="grid gap-4 lg:gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="glass-panel rounded-2xl border border-white/70 p-4 shadow-xl sm:rounded-[2rem] sm:p-6 md:p-8">
          <h2 className="text-lg sm:text-2xl font-bold text-ink">Project Overview</h2>
          <p className="mt-4 text-xs sm:text-sm text-slate-700">
            The system combines a modern React frontend with an Oracle-powered backend concept to streamline the full lost-and-found lifecycle. Staff can register found items, users can search and claim belongings, and AI assistance improves descriptions and matching confidence.
          </p>

          <h3 className="mt-6 text-base sm:text-xl font-semibold text-ink">Tech Stack</h3>
          <ul className="mt-3 grid gap-3 text-slate-700 sm:grid-cols-3">
            <li className="rounded-2xl border border-slate-200 bg-white px-3 py-2 sm:px-4 sm:py-3">
              <p className="text-xs uppercase tracking-[0.2em] text-brand-700">Frontend</p>
              <p className="mt-1 text-xs sm:text-sm font-semibold">React</p>
            </li>
            <li className="rounded-2xl border border-slate-200 bg-white px-3 py-2 sm:px-4 sm:py-3">
              <p className="text-xs uppercase tracking-[0.2em] text-brand-700">Backend</p>
              <p className="mt-1 text-xs sm:text-sm font-semibold">Oracle APEX</p>
            </li>
            <li className="rounded-2xl border border-slate-200 bg-white px-3 py-2 sm:px-4 sm:py-3">
              <p className="text-xs uppercase tracking-[0.2em] text-brand-700">Database</p>
              <p className="mt-1 text-xs sm:text-sm font-semibold">Oracle Database</p>
            </li>
          </ul>

          <p className="mt-6 rounded-2xl border border-brand-100 bg-brand-50 px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-brand-900">
            This backend is built using Oracle APEX and connected to Oracle Database.
          </p>
        </article>

        <aside className="space-y-6">
          <section className="rounded-2xl bg-slate-950 px-4 py-4 sm:rounded-[2rem] sm:px-6 sm:py-6 text-white shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-200">
              Backend Access
            </p>
            <h3 className="mt-3 text-base sm:text-xl font-semibold">Oracle APEX Workspace</h3>
            <p className="mt-3 text-xs sm:text-sm text-slate-300">
              Open the hosted backend app in a new tab to review database-backed flows and APEX pages.
            </p>
            <a
              href="https://oracleapex.com/ords/r/asati/lost-item/view-items"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center rounded-xl bg-brand-600 px-3 py-1.5 text-xs sm:px-4 sm:py-2.5 sm:text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              🔗 View Backend (Oracle APEX)
            </a>
          </section>
        </aside>
      </section>
    </div>
  );
}

export default About;
