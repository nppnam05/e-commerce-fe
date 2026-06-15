import { RowDivident } from "@/components/ui/row-divident";
import Label from "./label";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface SumaryPriceInput extends React.HtmlHTMLAttributes<HTMLDivElement> {}

export default function SumaryPrice({ className }: SumaryPriceInput) {
  return (
    <div
      className={`${className} flex flex-col gap-8 rounded-2xl px-4 py-4 outline outline-zinc-400`}
    >
      <div className="text-3xl font-bold">Order</div>
      <Label name="Subtotal" price="$565" variant="secondary" />
      <Label name="Delivery Fee" price="$15" variant="secondary" />
      <RowDivident />
      <Label name="Total" price="$467" variant="primary" />
      <Button variant="superBlack" size="lg">
        Go to checkout <ArrowRight className="inline" />
      </Button>
    </div>
  );
}
