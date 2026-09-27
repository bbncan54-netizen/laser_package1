import { notFound } from "next/navigation";
import { getServiceById } from "@/lib/data/services";
import { updateServiceAction } from "../actions";
import { ServiceForm } from "../ServiceForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit Service" };

export default async function EditServicePage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const service = await getServiceById(id);
  if (!service) notFound();

  const boundAction = updateServiceAction.bind(null, id);

  return (
    <div>
      <h1 className="font-display text-2xl text-text">Edit Service</h1>
      <ServiceForm service={service} action={boundAction} />
    </div>
  );
}
