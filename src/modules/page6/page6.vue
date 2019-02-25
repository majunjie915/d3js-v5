<template>
  <div class="tree">
    <svg width="960" height="600"></svg>
    <a href="./page5.html" class="pre">&lt;上一页</a>
  </div>
</template>

<script>
import * as d3 from 'd3';
export default {
  name: 'tree',
  data() {
    return {

    }
  },
  mounted() {
    this.tree();
  },
  methods: {
    tree() {
      let marge = {top: 50, right: 0, bottom: 0, left: 10};
      let svg = d3.select('svg');
      let width = svg.attr('width');
      let height = svg.attr('height');

      let g = svg.append('g')
                .attr('transfrom', `translate(${marge.top}, ${marge.left})`);

      let dataset = {
            name: '中国',
            children: [
              {
                name: '浙江',
                children: [
                  {name: '杭州' ,value: 100},
                  {name: '宁波',value: 100},
                  {name: '温州',value: 100},
                  {name: '绍兴',value: 100}
                ]
              },
              {
                name: '广西',
                children: [
                  {
                    name: '桂林',
                    children: [
                      {name: '秀峰区',value: 100},
                      {name: '叠彩区',value: 100},
                      {name: '象山区',value: 100},
                      {name: '七星区',value: 100}
                    ]
                  },
                  {name: '南宁',value: 100},
                  {name: '柳州',value: 100},
                  {name: '防城港',value: 100}
                ]
              },
              {
                name: '黑龙江',
                children: [
                  {name: '哈尔滨',value: 100},
                  {name: '齐齐哈尔',value: 100},
                  {name: '牡丹江',value: 100},
                  {name: '大庆',value: 100}
                ]
              },
              {
                name: '新疆' , 
                children: [
                  {name: '乌鲁木齐'},
                  {name: '克拉玛依'},
                  {name: '吐鲁番'},
                  {name: '哈密'}
                ]
              }
            ]
          };

      // 创建层级布局
      let hierarchyData = d3.hierarchy(dataset)
            .sum(function(d) {
              return d.value;
            });

      // 创建一个树状图
      let tree = d3.tree()
            .size([width - 400, height - 200])
            .separation(function(a, b) {
              return (a.parent == b.parent ? 1 : 2) / a.depth;
            });

      // 初始化树状图，得到绘制树的数据
      let treeData = tree(hierarchyData);

      // 得到边和节点
      let nodes = treeData.descendants();
      let links = treeData.links();

      // 输出边和节点
      console.log(nodes);
      console.log(links);

      // 创建一个贝塞尔生成曲线生成器
      let Bezier_curve_generator = d3.linkHorizontal()
            .x(function(d) {
              return d.y;
            })
            .y(function(d) {
              return d.x;
            })

      // 绘制边
      g.append('g')
        .selectAll('path')
        .data(links)
        .enter()
        .append('path')
        .attr('d', function(d) {
          // +40 的原因：149行
          let start = {x: d.source.x, y: d.source.y + 40};
          let end = {x: d.target.x, y: d.target.y + 40};
          return Bezier_curve_generator({source: start, target: end});
        })
        .attr('fill', 'none')
        .attr('stroke', 'gray')
        .attr('stroke-width', 1);

      // 创建用来放每个节点和对应文字的返组 g
      let gs = g.append('g')
                .selectAll('g')
                .data(nodes)
                .enter()
                .append('g')
                .attr('transform', function(d) {
                  // +40 的原因：149行
                  return `translate(${d.y + 40}, ${d.x})`;
                })

      // 绘制节点和文字
      gs.append('circle')
        .attr('r', 6)
        .attr('fill', 'white')
        .attr('stroke', 'blue')
        .attr('stroke-width', 1);

      gs.append('text')
        .attr('x', function(d) {
          return d.children ? -40 : 8;
        })
        .attr('y', -5)
        .attr('dy', 10)
        .text(function(d) {
          return d.data.name
        });
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
</style>
