<template>
      <MapBox
        :name="'locality'"
        :features="locality.features"
        :fields="locality.fields"
      />
</template>
<script>
import MapBox from './MapBox';
import locality from "../json/locality.json";
export default {
    name: 'Locality',
     data() {
    return {
      locality: locality,
    };
  },
  components: {
    MapBox
  }
}
</script>