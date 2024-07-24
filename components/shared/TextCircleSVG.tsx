import React from "react";

const TextCircleSVG: React.FC = () => {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <style>
        {`
        .rotate {
          animation: rotate 20s linear infinite;
          transform-origin: center; /* Apply transform-origin using CSS */
        }
  
        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(90deg);
          }
          50% {
            transform: rotate(180deg);
          }
          75% {
            transform: rotate(270deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
  
        text {
          fill: white;
          text-transform: uppercase;
        }
      `}
      </style>
      <path
        id="textPath"
        d="M 85,0 A 85,85 0 0 1 -85,0 A 85,85 0 0 1 85,0"
        transform="translate(100,100)"
        fill="none"
        strokeWidth="0"
      ></path>
      <g fontSize="13.1px" className="rotate">
        <text textAnchor="start">
          <textPath className="coloring" xlinkHref="#textPath" startOffset="0%">
            Furniture &amp; Home Craft . Furniture &amp; Home Craft . Furniture
            &amp; Home Craft . Furniture &amp; Home Craft . Furniture &amp; Home
            Craft . Furniture &amp; Home Craft .
          </textPath>
        </text>
      </g>
    </svg>
  );
};

export default TextCircleSVG;
