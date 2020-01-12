<template>
  <div id="root">
    <Dashboard />
  </div>
</template>

<script>
import Dashboard from './components/Dashboard.vue'
export default {
  name: 'AppContainer',
  components: {
    Dashboard
  }
}
</script>

<style>
/* @import 'https://api.mapbox.com/mapbox-gl-js/v1.6.1/mapbox-gl.css'; */
body, #root {
  height: 100vh;
}

#map{
  height: inherit;
}

</style>
