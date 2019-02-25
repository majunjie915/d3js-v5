<template>
  <div class="force-directed-graph">
    <svg class="svg" width="900" height="800"></svg>
    <a href="./page3.html" class="pre">&lt;上一页</a>
    <a href="./page6.html" class="next">下一页&gt;</a>
  </div>
</template>

<script>
import * as d3 from 'd3';
export default {
  name: 'force-directed-graph',
  data() {
    return {

    }
  },
  mounted() {
    this.forceDirectedGraph();
  },
  methods: {
    forceDirectedGraph() {
      let marge = {top: 20, right: 20, bottom: 20, left: 20};
      let svg = d3.select('svg');
      let width = svg.attr('width');
      let height = svg.attr('height');
      let g = svg.append('g')
                .attr('transform', `translate(${marge.top}, ${marge.left})`);

      // 准备数据
      let nodes = [ // 节点集
                    {name: '湖南邵阳'},
                    {name: '山东莱州'},
                    {name: '广东阳江'},
                    {name: '山东枣庄'},
                    {name: '泽'},
                    {name: '恒'},
                    {name: '鑫'},
                    {name: '明山'},
                    {name: '班长'}
                  ];

      // 边集  source、target 线段的两端，分别于 nodes 的下标对应；relation 是 source 和 target 的关系；value 设置线段的长度。
      let edges = [
                    {source: 0, target: 4, relation: '籍贯',value: 1.3},
                    {source: 4, target: 5, relation: '舍友',value: 1},
                    {source: 4, target: 6, relation: '舍友',value: 1},
                    {source: 4, target: 7, relation: '舍友',value: 1},
                    {source: 1, target: 6, relation: '籍贯',value: 2},
                    {source: 2, target: 5, relation: '籍贯',value: 0.9},
                    {source: 3, target: 7, relation: '籍贯',value: 1},
                    {source: 5, target: 6, relation: '同学',value: 1.6},
                    {source: 6, target: 7, relation: '朋友',value: 0.7},
                    {source: 6, target: 8, relation: '职责',value: 2}
                  ];

      // 设置比例尺
      let colorScale = d3.scaleOrdinal()
            .domain(d3.range(nodes.length))
            .range(d3.schemeCategory10); // schemeCategory10 颜色分类 10种颜色

      // 新建一个力导向图
      let forceSimulation = d3.forceSimulation()
            .force('link', d3.forceLink()) // 为仿真添加指定 name 的 force(力学模型) 并返回仿真
            .force('charge', d3.forceManyBody())
            .force('center', d3.forceCenter());

      // 生成节点数据
      forceSimulation.nodes(nodes)
        .on('tick', function() { // 监听 tick 事件来不断更新图形系统
          links.attr('x1', function(d) { return d.source.x; })
              .attr('y1', function(d) { return d.source.y })
              .attr('x2', function(d) { return d.target.x })
              .attr('y2', function(d) { return d.target.y });

          linksText.attr('x', function(d) {
                return (d.source.x + d.target.x) / 2;
              })
              .attr('y', function(d) {
                return (d.source.y + d.target.y) / 2;
              });

          gs.attr('transform', function(d) {
            return `translate(${d.x}, ${d.y})`;
          });
        });

      // 生成边数据
      forceSimulation.force('link') // 称为 弹簧模型
        .links(edges) // 根据 link distance 将有关联的两个节点拉近或者推远
        .distance(function(d) {
          return d.value * 160;
        })

      // 设置图形中心位置
      forceSimulation.force('center')
        .x(width / 2)
        .y(height / 2);

      // 输出顶点和边集
      console.log(nodes);
      console.log(edges);

      // 绘制边
      let links = g.append('g')
            .selectAll('line')
            .data(edges)
            .enter()
            .append('line')
            .attr('stroke', function(d, i) {
              return colorScale(i);
            })
            .attr('stroke-width', 1);

      // 绘制边上的文字
      let linksText = g.append('g')
            .selectAll('text')
            .data(edges)
            .enter()
            .append('text')
            .text(function(d, i) {
              return d.relation;
            });

      // 建立用来放每个节点和对应文字的分组 g
      let gs = g.selectAll('.circleText')
            .data(nodes)
            .enter()
            .append('g')
            .attr('transform', function(d) {
              return `translate(${d.x}, ${d.y})`;
            })
            .call(d3.drag()
                    .on('start', function(d) {
                      if(!d3.event.active){
                        forceSimulation.alphaTarget(0.8).restart(); // 设置衰减系数，对节点位置移动过程的模拟，数值越高移动越快，数值范围[0，1]
                      }
                      d.fx = d.x;
                      d.fy = d.y;
                    })
                    .on('drag', function(d) {
                      d.fx = d3.event.x;
                      d.fy = d3.event.y;
                    })
                    .on('end', function(d) {
                      if(!d3.event.active){
                        forceSimulation.alphaTarget(0);
                      }
                      d.fx = null;
                      d.fy = null;
                    })
            );

      // 绘制节点
      gs.append('circle')
        .attr('r', 10)
        .attr('fill', function(d, i) {
          return colorScale(i);
        })

      // 绘制文字
      gs.append('text')
        .attr('x', -10)
        .attr('y', -20)
        .attr('dy', 10)
        .text(function(d) {
          return d.name;
        })
    },
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
