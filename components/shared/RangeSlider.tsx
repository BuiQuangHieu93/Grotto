import React, { useState } from "react";
import { Range, getTrackBackground } from "react-range";

interface RangeSliderProps {
  min: number;
  max: number;
  step: number;
  priceGap: number;
  values: number[];
  onChange: (values: number[]) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  step,
  priceGap,
  values,
  onChange,
}) => {
  const handleChange = (values: number[]) => {
    if (values[1] - values[0] >= priceGap) {
      onChange(values);
    }
  };

  return (
    <div className="p-4 bg-[#e9e8e4] rounded-lg shadow-md">
      <header className="mb-4">
        <p className="mt-1 text-sm">The highest price is $320.00</p>
      </header>
      <div className="flex justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span>$</span>
          <input
            type="number"
            value={values[0]}
            onChange={(e) =>
              handleChange([
                Math.min(Number(e.target.value), values[1] - priceGap),
                values[1],
              ])
            }
            className="w-32 p-2 border rounded text-center"
            min={min}
            max={max - priceGap}
            step={step}
          />
        </div>
        <div className="flex-center">
          <span>-</span>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={values[1]}
            onChange={(e) =>
              handleChange([
                values[0],
                Math.max(Number(e.target.value), values[0] + priceGap),
              ])
            }
            className="w-32 p-2 border rounded text-center"
            min={min + priceGap}
            max={max}
            step={step}
          />
        </div>
      </div>
      <Range
        values={values}
        step={step}
        min={min}
        max={max}
        onChange={handleChange}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            className="relative w-full h-2 bg-gray-200 rounded"
          >
            <div
              ref={props.ref}
              className="absolute w-full h-2 rounded"
              style={{
                background: getTrackBackground({
                  values,
                  colors: ["#ccc", "#17A2B8", "#ccc"],
                  min: min,
                  max: max,
                }),
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            className="w-5 h-5 bg-blue-500 rounded-full shadow-md focus:outline-none"
            style={{ ...props.style }}
          />
        )}
      />
    </div>
  );
};

export default RangeSlider;
