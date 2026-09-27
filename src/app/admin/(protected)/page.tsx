import Link from "next/link";
import { getLeads } from "@/lib/data/leads";
import { getServices } from "@/lib/data/services";
import { getFaqs } from "@/lib/data/faq";
import { getGalleryItems } from "@/lib/data/gallery";
import { getTestimonials } from "@/lib/data/testimonials";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [leads, services, faqs, gallery, testimonials] = await Promise.all([
    getLeads(),
    getServices(),
    getFaqs(),
    getGalleryItems(),
    getTestimonials(),
  ]);

  const newLeads = leads.filter((lead) => lead.status === "new");

  const cards = [
    { label: "New leads", value: newLeads.length, href: "/admin/leads" },
    { label: "Services", value: services.length, href: "/admin/services" },
    { label: "Gallery images", value: gallery.length, href: "/admin/gallery" },
    { label: "Testimonials", value: testimonials.length, href: "/admin/testimonials" },
    { label: "FAQ entries", value: faqs.length, href: "/admin/faq" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl text-text">Dashboard</h1>
      <p className="mt-1 text-sm text-text-muted">
        Overview of site content and consultation leads.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-md border border-border bg-surface p-4 transition-colors hover:border-primary"
          >
            <p className="text-2xl font-semibold text-text">{card.value}</p>
            <p className="mt-1 text-sm text-text-muted">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="font-display text-lg text-text">Recent leads</h2>
        {leads.length === 0 ? (
          <p className="mt-2 text-sm text-text-muted">
            No consultation requests yet.
          </p>
        ) : (
          <div className="mt-3 overflow-x-auto rounded-md border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-alt text-text-muted">
                <tr>
                  <th className="px-4 py-2 font-medium">Name</th>
                  <th className="px-4 py-2 font-medium">Service</th>
                  <th className="px-4 py-2 font-medium">Status</th>
                  <th className="px-4 py-2 font-medium">Received</th>
                </tr>
              </thead>
              <tbody>
                {leads.slice(0, 5).map((lead) => (
                  <tr key={lead.id} className="border-t border-border">
                    <td className="px-4 py-2 text-text">{lead.name}</td>
                    <td className="px-4 py-2 text-text-muted">{lead.service}</td>
                    <td className="px-4 py-2 text-text-muted capitalize">{lead.status}</td>
                    <td className="px-4 py-2 text-text-muted">
                      {new Date(lead.createdAt).toLocaleDateString("en-CA")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
