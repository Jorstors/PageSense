interface LoaderProps {
  className?: string;
}

export function Loader({ className }: LoaderProps) {
  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-background z-50 ${className || ""}`}>
      <div className="loader" />
    </div>
  );
}
