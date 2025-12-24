import { useState } from "react";
import "./Wheel.css";
import "./button.css";

type WheelProps = {
  options: string[];
  onSelect: (option: string) => void;
};

export default function Wheel({ options, onSelect }: WheelProps) {
  const [rotation, setRotation] = useState(0);

  const spin = () => {
    const winnerIndex = Math.floor(Math.random() * options.length);
    const sliceAngle = 360 / options.length;
    const desiredAngle = (options.length - winnerIndex) * sliceAngle;
    const baseSpins = 10; 

    setRotation((prev) => {
      const currentAngle = ((prev % 360) + 360) % 360; 
      const alignDelta = (desiredAngle - currentAngle + 360) % 360;
      return prev + baseSpins * 360 + alignDelta;
    });

    setTimeout(() => {
      onSelect(options[winnerIndex]);
    }, 4000);
  };

  const sliceAngle = 360 / options.length;
  const labelEdgeOffsetDeg = 20; // small margin from the sector edge
  const palette = ["#A7A7A7", "#98D2C6", "#ea8a9a"];
  const gradient = `conic-gradient(${options
    .map((_, index) => {
      const start = (index * 100) / options.length;
      const end = ((index + 1) * 100) / options.length;
      const color = palette[index % palette.length];
      return `${color} ${start}% ${end}%`;
    })
    .join(", ")})`;

  return (
    <div className="wheel-container">
      <div
        className="wheel"
        style={{
          transform: `rotate(${rotation}deg)`,
          background: gradient,
          ["--slice-angle"]: `${sliceAngle}deg`,
        } as React.CSSProperties}
      >
        {options.map((option, index) => {
          const endAngle = (index + 1) * sliceAngle;
          const labelAngle = endAngle - labelEdgeOffsetDeg;
          return (
            <div
              key={option}
              className="wheel-label"
              style={{ transform: `translateX(var(--label-radius, 95%)) rotate(${-labelAngle}deg)` }}
            >
              <span>{option}</span>
            </div>
          );
        })}
        <div className="wheel-mid-hide" />
      </div>
      <div className="wheel-pointer"></div>
      <button className="spin" onClick={spin}>
        spin
      </button>
    </div>
  );
}
