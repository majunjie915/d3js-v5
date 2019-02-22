<template>
  <div class="chart">
    <h3>{{title1}}</h3>
    <svg class="svg1"></svg>
    <svg class="svg2" width="350" height="300"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3';
export default {
  name: 'chart',
  data() {
    return {
      title1: '这是一个简单的图表'
    }
  },
  mounted() {
    this.chart1();
    this.scaleLinear();
    this.scaleOrdinal();
    this.chart2();
  },
  methods: {
    chart1() {
      let merge = {
        top: 20,
        bottom: 60,
        left: 20,
        right: 60
      };
      let dataset = [250, 210, 170, 130, 90];

      let svg = d3.select('.svg1')
                  .attr('width', 300)
                  .attr('height', 300);
      let g = svg.append('g')
                .attr('transform', `translate(${merge.top}, ${merge.left})`);
      let rectHeight = 30;

      g.selectAll('rect')
        .data(dataset)
        .enter()
        .append('rect')
        .attr('x', 20)
        .attr('y', function(d, i) {
          return i * rectHeight;
        })
        .attr('width', function(d) {
          return d;
        })
        .attr('height', rectHeight - 5)
        .attr('fill', 'blue');
    },
    // 运用比例尺后生成的图表
    // 线性比例尺
    scaleLinear() {
      let dataset = [1.2, 2.3, 0.8, 1.4, 3.3];
      let min = d3.min(dataset);
      let max = d3.max(dataset);
      let scaleLinear = d3.scaleLinear()
            .domain([min, max])
            .range([0, 300]);

      document.write(`scaleLinear(1)输出：${scaleLinear(1)}`);
      d3.select('body').append('br');
      document.write(`scaleLinear(2)输出：${scaleLinear(2)}`);
      d3.select('body').append('br');
      document.write(`scaleLinear(3)输出：${scaleLinear(3.3)}`);
      d3.select('body').append('br');
    },
    // 序列比例尺
    scaleOrdinal() {
      let index = [0, 1, 2, 3, 4];
      let color = ['red', 'blue', 'yellow', 'black', 'green'];
      let scaleOrdinal = d3.scaleOrdinal()
            .domain(index)
            .range(color);

        d3.select('body').append('br');//换行
        document.write('scaleOrdinal(1)输出：'+scaleOrdinal(1));
        d3.select('body').append('br');//换行
        document.write('scaleOrdinal(2)输出：'+scaleOrdinal(2));
        d3.select('body').append('br');
        document.write('scaleOrdinal(4)输出：'+scaleOrdinal(4));
    },
    // 利用比例尺生成图表
    chart2() {
      let marge = {top: 20, bottom: 20, left: 20, right: 20};
      let dataset = [2.5, 2.1, 1.7, 1.3, 0.9];

      let scaleLinear = d3.scaleLinear()
            .domain([0, d3.max(dataset)])
            .range([0, 300]);

      let svg = d3.select('.svg2');
      let g = svg.append('g')
                .attr('transform', `translate(${marge.top}, ${marge.left})`);

      let rectHeight = 30;

      g.selectAll('rect')
        .data(dataset)
        .enter()
        .append('rect')
        .attr('x', 20)
        .attr('y', function(d, i) {
          return i * rectHeight;
        })
        .attr('width', function(d) {
          return scaleLinear(d);
        })
        .attr('height', rectHeight - 5)
        .attr('fill', 'green');

      // 定义坐标轴
      let xAxis = d3.axisBottom(scaleLinear)
                    .ticks(7); // 设置刻度数目

      g.append('g')
        .attr('transform', `translate(20, ${(dataset.length) * rectHeight})`)
        .call(xAxis);
    }
  }
}
</script>

