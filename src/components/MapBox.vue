<template>
	<div :id="name"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import mapboxMixin from '../mixins/mapbox.mixin';
export default {
	name: 'MapBox',
	props: ['name', 'features', 'fields'],
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
				type: 'geojson',
				data: {
					type: 'FeatureCollection',
					features: features
				}
			});
		},
		addLayersToMap() {
			const { name } = this;
			this.map.addLayer({
				id: `${name}_area`,
				source: name,
				type: 'fill',
				paint: {
					'fill-color': '#3688ff',
					'fill-opacity': 0.2,
					'fill-outline-color': '#3688ff'
				}
			});

			this.map.addLayer({
				id: `${name}_boundries`,
				source: name,
				type: 'line',
				paint: {
					'line-color': '#3688ff',
					'line-width': 2
				}
			});
		},
		buildFeatureCollection() {
			const { features } = this;
			return features.map(localityDetails => {
				return {
					type: 'Feature',
					properties: localityDetails.attributes,
					geometry: {
						type: 'Polygon',
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
		getContent({ pincode, locality, households, population }) {
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
				: `<table>
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
            </table>`;
		}
	},
	mounted() {
		const { mapOptions, onLayerClick, onMapLoad } = this;
		const layerName = `${this.name}_area`;
		mapOptions.container = this.name;

		this.map = new mapboxgl.Map(mapOptions);

		this.map.on('click', layerName, onLayerClick);
		this.map.on('load', onMapLoad);

		this.map.on('mouseenter', layerName, () => {
			this.map.getCanvas().style.cursor = 'pointer';
		});

		this.map.on('mouseleave', layerName, () => {
			this.map.getCanvas().style.cursor = '';
		});
	},
	destroyed() {
		this.map.off('click', `${this.name}_area`);
	}
};
</script>

<style>
.mapboxgl-popup {
	position: absolute;
	top: 0;
	left: 0;
	display: -webkit-flex;
	display: flex;
	will-change: transform;
	pointer-events: none;
	max-width: 400px;
	font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
}

.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip {
	align-self: center;
	border-bottom: none;
	border-top-color: #fff;
}

.mapboxgl-popup-tip {
	width: 0;
	height: 0;
	border: 10px solid transparent;
	z-index: 1;
}

.mapboxgl-popup-anchor-bottom {
	flex-direction: column-reverse;
}

.mapboxgl-popup-close-button {
	position: absolute;
	right: 0;
	top: 0;
	border: 0;
	border-radius: 0 3px 0 0;
	cursor: pointer;
	background-color: transparent;
}

.mapboxgl-popup-content {
	position: relative;
	background: #fff;
	border-radius: 3px;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
	padding: 10px 10px 15px;
	pointer-events: auto;
}
</style>
