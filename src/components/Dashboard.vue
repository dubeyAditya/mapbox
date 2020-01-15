<template>
	<DataTable></DataTable>
	<!-- <div id="map-container">
		<div>
			<MapBox :name="type" :features="getMapFeatures" :fields="getFields" @onLayerClick="onLayerClick" />
		</div>
	</div> -->
</template>

<script>
import MapBox from './MapBox';
import DataTable from './DataTable';
import locality from '../json/locality.json';
import pincode from '../json/pincode.json';
export default {
	name: 'Dashboard',
	props: ['type'],
	data() {
		return {
			locality: locality,
			pincode: pincode
		};
	},
	computed: {
		getMapFeatures() {
			return this[this.type]['features'];
		},
		getFields() {
			return this[this.type]['fields'];
		}
	},
	components: {
		MapBox,
		DataTable
	},
	methods: {
		onLayerClick(attributes) {
			alert(JSON.stringify(attributes, null, 4));
		}
	},
	created() {
		// eslint-disable-next-line no-console
		console.log(this);
	}
};
</script>

<style>
#map-container {
	/* display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-auto-flow: row;
	grid-gap: 1rem; */
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 60vh;
}
</style>
