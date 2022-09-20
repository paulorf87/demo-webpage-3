// MOCK DATA 
const data = [
    {date:"mon", value:50},
    {date:"tue", value:60},
    {date:"wed", value:100},
    {date:"thu", value:80},
    {date:"fri", value:60},
    {date:"sat", value:70},
    {date:"sun", value:30},
]

const balance = 800.48; 

// Dimensions 
const margins = {
        top:30, 
        right:30, 
        bottom:221, 
        left:60
}

const calcTotal = (data) => {
    let total = 0; 
    data.forEach(d=>{
        total = total + d.value;
    });

    return total; 
}

let width = 540 - margins.left - margins.right;
let height = 511 - margins.top - margins.bottom; 

const svg = d3.select(".canvas")
.append("svg")
.attr("width", width + margins.left + margins.right)
.attr("height",height + margins.bottom + margins.top); 

const canvas = svg.append("g")
.attr("transform",`translate(${margins.left},${margins.top})`);

// SCALES 
const xScale = d3.scaleBand()
.range([0,width])
.domain(data.map(d=>d.date))
.padding(0.2); 

const yScale = d3.scaleLinear()
.domain([0,120])
.range([height, 0]);

// AXES 
const xAxis = canvas.append("g")
.attr("transform",`translate(0,${height})`)
.call(d3.axisBottom(xScale))

xAxis.classed("x-axis", true);

const yAxis = canvas.append("g")
// .call(d3.axisLeft(yScale));

// BARGRAPH 
const bars = canvas.selectAll("rect")
.data(data)
.enter()
.append("rect")
    .on("mouseover", function(d,i){
        d3.select(this).style("opacity",0.5); 
    })
    .on("mouseout", function(d,i){
        d3.select(this).style("opacity",1)
        .append("div")
    })
    .attr("x", d=>xScale(d.date))
    .attr("y",d=>yScale(0))
    .attr("height",d=>height - yScale(0))
    .attr("width",xScale.bandwidth())
    .transition(1000)
    .delay(function(d,i){
        return i * 200; 
    })
    .attr("y", d=>yScale(d.value))
    .attr("height", d=> height - yScale(0))
    .attr("height", d=> height - yScale(d.value))
    .attr("fill",d=>{
        const max = d3.max(data, d=>d.value); 
        if(d.value===max) {
            return "var(--accent)";
        } else {
            return "var(--secondary)";
        }
    }).attr("rx","2");

    
d3.select(".balance").append("text").text(`$${balance}`);

