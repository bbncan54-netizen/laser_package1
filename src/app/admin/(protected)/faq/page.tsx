import Link from "next/link";
import { getFaqs } from "@/lib/data/faq";
import { deleteFaqAction } from "./actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "FAQ" };

export default async function FaqAdminPage() {
  const faqs = await getFaqs();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-text">FAQ</h1>
          <p className="mt-1 text-sm text-text-muted">Shown on the FAQ page.</p>
        </div>
        <Link
          href="/admin/faq/new"
          className="inline-flex min-h-[44px] items-center justify-center rounded-sm bg-accent px-5 py-2 text-sm font-medium text-white hover:bg-accent-hover"
        >
          Add FAQ
        </Link>
      </div>

      <ul className="mt-6 space-y-3">
        {faqs.map((faq) => (
          <li key={faq.id} className="rounded-md border border-border bg-surface p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium text-text">{faq.question}</p>
                <p className="mt-1 text-sm text-text-muted">{faq.answer}</p>
              </div>
              {faq.id > 0 ? (
                <div className="flex shrink-0 gap-3 text-sm">
                  <Link href={`/admin/faq/${faq.id}`} className="text-accent hover:underline">
                    Edit
                  </Link>
                  <form action={deleteFaqAction}>
                    <input type="hidden" name="id" value={faq.id} />
                    <button type="submit" className="text-error hover:underline">
                      Delete
                    </button>
                  </form>
                </div>
              ) : (
                <span className="shrink-0 text-xs text-text-muted">default (no DB)</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
