import { Star } from "@/components/ui/stars";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type FakeCommentType = {
  stars: number;
  name: string;
  comment: string;
  id: number;
};

const fakeData = {
  stars: 5,
  name: "Sarah M.",
  comment:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis minima magni nisi amet! Quas perferendis consequuntur perspiciatis assumenda. Iusto sed corrupti asperiores harum veniam explicabo ratione architecto, inventore suscipit beatae.",
};

const fakeDatas: FakeCommentType[] = Array.from(Array(5), (_, index) => {
  return { ...fakeData, id: index };
});

function TestimonialsSection() {
  const [nowIndex, setNowIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [maxSteps, setMaxSteps] = useState(0);
  const [maxCardOnScreen, setMaxCardOnScreen] = useState(0);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const gapSize = 20;
  const fullTranslateWidth = gapSize + cardWidth;

  useEffect(function () {
    function updateTransition() {
      const cardRect = cardRef.current?.getBoundingClientRect();
      if (cardRect === null) return;
      setCardWidth(cardRect!.width);
      console.log(cardRect);
    }
    updateTransition();

    window.addEventListener("resize", updateTransition);
    return function () {
      window.removeEventListener("resize", updateTransition);
    };
  }, []);

  useEffect(
    function () {
      function calMaxCard() {
        const eachCardWidth = cardWidth + gapSize;
        const maxCardOnScreen = Math.floor(window.innerWidth / eachCardWidth);
        setMaxCardOnScreen(maxCardOnScreen);
        setMaxSteps(Math.ceil(fakeDatas.length / maxCardOnScreen));
        if (nowIndex >= maxSteps - 1) return 0;
        if (nowIndex <= 0) return Math.max(maxSteps - 1, 0);
      }
      calMaxCard();

      window.addEventListener("resize", calMaxCard);

      return function () {
        window.removeEventListener("resize", calMaxCard);
      };
    },
    [cardWidth],
  );

  function handleMoveNext() {
    setNowIndex((nowIndex) => {
      if (nowIndex >= maxSteps - 1) return 0;

      return nowIndex + 1;
    });
  }

  function handleMovePrev() {
    setNowIndex((nowIndex) => {
      if (nowIndex <= 0) return Math.max(maxSteps - 1, 0);

      return nowIndex - 1;
    });
  }

  return (
    <section>
      <div className="flex flex-row justify-between mx-18 mb-6">
        <h2 className="text-zinc-950 font-bold text-5xl uppercase">
          Our Happy Customer
        </h2>
        <div className="flex gap-4 items-center">
          <ArrowLeft
            height={62}
            onClick={handleMovePrev}
            className="cursor-pointer"
          />
          <ArrowRight
            height={62}
            onClick={handleMoveNext}
            className="cursor-pointer"
          />
        </div>
      </div>

      <div className="w-full h-100 overflow-hidden px-18">
        <div className="flex w-full h-100 gap-5  py-1">
          {fakeDatas.map((data, index) => (
            <div
              className="outline outline-zinc-200 p-5 rounded-3xl duration-300 transition-transform ease-in-out relative"
              key={data.id}
              style={{
                transform: `translateX(calc(${fullTranslateWidth}px * ${-nowIndex}) )`,
              }}
              ref={data.id === 0 ? cardRef : null}
            >
              <Star
                count={data.stars}
                widthSize={20}
                isShowNumber={false}
                className="text-yellow-300 mb-3"
              />
              <div className="flex items-center gap-2 rounded-3xl mb-2 w-100 grow-0 shrink-0 ">
                <span className="text-3xl font-bold mb-3">{data.name}</span>
                <span className="rounded-3xl bg-green-500 p-1 w-6 h-6 flex justify-center items-center">
                  <Check
                    className="inline text-white "
                    width={20}
                    height={20}
                  />
                </span>
              </div>
              <div className="text-zinc-400 text-lg">"{data.comment}"</div>
              <div
                className={`inset-0  ${index < nowIndex || index > nowIndex + maxCardOnScreen ? "disable" : ""} [&.disable]:opacity-90 opacity-0 bg-white absolute rounded-3xl duration-300 transition-opacity`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
