import * as d3 from 'd3'

async function main() {
  const data = await d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json")

  const h = 550
  const w = 800
  const padding = 100

  const svg = d3.select('.container')
    .append('svg')
    .attr('height', h)
    .attr('width', w)

  svg.append('text')
    .text('Doping in Professional Bicycle Racing')
    .attr('x', '50%')
    .attr('y', 50)
    .attr('text-anchor', 'middle')
    .attr('font-family', 'sans-serif')
    .attr('font-size', 20)
    .attr('id', 'title')

  svg.append('text')
    .text("35 Fastest times up Alpe d'Huez")
    .attr('x', '50%')
    .attr('y', 70)
    .attr('text-anchor', 'middle')
    .attr('font-family', 'sans-serif')
    .attr('id', 'legend')

  const tooltip = d3.select('.container')
    .append('div')
    .attr('id', 'tooltip')
    .text('test')

  const convTime = timeStr => (new Date(`2000-01-01 00:${timeStr}`))
  const timeFmt = d3.timeFormat('%M:%S')

  const xScale = d3.scaleLinear()
    .domain([d3.min(data, d => d.Year), d3.max(data, d => d.Year)])
    .range([padding, w - padding])

  const yScale = d3.scaleTime()
    .domain([convTime(data[0].Time), convTime(data[data.length - 1].Time)])
    .range([padding, h - padding])

  const xAxis = d3.axisBottom(xScale)
    .tickFormat(d3.format(''))

  const yAxis = d3.axisLeft(yScale)
    .tickFormat(timeFmt)

  svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => xScale(d.Year))
    .attr('cy', d => yScale(convTime(d.Time)))
    .attr('r', 5)
    .style('opacity', 0.5)
    .attr('fill', 'black')
    .attr('class', 'dot')
    .attr('data-xvalue', d => d.Year)
    .attr('data-yvalue', d => convTime(d.Time))
    .on('mouseenter', (e, d) => {
      console.log(tooltip)
      tooltip.text(d.Name)
        .attr('data-year', d.Year)
        .style('top', e.pageY - 30 + 'px')
        .style('left', e.pageX + 'px')
        .style('display', 'block')
    })
    .on('mouseleave', () => {
      tooltip.style('display', 'none')
    })

  svg.append('g')
    .call(xAxis)
    .attr('transform', `translate(0, ${h - padding})`)
    .attr('id', 'x-axis')

  svg.append('g')
    .call(yAxis)
    .attr('transform', `translate(${padding}, 0)`)
    .attr('id', 'y-axis')
}

main()
