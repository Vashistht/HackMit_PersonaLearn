import React from 'react'
import Header2 from './Header2'; 
import Main from "./Main"
import LineChart from "./LineChart"
//import * as d3 from 'd3'

const App = () => {


  return (
    <div>
      <Header2/>
      <Main/>
      <LineChart width={400} height={300} />
    </div>
  )
}

export default App