import { useMemo, useState } from "react";
import PageHero from "../components/PageHero";

function OwnerClaims({ claims = [], items = [], onApproveClaim }) {
  const [activeClaimId, setActiveClaimId] = useState(null);
  const [meetingLocation, setMeetingLocation] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [formError, setFormError] = useState("");

  const itemsMap = useMemo(() => {
    return new Map(items.map((item) => [Number(item.id), item]));
  }, [items]);

  const pendingClaims = claims.filter((claim) => claim.status === "PENDING");
  const approvedClaims = claims.filter((claim) => claim.status === "APPROVED");

  const formatMeetingTime = (value) => {
    if (!value) {
      return "-";
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleString();
  };

  const handleOpenApproval = (claim) => {
    setActiveClaimId(claim.id);
    setMeetingLocation(claim.meeting_location || "");
    setMeetingTime(claim.meeting_time || "");
    setFormError("");
  };

  const handleApprove = (event) => {
    event.preventDefault();

    if (!meetingLocation.trim() || !meetingTime) {
      setFormError("Please provide meeting location and time before approving.");
      return;
    }

    onApproveClaim(activeClaimId, {
      meeting_location: meetingLocation.trim(),
      meeting_time: meetingTime,
    });

    setActiveClaimId(null);
    setMeetingLocation("");
    setMeetingTime("");
    setFormError("");
  };

  return (
    <div className="space-y-8">
      <PageHero
        badge="Owner Action Center"
        title="Approve claims and schedule safe handovers."
        description="Review each claim request and add meeting details before approval. This simulates the real-world owner-to-claimer handover process."
      />

      <section className="grid gap-4 lg:gap-6 lg:grid-cols-2">
        <article className="glass-panel rounded-[2rem] border border-white/70 p-6 shadow-xl sm:p-8">
          <h2 className="text-lg font-bold text-ink sm:text-2xl">Pending Claims</h2>
          <p className="mt-1 text-xs text-slate-600 sm:mt-2 sm:text-sm">
            Approving a claim requires meeting location and meeting time.
          </p>

          <div className="mt-5 space-y-4">
            {pendingClaims.length ? (
              pendingClaims.map((claim) => {
                const item = itemsMap.get(Number(claim.item_id));
                const isActive = activeClaimId === claim.id;

                return (
                  <div
                    key={claim.id}
                    className="rounded-2xl border border-slate-200 bg-white/80 p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
                          Claim #{claim.id}
                        </p>
                        <h3 className="mt-1 text-base sm:text-lg font-semibold text-ink">
                          {item?.item_name || "Unknown item"}
                        </h3>
                        <p className="mt-1 text-xs sm:text-sm text-slate-600">
                          Claimer: <span className="font-semibold">{claim.user_name}</span>
                        </p>
                        <p className="mt-2 text-xs sm:text-sm text-slate-700">{claim.user_description}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleOpenApproval(claim)}
                        className="rounded-xl bg-brand-600 px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm font-semibold text-white transition hover:bg-brand-700 flex-shrink-0"
                      >
                        Approve
                      </button>
                    </div>

                    {isActive ? (
                      <form onSubmit={handleApprove} className="mt-4 space-y-3 rounded-2xl border border-brand-100 bg-brand-50 p-3 sm:p-4">
                        <h4 className="text-xs sm:text-sm font-semibold text-brand-900">Confirm Meeting Details</h4>
                        <div>
                          <label
                            htmlFor="meeting_location"
                            className="mb-1 block text-xs sm:text-sm font-medium text-slate-700"
                          >
                            Meeting Location
                          </label>
                          <input
                            id="meeting_location"
                            value={meetingLocation}
                            onChange={(event) => setMeetingLocation(event.target.value)}
                            placeholder="Library Gate"
                            className="w-full rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="meeting_time"
                            className="mb-1 block text-xs sm:text-sm font-medium text-slate-700"
                          >
                            Meeting Time
                          </label>
                          <input
                            id="meeting_time"
                            type="datetime-local"
                            value={meetingTime}
                            onChange={(event) => setMeetingTime(event.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
                          />
                        </div>

                        {formError ? (
                          <p className="rounded-xl border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm text-rose-700">
                            {formError}
                          </p>
                        ) : null}

                        <button
                          type="submit"
                          className="rounded-xl bg-accent-500 px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm font-semibold text-white transition hover:bg-accent-600"
                        >
                          Confirm & Approve
                        </button>
                      </form>
                    ) : null}
                  </div>
                );
              })
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-8 text-center text-sm text-slate-500">
                No pending claims right now.
              </div>
            )}
          </div>
        </article>

        <article className="glass-panel rounded-2xl border border-white/70 p-4 shadow-xl sm:rounded-[2rem] sm:p-6 md:p-8">
          <h2 className="text-lg font-bold text-ink sm:text-2xl">Approved Claims</h2>
          <p className="mt-1 text-xs text-slate-600 sm:mt-2 sm:text-sm">
            Approved records include final meeting location and time.
          </p>

          <div className="mt-5 space-y-4">
            {approvedClaims.length ? (
              approvedClaims.map((claim) => {
                const item = itemsMap.get(Number(claim.item_id));

                return (
                  <div key={claim.id} className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3 sm:p-4">
                    <p className="text-xs sm:text-sm font-semibold text-emerald-800">Claim Approved</p>
                    <h3 className="mt-1 text-sm sm:text-base font-semibold text-slate-900">
                      {item?.item_name || "Unknown item"}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-700">Claimer: {claim.user_name}</p>
                    <p className="mt-1 text-xs sm:text-sm text-slate-700">Location: {claim.meeting_location}</p>
                    <p className="mt-1 text-xs sm:text-sm text-slate-700">
                      Time: {formatMeetingTime(claim.meeting_time)}
                    </p>
                  </div>
                );
              })
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-8 text-center text-sm text-slate-500">
                Approved claims will appear here.
              </div>
            )}
          </div>
        </article>
      </section>
    </div>
  );
}

export default OwnerClaims;
