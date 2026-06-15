import { useState } from "react";

export function DoubleRange() {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(100);
  const [range] = useState(10);

  function handleChangeValue1(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    if (parseFloat(e.target.value) > value2 - range) {
      setValue1(value2 - range);
      return;
    }

    setValue1(parseFloat(e.target.value));
  }

  function handleChangeValue2(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    if (value1 > parseFloat(e.target.value) - range) {
      setValue2(value1 + range);
      return;
    }

    setValue2(parseFloat(e.target.value));
  }

  return (
    <div>
      <div className="relative h-5 w-full">
        <div
          className="absolute top-1/2 left-0 h-1 w-full -translate-y-1/2 bg-blue-900"
          style={{
            background: `linear-gradient(to right, #dbeafe, #dbeafe ${value1}%,#1c1917 ${value1}%, #1c1917 ${value2}%, #dbeafe ${value2}%, #dbeafe)`,
          }}
        ></div>
        <input
          type="range"
          name="range"
          value={value1}
          onChange={handleChangeValue1}
          min="0"
          max="100"
          className="pointer-events-none absolute inset-0 w-full appearance-none [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer"
        />
        <input
          type="range"
          name="range"
          value={value2}
          onChange={handleChangeValue2}
          min="0"
          max="100"
          className="pointer-events-none absolute inset-0 w-full appearance-none"
        />
      </div>
      <div className="relative h-5 w-full">
        <div
          className="absolute top-0 right-2 bottom-0 left-2"
          style={{ transform: `translate(${value1}%, 0)` }}
        >
          <span
            className="absolute"
            style={{ transform: "translate(-50%, 0)" }}
          >
            {value1}
          </span>
        </div>
        <div
          className="absolute top-0 right-2 bottom-0 left-2"
          style={{ transform: `translate(${value2}%, 0)` }}
        >
          <span
            className="absolute"
            style={{ transform: "translate(-50%, 0)" }}
          >
            {value2}
          </span>
        </div>
      </div>
    </div>
  );
}
