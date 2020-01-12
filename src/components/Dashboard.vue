<template>
  <div id="map-container">
    <div> <MapBox :name="'locality'" :features="localityFeatures" @onLayerClick="onLayerClick"/></div>
    <div> <MapBox :name="'poincode'" :features="pinCodeFeatures" @onLayerClick="onLayerClick"/></div>
  </div>
</template>

<script>
import MapBox from "./MapBox";
import locality from "../json/locality.json";
import pincode from "../json/pincode.json";
export default {
  name: "Dashboard",
  data(){
    return {
      localityFeatures: locality.features,
      pinCodeFeatures: pincode.features
    }
  },
  components: {
    MapBox
  },
  methods:{
    onLayerClick(attributes){
        alert(JSON.stringify(attributes,null,4))
    }
  }
};
</script>

<style>
#map-container{
  display: grid;
  grid-template-columns: repeat(2,1fr);
  grid-auto-flow: row;
  grid-gap: 1rem;
  height: 60vh;
}
</style>