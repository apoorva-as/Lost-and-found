function SearchBar({ value, onChange }) {
  return (
    <div className="glass-panel rounded-3xl border border-white/70 p-3 shadow-lg sm:p-4">
      <label htmlFor="search" className="mb-2 block text-xs font-semibold text-slate-700 sm:text-sm">
        Search by item name or location
      </label>
      <div className="relative">
        <input
          id="search"
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
         
          className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 pl-9 text-xs sm:px-4 sm:py-3 sm:pl-11 sm:text-sm text-slate-800 outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
        />
        <span className="pointer-events-none absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs sm:text-sm">
          Search
        </span>
      </div>
    </div>
  );
}

export default SearchBar;
