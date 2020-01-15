<template>
	<div id="app">
		<v-app>
			<v-app-bar app color="primary accent-4" dark>
				<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
				<v-toolbar-title>Locality Reports</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-btn icon>
					<v-icon>mdi-magnify</v-icon>
				</v-btn>
				<v-menu left bottom>
					<template v-slot:activator="{ on }">
						<v-btn icon v-on="on">
							<v-icon>mdi-dots-vertical</v-icon>
						</v-btn>
					</template>
					<v-list>
						<v-list-item v-for="n in 5" :key="n" @click="() => {}">
							<v-list-item-title>Option {{ n }}</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>
			</v-app-bar>

			<v-navigation-drawer v-model="drawer" absolute temporary>
				<v-list-item>
					<v-list-item-avatar>
						<v-img src=""></v-img>
					</v-list-item-avatar>

					<v-list-item-content>
						<v-list-item-title>Reports</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

				<v-divider></v-divider>

				<v-list dense>
					<v-list-item v-for="item in items" :key="item.title" link>
						<v-list-item-icon>
							<v-icon>{{ item.icon }}</v-icon>
						</v-list-item-icon>

						<v-list-item-content @click="loadReport(item.id)">
							<v-list-item-title>{{ item.title }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list>
			</v-navigation-drawer>

			<v-content>
				<Dashboard :type="type" />
			</v-content>

			<v-footer class="pa-3">
				<v-spacer></v-spacer>
				<div>&copy; {{ new Date().getFullYear() }}</div>
			</v-footer>
		</v-app>
	</div>
</template>

<script>
import Dashboard from './components/Dashboard.vue';
export default {
	name: 'AppContainer',
	data() {
		return {
			drawer: false,
			items: [
				{ title: 'Locality', id: 'locality', icon: 'mdi-home' },
				{ title: 'Pincode', id: 'pincode', icon: 'mdi-question_answer' }
			],
			type: 'locality'
		};
	},
	components: {
		Dashboard
	},
	methods: {
		loadReport(id) {
			this.type = id;
			this.drawer = false;
		}
	}
};
</script>

<style>
/* @import 'https://api.mapbox.com/mapbox-gl-js/v1.6.1/mapbox-gl.css'; */
body,
#root {
	height: 100vh;
}

#map {
	height: inherit;
}
</style>
