<template>
  <div id="root">
    <Dashboard />
  </div>
</template>

<script>
import Dashboard from './components/Dashboard.vue';

export default {
  name: 'AppContainer',
  components: {
    Dashboard,
  }
}
</script>

<style>
body, #root {
  height: 98vh;
}

#map{
  height: inherit;
}

</style>
