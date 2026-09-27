import Link from "next/link";
import { getServices } from "@/lib/data/services";
import { deleteServiceAction } from "./actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Services" };

export default async function ServicesAdminPage() {
  const services = await getServices();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-text">Services</h1>
          <p className="mt-1 text-sm text-text-muted">
            Treatments shown on the Services page and in each service card.
          </p>
        </div>
        <Link
          href="/admin/services/new"
          className="inline-flex min-h-[44px] items-center justify-center rounded-sm bg-accent px-5 py-2 text-sm font-medium text-white hover:bg-accent-hover"
        >
          Add service
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-md border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-alt text-text-muted">
            <tr>
              <th className="px-4 py-2 font-medium">Name</th>
              <th className="px-4 py-2 font-medium">Slug</th>
              <th className="px-4 py-2 font-medium">Order</th>
              <th className="px-4 py-2 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="border-t border-border align-top">
                <td className="px-4 py-2 text-text">{service.name}</td>
                <td className="px-4 py-2 text-text-muted">{service.slug}</td>
                <td className="px-4 py-2 text-text-muted">{service.sortOrder}</td>
                <td className="px-4 py-2 text-right">
                  <div className="flex justify-end gap-3">
                    {service.id > 0 ? (
                      <>
                        <Link href={`/admin/services/${service.id}`} className="text-accent hover:underline">
                          Edit
                        </Link>
                        <form action={deleteServiceAction}>
                          <input type="hidden" name="id" value={service.id} />
                          <button type="submit" className="text-error hover:underline">
                            Delete
                          </button>
                        </form>
                      </>
                    ) : (
                      <span className="text-xs text-text-muted">default (no DB)</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
