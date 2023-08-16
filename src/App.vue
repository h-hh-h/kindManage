<template>
  <div id="app">
    <router-view></router-view>
    <!-- <Layout></Layout> -->
  </div>
</template>

<script>
import Layout from './views/layout'

export default {
  name: 'App',
  components: {
    Layout
  }
}
</script>

<style>
#app{
  
}
#app p{
  margin-top: 0px;
}
</style>
