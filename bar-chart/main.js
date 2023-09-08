import * as d3 from 'd3'

async function main() {
  const dataset = (await d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')).data

  const w = 1000
  const h = 500
  const padding = 50

  const svg = d3.select('.container')
    .append('svg')
    .style('width', w)
    .style('height', h)

  const tooltip = d3.select('.container')
    .append('div')
    .html('Year<br>GDP')
    .attr('id', 'tooltip')

  const xScale = d3.scaleTime()
    .domain([new Date(dataset[0][0]), new Date(dataset[dataset.length - 1][0])])
    .range([padding, w - padding])

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, d => d[1])])
    .range([h - padding, padding])

  const xAxis = d3.axisBottom(xScale)
  const yAxis = d3.axisLeft(yScale)

  svg.append('g')
    .call(xAxis)
    .attr('transform', `translate(0, ${h - padding})`)
    .attr('id', 'x-axis')

  svg.append('g')
    .call(yAxis)
    .attr('transform', `translate(${padding}, 0)`)
    .attr('id', 'y-axis')

  svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('height', d => h - padding - yScale(d[1]))
    .attr('width', (w - padding * 2) / dataset.length)
    .attr('x', d => xScale(new Date(d[0])))
    .attr('y', d => yScale(d[1]))
    .attr('class', 'bar')
    .attr('data-date', d => d[0])
    .attr('data-gdp', d => d[1])
    .on('mouseenter', (e, d) => {
      tooltip.html(`${d[0]}<br>$${d[1]}B`)
        .style('display', 'block')
        .style('top', e.pageY - 70 + 'px')
        .style('left', e.pageX - 75 + 'px')
        .attr('data-date', d[0])
    })
    .on('mouseleave', () => {
      tooltip.style('display', 'none')
    })

  svg.append('text')
    .text('GDP of the United States')
    .attr('x', '50%')
    .attr('y', 48)
    .attr('text-anchor', 'middle')
    .attr('font-family', 'sans-serif')
    .attr('font-size', 24)
    .attr('id', 'title')
}

main()