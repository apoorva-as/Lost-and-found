import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import PageHero from "../components/PageHero";
import Toast from "../components/Toast";

function ClaimStatus({ claims = [], items = [] }) {
  const { claimId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [toast, setToast] = useState(location.state?.toast || null);

  useEffect(() => {
    if (!location.state?.toast) {
      return;
    }

    navigate(location.pathname, { replace: true, state: {} });
  }, [location.pathname, location.state, navigate]);

  const latestClaimId = claims.length ? claims[0].id : null;
  const targetClaimId = claimId === "last" ? latestClaimId : Number(claimId);

  const claim = useMemo(() => {
    return claims.find((entry) => Number(entry.id) === Number(targetClaimId)) || null;
  }, [claims, targetClaimId]);

  const item = useMemo(() => {
    if (!claim) {
      return null;
    }

    return items.find((entry) => Number(entry.id) === Number(claim.item_id)) || null;
  }, [items, claim]);

  const formatMeetingTime = (value) => {
    if (!value) {
      return "Pending confirmation";
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleString();
  };

  return (
    <>
      <div className="space-y-8">
        <PageHero
          badge="My Claim"
          title="Track claim approval and handover details."
          description="This view lets the claimer check approval status and owner-provided meeting details in real time."
          actions={
            <Link
              to="/"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Back to View Items
            </Link>
          }
        />

        {!claim ? (
          <section className="glass-panel rounded-2xl border border-white/70 p-4 shadow-xl sm:rounded-[2rem] sm:p-6 md:p-8 text-center">
            <h2 className="text-lg sm:text-2xl font-bold text-ink">No claim found</h2>
            <p className="mt-3 text-xs sm:text-sm text-slate-600">
              Submit a claim first, then return to this page to track approval updates.
            </p>
          </section>
        ) : (
          <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <article className="glass-panel rounded-2xl border border-white/70 p-4 shadow-xl sm:rounded-[2rem] sm:p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-700">
                Claim #{claim.id}
              </p>
              <h2 className="mt-2 text-lg sm:text-2xl font-bold text-ink">
                {item?.item_name || "Claimed item"}
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-600">Claimer: {claim.user_name}</p>
              <p className="mt-3 rounded-2xl bg-slate-100 px-3 py-2 text-xs sm:px-4 sm:py-3 sm:text-sm text-slate-700">
                {claim.user_description}
              </p>

              {claim.status === "APPROVED" ? (
                <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 sm:p-5">
                  <p className="text-base sm:text-lg font-bold text-emerald-800">✅ Claim Approved</p>
                  <p className="mt-3 text-xs sm:text-sm text-slate-800">
                    📍 Location: <span className="font-semibold">{claim.meeting_location}</span>
                  </p>
                  <p className="mt-2 text-xs sm:text-sm text-slate-800">
                    ⏰ Time: <span className="font-semibold">{formatMeetingTime(claim.meeting_time)}</span>
                  </p>
                  <p className="mt-4 text-xs sm:text-sm text-emerald-900">
                    Please meet at the given location and time to collect your item.
                  </p>
                </div>
              ) : (
                <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-3 sm:p-5">
                  <p className="text-base sm:text-lg font-bold text-amber-800">Claim Pending Approval</p>
                  <p className="mt-3 text-xs sm:text-sm text-amber-900">
                    The owner has not approved yet. Meeting details will appear after approval.
                  </p>
                </div>
              )}
            </article>

            <aside className="rounded-2xl bg-slate-950 px-4 py-4 text-white shadow-xl sm:rounded-[2rem] sm:px-6 sm:py-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-200">
                Process Timeline
              </p>
              <ol className="mt-4 space-y-3 text-xs sm:text-sm text-slate-200">
                <li>1. Item added by owner</li>
                <li>2. Claim submitted by user</li>
                <li>3. Owner reviews and approves</li>
                <li>4. Meeting details shared</li>
                <li>5. Item handover completed</li>
              </ol>
            </aside>
          </section>
        )}
      </div>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  );
}

export default ClaimStatus;
