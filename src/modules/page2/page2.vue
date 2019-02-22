<template>
  <div class="page2">
    <Chart />
    <a href="./page1.html" class="pre">&lt;上一页</a>
    <a href="./page3.html" class="next">下一页&gt;</a>
  </div>
</template>

<script>
import Chart from '../../components/chart.vue';

export default {
  name: 'app',
  components: {
    Chart,
  }
}
</script>

<style>
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
