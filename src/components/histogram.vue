<template>
  <div class="histogram">
    <h3>柱状图示例 :</h3>
    <svg class="svg1" width="600" height="350"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3';
export default {
  name: 'histogram',
  data() {
    return {

    }
  },
  mounted() {
    this.histogram();
  },
  methods: {
    histogram() {
      // 得到 svg 画布
      let marge = {top: 50,bottom: 50,left: 50,right: 50};
      let svg = d3.select('.svg1');
      let width = svg.attr('width');
      let height = svg.attr('height');
      let g = svg.append('g')
                .attr('transform', `translate(${marge.top}, ${marge.left / 2})`);

      // 数据集
      let dataset = [10, 20, 30, 23, 13, 40, 27, 35, 20];

      // 绘制坐标轴
      let xScale = d3.scaleBand()
                    .domain(d3.range(dataset.length))
                    .rangeRound([0, width - marge.left - marge.right]);

      let xAxis = d3.axisBottom(xScale);

      let yScale = d3.scaleLinear()
                    .domain([0, d3.max(dataset)])
                    .range([height - marge.top - marge.bottom, 0]);

      let yAxis = d3.axisLeft(yScale);

      g.append('g')
        .attr('transform', `translate(0, ${height - marge.top - marge.bottom})`)
        .call(xAxis);
      g.append('g')
        .attr('transform', `translate(0, 0)`)
        .call(yAxis);

      // 为每个矩形和对应的文字闯将一个分组 <g>
      let gs = g.selectAll('rect')
                .data(dataset)
                .enter()
                .append('g');

      // 绘制矩形
      let rectPadding = 20;
      gs.append('rect')
        .attr('x', function(d, i) {
          return xScale(i) + rectPadding /2;
        })
        .attr('y', function(d) { // 这里石要改变的，即初始状态
          let min = yScale.domain()[0];
          return yScale(min); // 可知这里返回的是最大值
        })
        .attr('width', function() {
          return xScale.step() - rectPadding;
        })
        .attr('height', function(d) { // 这里要改变，即初始状态
          return 0;
        })
        .transition() // 添加过渡
        .duration(2000)
        .delay(function(d, i) {
          return i * 400;
        })
        // .ease(d3.easeElasticInOut)
        .attr('y', function(d) { // 回到最终状态
          return yScale(d);
        })
        .attr('height', function(d) { // 回到最终状态
          return height - marge.top - marge.bottom - yScale(d);
        })
        .attr('fill', 'blue');

      // 绘制文字
      gs.append('text')
        .attr('x', function(d, i) {
          return xScale(i) + rectPadding / 2;
        })
        .attr('y', function(d) {
          let min = yScale.domain()[0];
          return yScale(min);
        })
        .attr('dx', function() {
          (xScale.step() - rectPadding) / 2;
        })
        .attr('dy', -5)
        .text(function(d) {
          return d;
        })
        .transition()
        .duration(2000)
        .delay(function(d, i) {
          return i * 400;
        })
        // .ease(d3.easeElasticInOut)
        .attr('y', function(d) {
          return yScale(d);
        })
        .attr('fill', 'red');

      // 绑定事件
      setTimeout(function() {
        gs.on('mouseover', function() {
              let rect = d3.select(this)
                        .select('rect')
                        .transition()
                        .duration(1500)
                        .attr('fill', 'yellow');
            })
            .on('mouseout', function() {
              let rect = d3.select(this)
                        .select('rect')
                        .transition()
                        .delay(1500)
                        .duration(1500)
                        .attr('fill', 'blue');
            })

      }, 2000)
    }
  }
}
</script>

