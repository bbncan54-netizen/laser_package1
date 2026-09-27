import { getTestimonials } from "@/lib/data/testimonials";
import { deleteTestimonialAction } from "./actions";
import { TestimonialForm } from "./TestimonialForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Testimonials" };

export default async function TestimonialsAdminPage() {
  const testimonials = await getTestimonials();

  return (
    <div>
      <h1 className="font-display text-2xl text-text">Testimonials</h1>
      <p className="mt-1 text-sm text-text-muted">
        Only add genuine, client-provided reviews. Never fabricated.
      </p>

      <ul className="mt-6 space-y-3">
        {testimonials.length === 0 && (
          <p className="text-sm text-text-muted">No testimonials yet.</p>
        )}
        {testimonials.map((t) => (
          <li key={t.id} className="rounded-md border border-border bg-surface p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium text-text">
                  {t.customerName}
                  {t.rating ? ` — ${t.rating}/5` : ""}
                </p>
                <p className="mt-1 text-sm text-text-muted">{t.review}</p>
                {t.source && <p className="mt-1 text-xs text-text-muted">Source: {t.source}</p>}
              </div>
              <form action={deleteTestimonialAction}>
                <input type="hidden" name="id" value={t.id} />
                <button type="submit" className="shrink-0 text-sm text-error hover:underline">
                  Delete
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>

      <TestimonialForm />
    </div>
  );
}
