import { Button } from "@/components/ui/button";
import { SearchComponent } from "@/components/ui/search-component";
import { useNavigate } from "react-router-dom";

interface TopBarProps {
  searchValue?: string;
  onSearchChange?: (val: string) => void;
}

export const TopBar = ({ searchValue, onSearchChange }: TopBarProps) => {
  const navigate = useNavigate();
  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard/product");
  };

  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-white">
      <div className="ms-15 w-96">
        <SearchComponent value={searchValue} onChange={onSearchChange} />
      </div>
      <div className="me-15">
        <Button
          variant="custom"
          className="bg-blue-600 text-white hover:bg-blue-700"
          onClick={handleNavigate}
        >
          <span>Add Product</span>
        </Button>
      </div>
    </div>
  );
};
