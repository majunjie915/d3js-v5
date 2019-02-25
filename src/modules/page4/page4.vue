<template>
  <div class="pie-chart">
    <svg width="600" height="600"></svg>
    <a href="./page3.html" class="pre">&lt;上一页</a>
    <a href="./page5.html" class="next">下一页&gt;</a>
  </div>
</template>

<script>
import * as d3 from 'd3';
export default {
  name: 'pieChart',
  data() {
    return {

    }
  },
  mounted() {
    this.pieChart();
  },
  methods: {
    pieChart() {
      let marge = {top: 60, right: 60, bottom: 60, left: 60};
      let svg = d3.select('.pie-chart').select('svg');
      let width = svg.attr('width');
      let height = svg.attr('height');
      let g = svg.append('g')
                .attr('transform', `translate(${marge.top}, ${marge.left})`);
      let dataset = [30, 10, 43, 55, 13];

      // 设置 color 的颜色比例尺，为了让不同的扇形呈现不同的颜色
      let colorScale = d3.scaleOrdinal()
                        .domain(d3.range(dataset.length))
                        .range(d3.schemeCategory10);

      // 新建一个饼状图
      let pie = d3.pie();

      // 新建一个弧形生成器
      let innerRadius = 0; // 内半径
      let outerRadius = 100; //外半径
      let arc_generator = d3.arc()
              .innerRadius(0)
              .outerRadius(100);

      // 将原始数据变成可以绘制饼状图的数据
      let pieData = pie(dataset);
      console.log(pieData);

      // 开始绘制
      let gs = g.selectAll('g')
                .data(pieData)
                .enter()
                .append('g')
                .attr('transform', `translate(${width / 2}, ${height / 2})`);

      // 绘制饼状图的各个扇形
      gs.append('path')
        .attr('d', function(d) {
          return arc_generator(d);
        })
        .attr('fill', function(d, i) {
          return colorScale(i);
        })

      // 绘制文字
      gs.append('text')
        .attr('transform', function(d) { // 位置设在中心处
          return `translate(${arc_generator.centroid(d)})`;
        })
        .attr('text-anchor', 'middle')
        .text(function(d) {
          return d.data;
        })
    }
  }
}
</script>

<style scoped>
.pre {
  position: fixed;
  bottom: 60px;
  left: 40px;;
}
.next {
  position: fixed;
  bottom: 60px;
  right: 40px;;
}
</style>

