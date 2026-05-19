import { Star } from "./stars";

export type ItemType = {
  image: string;
  name: string;
  stars: number;
  price: number;
};

export function Item({ image, name, stars, price }: ItemType) {
  return (
    <span className="w-fit flex flex-col justify-start items-start hover:bg-zinc-200 rounded cursor-pointer px-8 py-4">
      <img
        src={image}
        alt={name}
        className="object-fill rounded-2xl pb-2"
        width={300}
      />
      <span className="text-2xl text-zinc-950 font-bold pb-1">{name}</span>
      <Star count={stars} widthSize={20} className="text-yellow-700 pb-1" />
      <span className="text-3xl text-zinc-950 font-bold">{price} $</span>
    </span>
  );
}
