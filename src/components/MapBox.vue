<template>
  <div :id="name"></div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import mapboxMixin from "../mixins/mapbox.mixin";
export default {
  name: "MapBox",
  props: ["name", "features", "fields"],
  mixins: [mapboxMixin],
  data() {
    return {
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
      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(this.getContent(e.features[0].properties))
        .addTo(this.map);
      // this.$emit("onLayerClick", );
    },
    getContent({pincode, locality, households, population }) {
      return this.name === 'locality' 
          ? `<table>
                     <thead>
                        <th>Locality </th>
                        <th>Population</th>
                        <th>Households</th>
                     </thead> 
                    <tbody>
                       <tr>
                         <td>${locality}</td>
                         <td>${population}</td>
                         <td>${households}</td>
                       </tr>
                    </tbody>
            </table>`
          :
            `<table>
                     <thead>
                        <th>Pincode </th>
                        <th>Population</th>
                        <th>Households</th>
                     </thead> 
                    <tbody>
                       <tr>
                         <td>${pincode}</td>
                         <td>${population}</td>
                         <td>${households}</td>
                       </tr>
                    </tbody>
            </table>`

    }
  },
  mounted() {
    const { mapOptions, onLayerClick, onMapLoad } = this;
    const layerName = `${this.name}_area`;
    mapOptions.container = this.name;

    this.map = new mapboxgl.Map(mapOptions);

    this.map.on("click", layerName, onLayerClick);
    this.map.on("load", onMapLoad);

    this.map.on("mouseenter", layerName, () => {
      this.map.getCanvas().style.cursor = "pointer";
    });

    this.map.on("mouseleave", layerName, () => {
      this.map.getCanvas().style.cursor = "";
    });
  },
  destroyed() {
    this.map.off("click", `${this.name}_area`);
  }
};
</script>

<style>

.mapboxgl-map {
  overflow: unset;

}

.header {
  display: grid;
  grid-column-gap: 5px;
}
</style>