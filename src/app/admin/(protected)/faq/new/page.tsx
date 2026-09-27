import { createFaqAction } from "../actions";
import { FaqForm } from "../FaqForm";

export const metadata = { title: "Add FAQ" };

export default function NewFaqPage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-text">Add FAQ</h1>
      <FaqForm action={createFaqAction} />
    </div>
  );
}
