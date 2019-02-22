<template>
  <div class="page3">
    <Histogram />
    <a href="./page2.html" class="pre">&lt;上一页</a>
    <a href="./page4.html" class="next">下一页&gt;</a>
  </div>
</template>

<script>
import Histogram from '../../components/histogram.vue';

export default {
  name: 'app',
  components: {
    Histogram,
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
