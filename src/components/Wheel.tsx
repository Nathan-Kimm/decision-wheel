import { useState } from "react";
import "./Wheel.css";
import "./button.css";
import "./excludenames.css"

type WheelProps = {
  options: string[];
  onSelect: (option: string) => void;
};

export default function Wheel({ options, onSelect }: WheelProps) {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  //angle calculations
  const visibleOptions = options.filter((opt) => !selectedNames.includes(opt));
  const visibleSliceAngle = visibleOptions.length > 0 ? 360 / visibleOptions.length : 0;
  const sliceAngle = visibleSliceAngle;
  const initialOffset = -90 + sliceAngle / 2;
  const startAngle = -90;
  const palette = ["#A7A7A7", "#98D2C6", "#ea8a9a"];

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const winnerIndex = Math.floor(Math.random() * visibleOptions.length);
    const desiredAngle = (winnerIndex - 3) * sliceAngle + (Math.random() * sliceAngle);
    const baseSpins = 10;

    setRotation((prev) => {
      const currentAngle = ((prev % 360) + 360) % 360;
      const alignDelta = (desiredAngle - (currentAngle + initialOffset) + 360) % 360;
      return prev + baseSpins * 360 + alignDelta;
    });

    setTimeout(() => {
      onSelect(visibleOptions[winnerIndex]);
      setIsSpinning(false);
    }, 13500);
  };

  const gradient = `conic-gradient(${visibleOptions
    .map((_, index) => {
      const start = (index * 100) / visibleOptions.length;
      const end = ((index + 1) * 100) / visibleOptions.length;
      const color = palette[index % palette.length];
      return `${color} ${start}% ${end}%`;
    })
    .join(", ")})`;

  const handleNameClick = (name: string) => {
    if (isSpinning) return;
    setSelectedNames((prev) => {
      if (prev.includes(name)) {
        return prev.filter((n) => n !== name);
      } else {
        // Don't allow excluding if only 1 person remains
        if (visibleOptions.length <= 1) return prev;
        return [...prev, name];
      }
    });
  };



  return (
    <div className="wheel-overall-container">
      <div className="wheel-container">
        <div
          className="wheel"
          style={{
            transform: `rotate(${rotation + initialOffset}deg)`,
            background: gradient,
            ["--slice-angle"]: `${visibleSliceAngle}deg`,
          } as React.CSSProperties}
        >
          {visibleOptions.map((option, index) => {
            const labelAngle =
              startAngle + (index + 0.5) * sliceAngle;

            const canExclude = visibleOptions.length > 1 && !isSpinning;
            return (
              <div
                key={option}
                className="wheel-label"
                style={{transform: `rotate(${labelAngle}deg) translateX(var(--label-radius, 95%)) rotate(${-labelAngle}deg)` }}
              >
                <span
                  onClick={() => handleNameClick(option)}
                  style={{
                    cursor: canExclude ? "pointer" : "default",
                    pointerEvents: canExclude ? "auto" : "none"
                  }}
                  className={canExclude ? "" : "no-hover"}
                >
                  {option}
                </span>
              </div>
            );
          })}
          <div className="wheel-mid-hide" />
        </div>
        <div className="wheel-pointer" />

        <button className="spin" onClick={spin}>
          spin
        </button>
      </div>

      {selectedNames.length > 0 && (
        <div className="excluded-container">
          <h2>excluded</h2>
          <div className="excluded-names">
            {selectedNames.map((name) => (
              <div
                key={name}
                className={`excluded-name-box ${isSpinning ? 'no-hover' : ''}`}
                onClick={() => handleNameClick(name)}
                style={{
                  cursor: isSpinning ? "default" : "pointer",
                  pointerEvents: isSpinning ? "none" : "auto"
                }}
              >
                {name}
                <span className="remove-btn">✖</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
