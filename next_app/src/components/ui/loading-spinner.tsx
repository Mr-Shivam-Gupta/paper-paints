interface LoadingSpinnerProps {
  message?: string;
  className?: string;
  spinnerClassName?: string;
}

export function LoadingSpinner({
  message = "Loading...",
  className = "min-h-screen flex items-center justify-center",
  spinnerClassName = "animate-spin rounded-full h-10 w-10 border-2 border-accent-red/30 border-t-accent-red"
}: LoadingSpinnerProps) {
  return (
    <div className={className}>
      <div className="flex flex-col items-center gap-4">
        <div className={spinnerClassName} />
        <span className="text-base font-paragraph text-dark-grey">{message}</span>
      </div>
    </div>
  );
}
