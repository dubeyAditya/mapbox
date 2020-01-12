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
body, #root {
  height: 100vh;
}

#map{
  height: inherit;
}

</style>
