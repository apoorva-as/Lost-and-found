import { useNavigate } from "react-router-dom";
import Button from "./Button";

function ItemCard({ item }) {
  const navigate = useNavigate();

  return (
    <article className="group glass-panel flex h-full flex-col rounded-2xl border border-white/70 p-4 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl sm:rounded-3xl sm:p-6">
      <div className="relative mb-3 overflow-hidden rounded-xl sm:mb-5 sm:rounded-2xl">
        <img
          src={item.image_url}
          alt={item.item_name}
          className="h-32 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-44"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" />
      </div>

      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-700">
            Found Item
          </p>
          <h3 className="mt-2 text-xl font-semibold text-ink">{item.item_name}</h3>
        </div>
        <div className="rounded-2xl bg-brand-50 px-3 py-2 text-xs font-semibold text-brand-700">
          #{item.id}
        </div>
      </div>

      <div className="space-y-3 text-sm text-slate-600">
        <p>
          <span className="font-semibold text-slate-800">Location:</span>{" "}
          {item.location}
        </p>
        <p>
          <span className="font-semibold text-slate-800">Found Date:</span>{" "}
          {item.found_date}
        </p>
      </div>

      <div className="mt-6 pt-4">
        <Button
          className="w-full"
          onClick={() =>
            navigate(`/claim/${item.id}`, {
              state: { item },
            })
          }
        >
          Claim Item
        </Button>
      </div>
    </article>
  );
}

export default ItemCard;
