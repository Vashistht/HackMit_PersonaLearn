import * as d3 from 'd3'
import React,{useEffect,useState} from 'react'

function LineChart(props) {
    const [data, setData] = useState([{}])
    useEffect(() => {
    fetch('/graph').then(
        response => response.json()
    ).then(
        res => {if (data.length > 1) {drawGraph()} else {setData(res['points'])}}
    )
    },[data]);

    const drawGraph = () => {
        console.log("Function start")
        const margin = {top : 10, right: 50, bottom: 50, left: 50}
        const width = 400
        const height = 400
    
        const yMin = d3.min(data, d => d.y)
        const yMax = d3.max(data, d => d.y)
        const xMin = d3.min(data, d => d.x)
        const xMax = d3.max(data, d => d.x)

        const svg = d3
          .select('#container')
          .append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr('transform', `translate(${margin.left},${margin.top})`);
    
        // create scale for the x axis
        const xScale = d3
        .scaleLinear()
        .domain([xMin, xMax])
        .range([0, width]);
      
        // create scale for y axis
        const yScale = d3
        .scaleLinear()
        .range([height, 0])
        .domain([yMin, yMax]);
    
        // Create x grid
        svg
          .append('g')
          .attr('class', 'grid')
          .attr('transform', `translate(0,${height})`)
          .call(
          d3.axisBottom(xScale)
              .tickSize(-height)
              .tickFormat(''),
          );
    
        // create y grid
        svg
          .append('g')
          .attr('class', 'grid')
          .call(
              d3.axisLeft(yScale)
              .tickSize(-width)
              .tickFormat(''),
          );
    
        // create the x axis on the bottom
        svg
          .append('g')
          .attr('class', 'x-axis')
          .attr('transform', `translate(0,${height})`)
          .call(d3.axisBottom().scale(xScale).tickSize(15));
    
        // create the y axis on the left
        svg
          .append('g')
          .attr('class', 'y-axis')
          .call(d3.axisLeft(yScale));
    
    
        const line = d3
          .line()
          .x(d => xScale(d.x))
          .y(d => yScale(d.y))
          .curve(d3.curveMonotoneX);
    
        svg
          .append('path')
          .datum(data)
          .attr('fill', 'none')
          .attr('stroke', '#0394fc')
          .attr('stroke-width', 4)
          .attr('class', 'line') 
          .attr('d', line);
    }

    return (
        <div>
        <h4> Line Chart </h4>
        <div id="container" />
        </div>
    )
}

export default LineChart