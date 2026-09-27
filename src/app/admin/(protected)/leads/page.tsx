import { getLeads } from "@/lib/data/leads";
import { updateLeadStatusAction, deleteLeadAction } from "./actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Leads" };

const statusStyles: Record<string, string> = {
  new: "bg-accent/10 text-accent",
  contacted: "bg-success/10 text-success",
  archived: "bg-surface-alt text-text-muted",
};

export default async function LeadsAdminPage() {
  const leads = await getLeads();

  return (
    <div>
      <h1 className="font-display text-2xl text-text">Consultation Leads</h1>
      <p className="mt-1 text-sm text-text-muted">
        Submissions from the contact/consultation form.
      </p>

      {leads.length === 0 ? (
        <p className="mt-6 text-sm text-text-muted">No leads yet.</p>
      ) : (
        <div className="mt-6 space-y-3">
          {leads.map((lead) => (
            <div key={lead.id} className="rounded-md border border-border bg-surface p-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-text">
                    {lead.name}{" "}
                    <span className={`ml-2 rounded-full px-2 py-0.5 text-xs capitalize ${statusStyles[lead.status]}`}>
                      {lead.status}
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-text-muted">{lead.email}{lead.phone ? ` · ${lead.phone}` : ""}</p>
                  <p className="mt-1 text-sm text-text">Interested in: {lead.service}</p>
                  {lead.message && (
                    <p className="mt-1 text-sm text-text-muted">&ldquo;{lead.message}&rdquo;</p>
                  )}
                  <p className="mt-2 text-xs text-text-muted">
                    {new Date(lead.createdAt).toLocaleString("en-CA")}
                  </p>
                </div>

                <div className="flex shrink-0 flex-col items-end gap-2">
                  <form action={updateLeadStatusAction} className="flex gap-2">
                    <input type="hidden" name="id" value={lead.id} />
                    <select
                      name="status"
                      defaultValue={lead.status}
                      className="rounded-sm border border-border bg-surface px-2 py-1 text-sm text-text"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="archived">Archived</option>
                    </select>
                    <button type="submit" className="text-sm text-accent hover:underline">
                      Update
                    </button>
                  </form>
                  <form action={deleteLeadAction}>
                    <input type="hidden" name="id" value={lead.id} />
                    <button type="submit" className="text-sm text-error hover:underline">
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
