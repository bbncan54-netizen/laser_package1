const placeholderSlots = Array.from({ length: 6 });

export function ResultsGallery() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {placeholderSlots.map((_, index) => (
          <div
            key={index}
            className="flex aspect-square flex-col items-center justify-center gap-2 rounded-md border border-dashed border-border bg-surface-alt p-4 text-center"
          >
            <svg
              aria-hidden="true"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-text-muted"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <circle cx="9" cy="10" r="1.5" />
              <path d="M21 16l-5-5-9 9" />
            </svg>
            <span className="text-xs text-text-muted">
              [Client result — coming soon]
            </span>
          </div>
        ))}
      </div>

      <p className="mt-8 max-w-2xl text-sm text-text-muted sm:text-base">
        Real client results will be added here with each client&apos;s
        permission. In the meantime, explore our services to learn what to
        expect.
      </p>
    </div>
  );
}
