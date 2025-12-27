import { useEffect, useState } from "react";
import Wheel from "./components/Wheel";
import { Winner } from "./modal";
import confetti from "canvas-confetti";
import './App.css'

function App() {
  const [options] = useState([
    "tij",
    "matthew",
    "ben",
    "leo",
    "david",
    "will",
    "zane",
    "aadit",
    "rohan",
    "minh quan",
    "nathan",
  ]);

  const [winner, setWinner] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (winner) {
      const id = setTimeout(() => {
        setShowModal(true);
        confetti({
          particleCount: 300,
          spread: 360,
          origin: { y: 0.45 }
        });
      }, 200);
      return () => clearTimeout(id);
    }
    setShowModal(false);
  }, [winner]);

  return (
    <>
      <h1> george wheel </h1>
      <Wheel options={options} onSelect={setWinner} />
      <Winner visible={showModal}>
        <h1>winner: {winner ?? "-"} <span style={{ color: '#98D2C6' }}>!</span><span style={{ color: '#ea8a9a' }}>!</span> </h1>
        <button className="close-button" onClick={() => setWinner(null)}>
          ✖
        </button>

      </Winner>
    </>
  )
}

export default App
