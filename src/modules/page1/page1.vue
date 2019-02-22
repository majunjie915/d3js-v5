<template>
  <div id="app">
    <Start msg="Welcome to Your Vue.js App"/>
    <Data-bind />
    <Unequal />
    <BaseOpt />
  </div>
</template>

<script>
import Start from '../../components/start.vue'
import DataBind from '../../components/dataBind.vue'
import Unequal from '../../components/unequal.vue'
import BaseOpt from '../../components/baseOpt.vue'

export default {
  name: 'app',
  components: {
    Start,
    DataBind,
    Unequal,
    BaseOpt
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
