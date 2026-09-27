import { createServiceAction } from "../actions";
import { ServiceForm } from "../ServiceForm";

export const metadata = { title: "Add Service" };

export default function NewServicePage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-text">Add Service</h1>
      <ServiceForm action={createServiceAction} />
    </div>
  );
}
