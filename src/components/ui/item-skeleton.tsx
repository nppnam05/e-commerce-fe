export function ItemSkeleton() {
  return (
    <span className="flex w-fit cursor-pointer flex-col items-start justify-start gap-4 rounded px-8 py-4 hover:bg-zinc-200">
      <div className="h-75 w-75 rounded-3xl bg-zinc-400"></div>
      <div className="h-6 w-40 rounded-3xl bg-zinc-400"></div>
      <div className="h-5 w-30 rounded-3xl bg-zinc-400"></div>
      <div className="h-7 w-15 rounded-3xl bg-zinc-400"></div>
    </span>
  );
}
