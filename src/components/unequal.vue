<template>
  <div class="unequal">
    <h3>{{descript}}</h3>
    <ul class="items">
      <li>item1</li>
      <li>item2</li>
      <li>item3</li>
    </ul>
    <ul class="elements">
      <li>element1</li>
      <li>element2</li>
      <li>element3</li>
      <li>element4</li>
      <li>element5</li>
    </ul>
  </div>
</template>

<script>
import * as d3 from 'd3';
export default {
  name: 'unequal',
  data() {
    return {
      descript: '对选择集的操作结果：数据集大于选择集的部分叫做 enter,小于的部分叫做 exit,相等的部分叫 update'
    }
  },
  mounted() {
    this.changeAdd();
    this.changeMinus();
  },
  methods: {
    // update 与 enter 的使用
    changeAdd() {
      let dataset = [3, 2, 5, 7, 9];
      // select 到哪个元素，append 时添加的元素就是哪个元素的子元素
      let lis = d3.select('.unequal').select('.items').selectAll('li');
      let update = lis.data(dataset);
      let enter = update.enter();

      update.text(function(d, i) {
        return `update: ${d}, index: ${i}`;
      })

      let liEnter = enter.append('li');
      liEnter.text(function(d, i) {
        return `enter: ${d}, index: ${i}`;
      })
    },
    changeMinus() {
      let dataset = [3, 6];
      let lis = d3.select('.unequal').select('.elements').selectAll('li');
      let update = lis.data(dataset);
      let exit = update.exit();

      update.text(function(d, i) {
        return `updata: ${d}, index: ${i}`;
      })

      exit.text(function(d, i) {
        return 'exit';
      })
    }
  }
}
</script>

<style scoped>
.unequal {
  text-align: left;
}
</style>


