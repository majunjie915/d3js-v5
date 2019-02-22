<template>
  <div class="data-bind">
    <h3>{{disceipt}}</h3>
    <ul class="elements">
      <li>element1</li>
      <li>element2</li>
      <li>element3</li>
    </ul>
    <ul class="items">
      <li>item1</li>
      <li>item2</li>
      <li>item3</li>
    </ul>
  </div>
</template>

<script>
import * as d3 from 'd3';
export default {
  name: 'data-bind',
  data() {
    return {
      disceipt: 'd3 中数据绑定有两个函数，分别为 data() 和 datum()：data() 将数组帮到选择集上，数组各项和选择集个元素绑定，一一对应；datum() 将一个数据绑定到所有选择集上。'
    }
  },
  mounted() {
    this.datumBind();
    this.dataBind();
  },
  methods: {
    datumBind() {
      let str = 'is an element';
      let lis = d3.select('.elements').selectAll('li');

      lis.datum(str)
        .text(function(d, i) {
          return `第${i}个元素 ${d}${i+1}`;
        })
    },
    dataBind() {
      let dataset = ['pig', 'dog', 'cat'];
      let lis = d3.select('.items').selectAll('li');

      lis.data(dataset)
        .text(function(d, i) {
          return `第${i}个元素 item${i+1} 替换成 ${d}`;
        })
    }
  }
}
</script>

<style scoped>
.data-bind {
  padding: 0 20px;
  text-align: left;
}
</style>


