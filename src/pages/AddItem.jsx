import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import PageHero from "../components/PageHero";
import Toast from "../components/Toast";

function AddItem({ onAddItem }) {
  const [formData, setFormData] = useState({
    item_name: "",
    location: "",
    found_date: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [toast, setToast] = useState(null);

  const canSubmit = useMemo(() => {
    return Boolean(
      formData.item_name.trim() &&
      formData.location.trim() &&
      formData.found_date &&
      imagePreview
    );
  }, [formData, imagePreview]);

  useEffect(() => {
    return () => {
      if (imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      setImageFile(null);
      if (imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview("");
      return;
    }

    if (imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    const objectUrl = URL.createObjectURL(file);
    setImageFile(file);
    setImagePreview(objectUrl);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    if (!canSubmit) {
      setFormError("Please complete all fields and upload an image.");
      return;
    }

    setSubmitting(true);

    await new Promise((resolve) => {
      window.setTimeout(resolve, 600);
    });

    const newItem = {
      id: Date.now(),
      item_name: formData.item_name.trim(),
      location: formData.location.trim(),
      found_date: formData.found_date,
      image_url: imagePreview,
      image_name: imageFile?.name || "Uploaded image",
    };

    onAddItem(newItem);

    setFormData({
      item_name: "",
      location: "",
      found_date: "",
    });
    setImageFile(null);
    setImagePreview("");
    setToast({
      type: "success",
      title: "Item added",
      message: "The found item has been saved in demo storage.",
    });
    setSubmitting(false);
  };

  return (
    <>
      <div className="space-y-8">
        <PageHero
          badge="Add Found Item"
          title="Capture found belongings with a complete visual record."
          description="Use this form to log a found item for review and claims. This demo stores everything locally for hackathon presentations."
          actions={
            <Link
              to="/"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Back to View Items
            </Link>
          }
        />

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <form
            onSubmit={handleSubmit}
            className="glass-panel rounded-2xl border border-white/70 p-4 shadow-xl sm:rounded-[2rem] sm:p-6 md:p-8"
          >
            <h2 className="text-lg font-bold text-ink sm:text-2xl">Found Item Details</h2>
            <p className="mt-1 text-xs text-slate-600 sm:mt-2 sm:text-sm">
              Complete each field to keep claim verification accurate.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-800 sm:text-sm" htmlFor="item_name">
                  Item Name
                </label>
                <input
                  id="item_name"
                  name="item_name"
                  value={formData.item_name}
                  onChange={handleChange}
                  placeholder="Example: Black Wallet"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs sm:px-4 sm:py-3 sm:text-sm text-slate-800 outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-800 sm:text-sm" htmlFor="location">
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Example: Main Library"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs sm:px-4 sm:py-3 sm:text-sm text-slate-800 outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-800 sm:text-sm" htmlFor="found_date">
                  Found Date
                </label>
                <input
                  id="found_date"
                  name="found_date"
                  type="date"
                  value={formData.found_date}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs sm:px-4 sm:py-3 sm:text-sm text-slate-800 outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-800 sm:text-sm" htmlFor="image_upload">
                  Image Upload
                </label>
                <input
                  id="image_upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs sm:px-4 sm:py-3 sm:text-sm text-slate-700 file:mr-2 sm:file:mr-3 file:rounded-lg file:border-0 file:bg-brand-100 file:px-2 sm:file:px-3 file:py-2 file:text-xs sm:file:text-sm file:font-semibold file:text-brand-700 hover:file:bg-brand-200"
                />
              </div>
            </div>

            {formError ? (
              <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs sm:px-4 sm:py-3 sm:text-sm text-rose-700">
                {formError}
              </div>
            ) : null}

            <div className="mt-6">
              <Button type="submit" variant="success" disabled={submitting || !canSubmit}>
                {submitting ? "Saving..." : "Add Found Item"}
              </Button>
            </div>
          </form>

          <aside className="space-y-4 sm:space-y-6">
            <section className="glass-panel rounded-2xl border border-white/70 p-4 shadow-xl sm:rounded-[2rem] sm:p-6">
              <h3 className="text-lg font-bold text-ink">Live Preview</h3>
              <p className="mt-2 text-sm text-slate-600">
                Uploaded image and metadata preview before you submit.
              </p>

              <div className="mt-4 overflow-hidden rounded-2xl bg-slate-100">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Found item preview"
                    className="h-52 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-52 items-center justify-center text-sm text-slate-500">
                    Upload an image to preview
                  </div>
                )}
              </div>

              <dl className="mt-4 space-y-2 text-sm text-slate-700">
                <div className="flex justify-between gap-4">
                  <dt className="font-semibold">Item</dt>
                  <dd>{formData.item_name || "-"}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-semibold">Location</dt>
                  <dd>{formData.location || "-"}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-semibold">Date</dt>
                  <dd>{formData.found_date || "-"}</dd>
                </div>
              </dl>
            </section>

            <section className="rounded-[2rem] bg-slate-950 px-6 py-6 text-white shadow-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-200">
                Demo Storage
              </p>
              <h3 className="mt-3 text-xl font-semibold">Local-only item registry</h3>
              <p className="mt-3 text-sm text-slate-300">
                New entries are stored in app state so the flow can be demonstrated without a live backend.
              </p>
            </section>
          </aside>
        </section>
      </div>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  );
}

export default AddItem;
