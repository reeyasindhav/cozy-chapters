export function LeafMark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <path
        d="M33 15c0 10-6.5 18-15.5 18C14 33 13 30 13 30S22 30 27 24c4-4.8 6-9 6-9Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M31 17 15 33" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
