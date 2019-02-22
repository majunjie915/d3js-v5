<template>
  <div class="baseOpt">
    <h3>{{message}}</h3>
    <ul class="items items1">
      <li>item1</li>
      <li>item2</li>
      <li>item3</li>
    </ul>
    <ul class="items items2">
      <li>item1</li>
      <li>item2</li>
      <li>item3</li>
    </ul>
    <ul class="items items3">
      <li class="item1">item1</li>
      <li class="item2">item2</li>
      <li class="item3">item3</li>
    </ul>
    <ul class="items items4">
      <li>item1</li>
      <li>item2</li>
      <li>item3</li>
      <li>item4</li>
    </ul>
    <ul class="items items5">
      <li>item1</li>
      <li class="item2">item2</li>
      <li>item3</li>
    </ul>
  </div>
</template>

<script>
import * as d3 from 'd3';
export default {
  name: 'baseOpt',
  data() {
    return {
      message: '选择、插入、删除元素',
    }
  },
  mounted() {
    this.selectOne();
    this.selectAll();
    this.selectAnyone();
    this.selectPlus();
    this.addEle();
    this.deletsEle();
  },
  methods: {
    selectOne() {
      let li = d3.select('.items1').select('li');

      li.style('color', 'red');
    },
    selectAll() {
      let lis = d3.select('.items2').selectAll('li');

      lis.style('color', 'red');
    },
    selectAnyone() {
      let li = d3.select('.items3').selectAll('.item2');

      li.style('color', 'red');
    },
    selectPlus() {
      // dataset 与 lis 长度不等时的处理方式在 unequal.vue 中
      let dataset = [3, 6, 9, 12];
      let lis = d3.select('.items4').selectAll('li')
                  .data(dataset)
                  .text(function(d, i) {
                    if (i == 3) {
                      d3.select(this).style('color', 'red');
                    }
                    return d;
                  })
    },
    addEle() {
      d3.select('.items5')
        .append('li') // 在选择集尾部插入元素
        .text('another item')
        .style('color', 'red');

      d3.select('.items5')
        .insert('li', '.item2') // 在选择集前面插入元素
        .text('insert an item')
        .style('color', 'red');
    },
    deletsEle() {
      d3.select('.items3').select('.item3').remove();
    }
  }
}
</script>

<style scoped>
.baseOpt .items {
  width: 100px;
  margin: 20px auto;
}
</style>

