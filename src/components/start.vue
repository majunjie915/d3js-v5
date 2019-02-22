<template>
  <div class="start">
    <h3>{{msg}}</h3>
    <p></p>
    <p></p>
  </div>
</template>

<script>
import * as d3 from "d3"
export default {
  name: 'start',
  data() {
    return {}
  },
  props: {
    msg: String
  },
  mounted() {
    this.start();
  },
  methods: {
    start() {
      let p = d3.select('.start').selectAll('p');
      p.text('Hello world');
    }
  }
}
</script>

