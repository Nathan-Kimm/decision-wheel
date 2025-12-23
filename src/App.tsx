import { useState } from "react";
import Wheel from "./components/Wheel";
import './App.css'

function App() {
  const [ options, setOptions ] = useState ([
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
    </>
  )
}

export default App
