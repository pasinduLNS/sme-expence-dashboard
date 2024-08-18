import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function ExpenseChart({ expenses }) {
    const chartRef = useRef();

    useEffect(() => {
        if (expenses.length === 0) return;

        const svg = d3.select(chartRef.current)
            .attr('width', 800)
            .attr('height', 400)
            .style('background', '#f4f4f4')
            .style('margin-top', '50px');

        const xScale = d3.scaleBand()
            .domain(expenses.map(d => d.category))
            .range([0, 800])
            .padding(0.4);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(expenses, d => d.amount)])
            .range([400, 0]);

        const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

        const bars = svg.selectAll('.bar')
            .data(expenses)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => xScale(d.category))
            .attr('y', d => yScale(d.amount))
            .attr('width', xScale.bandwidth())
            .attr('height', d => 400 - yScale(d.amount))
            .attr('fill', d => colorScale(d.category));

        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        svg.append('g')
            .attr('transform', 'translate(0, 400)')
            .call(xAxis);

        svg.append('g')
            .call(yAxis);

    }, [expenses]);

    return <svg ref={chartRef}></svg>;
}

export default ExpenseChart;
