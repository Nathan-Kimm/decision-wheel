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

  return (
    <>
      <h1> george wheel </h1>
      <Wheel options={options} onSelect={setWinner} />  
      <h1>winner: {winner ?? "-"}</h1>
    </>
  )
}

export default App
