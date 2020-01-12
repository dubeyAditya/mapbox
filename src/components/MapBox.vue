<template>
  <div :id="name"></div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import mapboxMixin from "../mixins/mapbox.mixin";

export default {
  name: "MapBox",
  props: ["name", "features"],
  mixins: [mapboxMixin],
  data() {
    return {
      title: "Map Box GL Demo",
      map: null
    };
  },
  methods: {
    onMapLoad() {
      this.addSourceToMap();
      this.addLayersToMap();
    },
    addSourceToMap() {
      const { name } = this;
      const features = this.buildFeatureCollection();
      this.map.addSource(name, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: features
        }
      });
    },
    addLayersToMap() {
      const { name } = this;
      this.map.addLayer({
        id: `${name}_area`,
        source: name,
        type: "fill",
        paint: {
          "fill-color": "#3688ff",
          "fill-opacity": 0.2,
          "fill-outline-color": "#3688ff"
        }
      });

      this.map.addLayer({
        id: `${name}_boundries`,
        source: name,
        type: "line",
        paint: {
          "line-color": "#3688ff",
          "line-width": 2
        }
      });
    },
    buildFeatureCollection() {
      const { features } = this;
      return features.map(localityDetails => {
        return {
          type: "Feature",
          properties: localityDetails.attributes,
          geometry: {
            type: "Polygon",
            coordinates: localityDetails.geometry.rings
          }
        };
      });
    },
    onLayerClick(e) {
     // const map = this.map;
      const attributes = e.features[0].properties;
      // new mapboxgl.Popup()
      //   .setLngLat(e.lngLat)
      //   .setHTML("<div>Hello</div>")
      //   .addTo(map);
      this.$emit("onLayerClick", attributes);
    }
  },
  mounted() {
    const { name } = this;
    const { mapOptions, onLayerClick, onMapLoad } = this;
    mapOptions.container = name;
    this.map = new mapboxgl.Map(mapOptions);
    this.map.on("click", `${name}_area`, onLayerClick);
    this.map.on("load", onMapLoad);
  },
  destroyed() {
    const { name } = this;
    this.map.off("click", `${name}_area`);
  }
};
</script>

<style>
.mapboxgl-popup {
  max-width: 400px;
  font: 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
}
</style>