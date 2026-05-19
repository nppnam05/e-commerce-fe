import FullStar from "@/assets/svgs/full-star.svg?react";
import HalfStar from "@/assets/svgs/half-star.svg?react";
import type React from "react";
interface StarInput extends React.SVGProps<SVGSVGElement> {
  count: number;
  widthSize: number;
  isShowNumber?: boolean;
}

export function Star({ isShowNumber = true, ...props }: StarInput) {
  const { count, widthSize, ...rest } = props;
  const heightSize = widthSize;
  const starsCount = Math.floor(count);
  const textSize = Math.floor((widthSize * 3) / 4);
  let isHalfStar = false;
  if (count - Math.floor(count) > 0) {
    isHalfStar = true;
  }

  return (
    <div className="flex flex-row gap-1 items-center">
      {Array.from(Array(starsCount), (_, i) => (
        <FullStar key={i} width={widthSize} height={heightSize} {...rest} />
      ))}

      {isHalfStar && (
        <HalfStar width={widthSize} height={heightSize} {...rest} />
      )}

      {isShowNumber && (
        <>
          <span className="text-zinc-950" style={{ fontSize: `${textSize}px` }}>
            {count}/
          </span>
          <span
            className=" text-zinc-400"
            style={{ fontSize: `${textSize}px` }}
          >
            5
          </span>
        </>
      )}
    </div>
  );
}
