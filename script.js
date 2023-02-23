function buildBarChart() {

    const height = 550;
    const width = 600;
    const margin = { left: 50, right: 50, top: 50, bottom: 50 };
  
    // Constants for scaling the visualizations
    const visHeight = height - margin.top - margin.bottom;
    const visWidth = width - margin.left - margin.right;
  
    const bar = d3.select("#bar")
      .append("svg")
      .attr("height", height)
      .attr("width", width)
      .attr("class", "frame");
  
    // Read data from CSV file
    d3.csv("./data/data.csv").then((data) => {
      // Set up scales
      const maxY = d3.max(data, (d) => parseInt(d.Value));
      const xScale = d3.scaleBand()
        .domain(data.map((d) => d.Category))
        .range([0, visWidth]);
      const yScale = d3.scaleLinear()
        .range([visHeight, 0])
        .domain([0, maxY]);
  
      // Create bars
      const bars = bar.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => xScale(d.Category) + margin.left)
        .attr("y", (d) => yScale(d.Value) + margin.top)
        .attr("width", xScale.bandwidth() - 5)
        .attr("height", (d) => visHeight - yScale(d.Value))
        .style("fill", "steelblue");
  
      // Add x-axis
      const xAxis = d3.axisBottom(xScale).ticks(10);
      bar.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(${margin.left}, ${margin.top + visHeight})`)
        .call(xAxis);
  
      // Add y-axis
      const yAxis = d3.axisLeft(yScale).ticks(10);
      bar.append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .call(yAxis);
    });
  }
  
  window.onload = buildBarChart;
