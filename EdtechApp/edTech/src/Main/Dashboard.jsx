import React,{useState, useEffect} from 'react';
import transferGraphData from "../../../../HackMit_PersonaLearn-main/supplementary"

function Dashboard() {
  const [myData, setMyData] = useState(transferGraphData)
  
  return (
    <div>
        <h1>Dashboard</h1>
        <h1>Sidebar to track progress</h1>
    </div>
  )
}

export default Dashboard