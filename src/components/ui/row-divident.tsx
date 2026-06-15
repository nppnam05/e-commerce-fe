interface RowDivident extends React.HtmlHTMLAttributes<HTMLDivElement> {}

export function RowDivident({ className }: RowDivident) {
  return <div className={`h-px w-full bg-black/20 ${className}`}></div>;
}
