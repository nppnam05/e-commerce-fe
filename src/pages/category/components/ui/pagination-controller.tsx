import { Button } from "@/components/ui/button";
import type { ValueChanged } from "@/types/value-change";
import type { VoidCallBack } from "@/types/void-call-back";
import { ArrowLeft, ArrowRight } from "lucide-react";
import colors from "tailwindcss/colors";

interface PaginationControllerInput {
  totalPages: number;
  className?: string;
  onChange: ValueChanged<number>;
  onPrevPage: VoidCallBack;
  onNextPage: VoidCallBack;
  value: number;
}

export default function PaginationController({
  totalPages,
  value,
  onPrevPage,
  onNextPage,
  onChange,
  className,
}: PaginationControllerInput) {
  const start = value - 2 > 1 ? value - 2 : 1;
  const end = start + 4 < totalPages ? start + 4 : totalPages;

  // export default function PaginationController() {
  return (
    <div className={`flex h-fit w-full flex-row justify-between ${className}`}>
      <Button
        className="flex flex-row items-center"
        size="sm"
        variant="primary"
        onClick={onPrevPage}
      >
        <ArrowLeft color={colors.zinc[900]} />{" "}
        <span className="text-zinc-900">Previous</span>
      </Button>
      <div className="flex grow flex-row justify-center gap-2">
        {Array.from(Array(end - start + 1), (_, index) => {
          return (
            <Button
              variant="primary-no-outline"
              size="sm"
              className={`${value === index + start ? "active" : ""}`}
              onClick={() => onChange(index + start)}
            >
              {index + start}
            </Button>
          );
        })}
      </div>
      <Button
        className="flex flex-row items-center"
        size="sm"
        variant="primary"
        onClick={onNextPage}
      >
        <span className="text-zinc-900">Next</span>
        <ArrowRight color={colors.zinc[900]} />{" "}
      </Button>
    </div>
  );
}
