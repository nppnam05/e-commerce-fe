interface LabelInput extends React.HtmlHTMLAttributes<HTMLDivElement> {
  name: string;
  price: string;
  variant: "primary" | "secondary";
}

export default function Label({ name, price, variant, className }: LabelInput) {
  const variantsName = {
    primary: "text-zinc-900",
    secondary: "text-zinc-400",
  };

  const variantsPrice = {
    primary: "text-2xl",
    secondary: "text-xl",
  };

  return (
    <div className={`flex h-fit w-full justify-between ${className}`}>
      <span className={`text-xl ${variantsName[variant]}`}>{name}</span>
      <span className={`font-bold ${variantsPrice[variant]}`}>{price}</span>
    </div>
  );
}
