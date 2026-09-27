import { notFound } from "next/navigation";
import { getFaqById } from "@/lib/data/faq";
import { updateFaqAction } from "../actions";
import { FaqForm } from "../FaqForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit FAQ" };

export default async function EditFaqPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const faq = await getFaqById(id);
  if (!faq) notFound();

  const boundAction = updateFaqAction.bind(null, id);

  return (
    <div>
      <h1 className="font-display text-2xl text-text">Edit FAQ</h1>
      <FaqForm faq={faq} action={boundAction} />
    </div>
  );
}
