import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import ItemCard from "../components/ItemCard";
import PageHero from "../components/PageHero";
import SearchBar from "../components/SearchBar";
import StatCard from "../components/StatCard";
import Toast from "../components/Toast";

function ViewItems({ items = [], claims = [] }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(location.state?.toast || null);

  useEffect(() => {
    setLoading(true);
    const timer = window.setTimeout(() => setLoading(false), 300);

    return () => window.clearTimeout(timer);
  }, [items]);

  useEffect(() => {
    if (!location.state?.toast) {
      return;
    }

    navigate(location.pathname, { replace: true, state: {} });
  }, [location.pathname, location.state, navigate]);

  const safeItems = Array.isArray(items) ? items : [];
  const approvedItemIds = new Set(
    (Array.isArray(claims) ? claims : [])
      .filter((claim) => claim.status === "APPROVED")
      .map((claim) => Number(claim.item_id))
  );

  const availableItems = safeItems.filter((item) => !approvedItemIds.has(Number(item.id)));
  const query = search.trim().toLowerCase();
  const filteredItems = !query
    ? availableItems
    : availableItems.filter(
        (item) =>
          item.item_name.toLowerCase().includes(query) ||
          item.location.toLowerCase().includes(query)
      );

  const totalItems = availableItems.length;
  const uniqueLocations = new Set(availableItems.map((item) => item.location)).size;

  return (
    <>
      <div className="space-y-8">
        <PageHero
          badge="Smart Recovery Hub"
          title="Locate found items faster with search, smart matching, and guided claims."
          description="This AI-powered experience helps teams surface found belongings, triage claims, and improve ownership descriptions for faster recovery."
          actions={
            <Link
              to="/add-item"
              className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
            >
              Add Found Item
            </Link>
          }
        />

        <section className="grid gap-4 md:grid-cols-3">
          <StatCard label="Items Available" value={totalItems} tone="blue" />
          <StatCard label="Locations Covered" value={uniqueLocations || 0} tone="green" />
          <StatCard label="AI Match Engine" value="Active" tone="dark" />
        </section>

        <SearchBar value={search} onChange={setSearch} />

        {loading ? (
          <div className="grid gap-3 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-56 animate-pulse rounded-3xl bg-white/70 shadow-lg"
              />
            ))}
          </div>
        ) : filteredItems.length ? (
          <section className="grid gap-3 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </section>
        ) : (
          <EmptyState
            title="No items match your search"
            description="Try a broader keyword or search by the place where the item was found."
          />
        )}
      </div>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  );
}

export default ViewItems;
