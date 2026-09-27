import { TextareaHTMLAttributes, InputHTMLAttributes } from "react";

const fieldClasses =
  "mt-1 w-full rounded-sm border border-border bg-surface px-3 py-2 text-text focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus";

type BaseProps = { label: string; name: string; hint?: string };

export function TextField({
  label,
  name,
  hint,
  ...rest
}: BaseProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-text">
        {label}
      </label>
      <input id={name} name={name} className={fieldClasses} {...rest} />
      {hint && <p className="mt-1 text-xs text-text-muted">{hint}</p>}
    </div>
  );
}

export function TextAreaField({
  label,
  name,
  hint,
  ...rest
}: BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-text">
        {label}
      </label>
      <textarea id={name} name={name} rows={4} className={fieldClasses} {...rest} />
      {hint && <p className="mt-1 text-xs text-text-muted">{hint}</p>}
    </div>
  );
}
