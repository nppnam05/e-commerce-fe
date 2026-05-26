import { Search } from "lucide-react";

export const SearchComponent = () => {
  return (
    <div className="my-5 flex rounded-4xl border-1 border-b-gray-500 bg-[#F5F6FA] p-2.5">
      <Search className="me-3 h-5 w-5 text-zinc-500" />
      <input
        type="text"
        placeholder="Search"
        className="w-full placeholder-zinc-500 outline-none"
      />
    </div>
  );
};
