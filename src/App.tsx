import { useEffect, useState } from "react";
import Wheel from "./components/Wheel";
import { Winner } from "./modal";
import './App.css'

function App() {
  const [ options] = useState ([
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
  ]) ;

  const [winner, setWinner] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (winner) {
      const id = setTimeout(() => setShowModal(true), 500);
      return () => clearTimeout(id);
    }
    setShowModal(false);
  }, [winner]);

  return (
    <>
      <h1> george wheel </h1>
      <Wheel options={options} onSelect={setWinner} />  
      <Winner visible={showModal}>
        <h1>winner: {winner ?? "-"}</h1>
        <button onClick={() => setWinner(null)}>Close</button>
      </Winner>
    </>
  )
}

export default App
