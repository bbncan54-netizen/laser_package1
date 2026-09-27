export function FormMessage({ error, success }: { error?: string | null; success?: string | null }) {
  if (error) {
    return (
      <p role="alert" className="mt-4 rounded-sm border border-error/30 bg-error/5 px-3 py-2 text-sm text-error">
        {error}
      </p>
    );
  }
  if (success) {
    return (
      <p role="status" className="mt-4 rounded-sm border border-success/30 bg-success/5 px-3 py-2 text-sm text-success">
        {success}
      </p>
    );
  }
  return null;
}
