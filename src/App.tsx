import { useState } from "react";
import Wheel from "./components/Wheel";
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

  // H1 Winner is temp
  return (
    <>
      <h1> george wheel </h1>
      <Wheel options={options} onSelect={setWinner} />  
      <h1>Winner: {winner ?? "-"}</h1>
    </>
  )
}

export default App
