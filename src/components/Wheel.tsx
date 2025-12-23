import { useState } from "react";
import "./Wheel.css";

type WheelProps = {
  options: string[];
  onSelect: (option: string) => void;
};

export default function Wheel({ options, onSelect }: WheelProps) {
  const [rotation, setRotation] = useState(0);

  const spin = () => {
    const winnerIndex = Math.floor(Math.random() * options.length);
    const sliceAngle = 360 / options.length;
    const targetRotation = 360 + (options.length - winnerIndex) * sliceAngle;

    setRotation(targetRotation);

    setTimeout(() => {
      onSelect(options[winnerIndex]);
    }, 4000);
  };

  return (
    <div className="wheel-container">
      <div className="wheel" style={{ transform: `rotate(${rotation}deg)` }}>
        {options.map((option, index) => (
          <div
            key={option}
            className="slice"
            style={{
              transform: `rotate(${index * (360 / options.length)}deg)`,
            }}
          >
            <span>{option}</span>
          </div>
        ))}
      </div>
      <button onClick={spin}>
        spin
      </button>
    </div>
  );
}
