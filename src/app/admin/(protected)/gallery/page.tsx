import { getGalleryItems } from "@/lib/data/gallery";
import { deleteGalleryItemAction } from "./actions";
import { GalleryForm } from "./GalleryForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Gallery" };

export default async function GalleryAdminPage() {
  const items = await getGalleryItems();

  return (
    <div>
      <h1 className="font-display text-2xl text-text">Gallery</h1>
      <p className="mt-1 text-sm text-text-muted">
        Images shown on the Our Work page. Only use images the business has
        rights to and client permission for (06_UI_UX_SEO_SECURITY_QA.md §11).
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {items.length === 0 && (
          <p className="col-span-full text-sm text-text-muted">No images yet.</p>
        )}
        {items.map((item) => (
          <div key={item.id} className="overflow-hidden rounded-md border border-border bg-surface">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.imageUrl} alt={item.altText} className="aspect-square w-full object-cover" />
            <div className="p-3">
              <p className="truncate text-sm text-text">{item.altText}</p>
              {item.category && <p className="text-xs text-text-muted">{item.category}</p>}
              <form action={deleteGalleryItemAction} className="mt-2">
                <input type="hidden" name="id" value={item.id} />
                <button type="submit" className="text-sm text-error hover:underline">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>

      <GalleryForm />
    </div>
  );
}
