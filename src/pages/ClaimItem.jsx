import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import EmptyState from "../components/EmptyState";
import PageHero from "../components/PageHero";
import { getSuggestedMatches, improveDescription } from "../services/ai";

function ClaimItem({ items = [], onSubmitClaim }) {
  const { itemId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedItem, setSelectedItem] = useState(location.state?.item || null);
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [status] = useState("PENDING");
  const [submitting, setSubmitting] = useState(false);
  const [loadingItems, setLoadingItems] = useState(true);
  const [improving, setImproving] = useState(false);
  const [formError, setFormError] = useState("");
  const safeItems = Array.isArray(items) ? items : [];

  useEffect(() => {
    setLoadingItems(true);
    const timer = window.setTimeout(() => {
      const matchedItem =
        location.state?.item ||
        safeItems.find((item) => String(item.id) === String(itemId)) ||
        null;

      setSelectedItem(matchedItem);
      setLoadingItems(false);
    }, 260);

    return () => window.clearTimeout(timer);
  }, [itemId, items, location.state]);

  const suggestions = getSuggestedMatches(userDescription, safeItems, Number(itemId));

  const handleImproveDescription = async () => {
    setImproving(true);
    setFormError("");

    try {
      const improvedText = await improveDescription(userDescription, selectedItem);
      setUserDescription(improvedText);
    } catch (error) {
      setFormError(error.message || "Unable to improve description.");
    } finally {
      setImproving(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    if (!userName.trim()) {
      setFormError("Please enter your name before submitting your claim.");
      return;
    }

    if (!userDescription.trim()) {
      setFormError("Please describe the item before submitting your claim.");
      return;
    }

    setSubmitting(true);

    try {
      await new Promise((resolve) => {
        window.setTimeout(resolve, 700);
      });

      const createdClaim = onSubmitClaim({
        item_id: Number(itemId),
        user_name: userName.trim(),
        user_description: userDescription.trim(),
      });

      navigate(`/my-claim/${createdClaim.id}`, {
        replace: true,
        state: {
          toast: {
            type: "success",
            title: "Claim submitted",
            message: "Your ownership request was recorded. Wait for owner approval.",
          },
        },
      });
    } catch (error) {
      setFormError(error.message || "Unable to submit your claim.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageHero
        badge="Claim Workflow"
        title="Submit a confident item claim with AI-assisted matching."
        description="Describe the item in your own words, review AI suggestions, and send a claim request to the backend for verification."
        actions={
          <Link
            to="/"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Back to Items
          </Link>
        }
      />

      {loadingItems ? (
        <div className="h-72 animate-pulse rounded-[2rem] bg-white/70 shadow-xl" />
      ) : !selectedItem ? (
        <EmptyState
          title="Item not found"
          description="The requested item could not be loaded. Return to the item list and try again."
        />
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="glass-panel rounded-2xl border border-white/70 p-4 shadow-xl sm:rounded-[2rem] sm:p-6 md:p-8">
            <div className="mb-4 flex flex-col items-start justify-between gap-2 sm:mb-6 sm:flex-row sm:gap-4 md:flex-wrap">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-700">
                  Claiming Item #{selectedItem.id}
                </p>
                <h2 className="text-lg font-bold text-ink sm:text-2xl md:text-2xl">
                  {selectedItem.item_name}
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Found at <span className="font-semibold">{selectedItem.location}</span> on{" "}
                  <span className="font-semibold">{selectedItem.found_date}</span>
                </p>
              </div>
              <div className="rounded-2xl bg-accent-500/10 px-4 py-3 text-sm font-semibold text-accent-600">
                Status: {status}
              </div>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="user_name"
                  className="mb-2 block text-xs font-semibold text-slate-800 sm:text-sm"
                >
                  Your Name
                </label>
                <input
                  id="user_name"
                  type="text"
                  value={userName}
                  onChange={(event) => setUserName(event.target.value)}
                  placeholder="Enter your full name"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs sm:px-4 sm:py-3 sm:text-sm text-slate-800 outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-xs font-semibold text-slate-800 sm:text-sm"
                >
                  User Description
                </label>
                <textarea
                  id="description"
                  rows="7"
                  value={userDescription}
                  onChange={(event) => setUserDescription(event.target.value)}
                  placeholder="Describe color, brand, contents, identifying marks, and where you last remember using it."
                  className="w-full rounded-3xl border border-slate-200 bg-white px-3 py-3 text-xs sm:px-4 sm:py-4 sm:text-sm text-slate-800 outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="secondary"
                  onClick={handleImproveDescription}
                  disabled={improving || !selectedItem}
                >
                  {improving ? "Improving..." : "\u2728 Improve Description"}
                </Button>
                <Button type="submit" variant="success" disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit Claim"}
                </Button>
              </div>

              {formError ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs sm:px-4 sm:py-3 sm:text-sm text-rose-700">
                  {formError}
                </div>
              ) : null}
            </form>
          </section>

          <aside className="space-y-6">
            <section className="glass-panel rounded-2xl border border-white/70 p-4 shadow-xl sm:rounded-[2rem] sm:p-6">
              <h3 className="text-lg font-bold text-ink">
                {"\u{1F50D} AI Suggested Matches"}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Matching is based on keywords from your description and the found-item data.
              </p>

              <div className="mt-5 space-y-4">
                {suggestions.length ? (
                  suggestions.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-slate-200 bg-white/80 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="font-semibold text-slate-900">{item.item_name}</h4>
                          <p className="mt-1 text-sm text-slate-600">{item.location}</p>
                        </div>
                        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                          {item.matchScore}% match
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 px-4 py-5 text-sm text-slate-500">
                    Start typing a description to surface likely matches.
                  </div>
                )}
              </div>
            </section>

            <section className="rounded-[2rem] bg-slate-950 px-6 py-6 text-white shadow-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-200">
                AI Assistance
              </p>
              <h3 className="mt-3 text-xl font-semibold">
                Description booster for faster manual review
              </h3>
              <p className="mt-3 text-sm text-slate-300">
                Use the improve action to turn short notes into a richer ownership
                summary with location cues, material details, and identifiers.
              </p>
            </section>
          </aside>
        </div>
      )}
    </div>
  );
}

export default ClaimItem;
