import { getBusinessInfo } from "@/lib/data/business-info";
import { BusinessInfoForm } from "./BusinessInfoForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Business Info" };

export default async function BusinessInfoPage() {
  const info = await getBusinessInfo();
  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl text-text">Business Info</h1>
      <p className="mt-1 text-sm text-text-muted">
        Shown across the site — header, footer, contact page, and structured
        data.
      </p>
      <BusinessInfoForm info={info} />
    </div>
  );
}
