<template>
  <div id="map-container">
    <nav class="nav-bar-container">
      <router-link to="/pincode"><span class="nav-bar-link">Pincode</span></router-link>
      <router-link to="/locality"><span class="nav-bar-link">Locality</span></router-link>
    </nav>
    <section>
       <router-view></router-view>
    </section>
  </div>
</template>

<script>

export default {
  name: "Dashboard",

};
</script>

<style>
#map-container {
  display: grid;
   grid-template-columns: 8rem auto;
  height: 95vh;
  grid-gap: 1rem;
  padding: 2rem;
}


.nav-bar-container{
  display: flex;
  flex-direction: column;
  flex-basis: 1rem;

}

</style>