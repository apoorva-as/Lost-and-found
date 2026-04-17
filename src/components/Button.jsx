function Button({
  children,
  variant = "primary",
  type = "button",
  className = "",
  disabled = false,
  ...props
}) {
  const variants = {
    primary:
      "bg-brand-600 text-white hover:bg-brand-700 focus:ring-brand-200 disabled:bg-brand-300",
    success:
      "bg-accent-500 text-white hover:bg-accent-600 focus:ring-emerald-200 disabled:bg-emerald-300",
    secondary:
      "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 focus:ring-slate-200 disabled:text-slate-400"
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm transition duration-200 focus:outline-none focus:ring-4 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
