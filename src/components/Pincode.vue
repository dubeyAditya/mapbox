<template>
  <div>
    <MapBox
      :name="'poincode'"
      :features="pinCode.features"
      :fields="pinCode.fields"
      @onLayerClick="onLayerClick"
    />
  </div>
</template>

<script>
import MapBox from "./MapBox";
import pincode from "../json/pincode.json";

export default {
  name: "Pincode",
  data() {
    return {
      pinCode: pincode,
    };
  },
  components: {
    MapBox,
  }
};
</script>