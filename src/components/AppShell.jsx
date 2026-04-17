import { Link, useLocation } from "react-router-dom";

function AppShell({ children, pendingClaimsCount = 0 }) {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname.startsWith("/claim/");
    }

    if (path === "/my-claim") {
      return location.pathname.startsWith("/my-claim/");
    }

    return location.pathname === path;
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-hero-grid bg-[size:40px_40px] opacity-40" />
      <div className="absolute left-1/2 top-[-8rem] -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-brand-300/40 blur-3xl" />

      <header className="sticky top-0 z-30 border-b border-white/50 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-ink text-base font-bold text-white shadow-glow sm:h-11 sm:w-11 sm:rounded-2xl sm:text-lg">
              AI
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-700 sm:text-sm">
                Lost & Found
              </p>
              <h1 className="text-sm font-bold text-ink sm:text-lg">
                AI-Powered Item Recovery
              </h1>
            </div>
          </Link>

          <nav className="flex flex-wrap items-center justify-end gap-1 rounded-full border border-slate-200/80 bg-white/80 p-1 shadow-sm sm:gap-2">
            <Link
              to="/"
              className={`whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs font-medium transition sm:px-4 sm:py-2 sm:text-sm ${
                isActive("/")
                  ? "bg-brand-600 text-white shadow"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              View Items
            </Link>
            <Link
              to="/add-item"
              className={`hidden whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs font-medium transition sm:inline-flex sm:px-4 sm:py-2 sm:text-sm ${
                isActive("/add-item")
                  ? "bg-brand-600 text-white shadow"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Add Item
            </Link>
           
            <Link
              to="/owner-claims"
              className={`relative whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs font-medium transition sm:px-4 sm:py-2 sm:text-sm ${
                isActive("/owner-claims")
                  ? "bg-brand-600 text-white shadow"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Claims
              {pendingClaimsCount ? (
                <span className="ml-1.5 inline-flex min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold text-white sm:ml-2 sm:px-1.5 sm:text-[11px]">
                  {pendingClaimsCount}
                </span>
              ) : null}
            </Link>
            <Link
              to="/my-claim/last"
              className={`hidden whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs font-medium transition sm:inline-flex sm:px-4 sm:py-2 sm:text-sm ${
                isActive("/my-claim")
                  ? "bg-brand-600 text-white shadow"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              My Claim
            </Link>
            <Link
              to="/about"
              className={`hidden whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs font-medium transition sm:inline-flex sm:px-4 sm:py-2 sm:text-sm ${
                isActive("/about")
                  ? "bg-brand-600 text-white shadow"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              About
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}

export default AppShell;
