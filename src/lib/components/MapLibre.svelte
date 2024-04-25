<script>
	import {
		MapLibre,
		ZoomRange,
		GeoJSON,
		FillLayer,
		LineLayer,
		SymbolLayer,
		zoomTransition
	} from 'svelte-maplibre';
	import { feature } from 'topojson-client';
	import { geoCentroid } from 'd3';
	import indianStatesRaw from '$lib/data/states_india.json';
	import constituenciesRaw from '$lib/data/india_ls_seats_545.json';
	import { setConstituency } from '$lib/utils';
	import { selectedConstituency } from '$lib/store';

	const excludeSeats = ['Akbarpur', 'Rest of J&K', 'Rest of Ladakh'];

	let constituencies = feature(constituenciesRaw, constituenciesRaw.objects.india_ls_seats_545);

	let indianStates = feature(indianStatesRaw, indianStatesRaw.objects.states_india);

	function calculateCenters(g) {
		let centers = g.features.map((f) => {
			return {
				...f,
				geometry: {
					type: 'Point',
					coordinates: geoCentroid(f)
				}
			};
		});

		return {
			type: 'FeatureCollection',
			features: centers
		};
	}

	const stateCenters = calculateCenters(indianStates);
	const countyCenters = calculateCenters(constituencies);

	let zoomThreshold = 5;
	let currentZoom = 4;

	$: console.log($selectedConstituency);
</script>

<MapLibre
	style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
	class="w-full h-[680px]"
	standardControls
	center={[78, 20]}
	zoom={4}
	on:zoomend={({ detail: { map } }) => (currentZoom = map.getZoom())}
>
	<ZoomRange maxzoom={zoomThreshold}>
		{@const fadeStates = zoomTransition(zoomThreshold - 1, 1, zoomThreshold + 1, 0)}
		{@const fadeStatesText = zoomTransition(zoomThreshold - 1, 1, zoomThreshold, 0.2)}
		<GeoJSON id="states" data={indianStates} promoteId="GEOID">
			<FillLayer
				paint={{
					'fill-color': 'green',
					'fill-opacity': fadeStates
				}}
			/>

			<LineLayer
				paint={{
					'line-color': 'white',
					'line-width': 1,
					'line-opacity': fadeStates
				}}
			/>
		</GeoJSON>

		<GeoJSON id="state-centers" data={stateCenters} promoteId="GEOID">
			<SymbolLayer
				filter={['!=', ['get', 'State_Name'], 'DC']}
				paint={{
					'text-color': '#333',
					'text-opacity': fadeStatesText,
					'text-halo-color': '#eee',
					'text-halo-width': 0.5,
					'text-halo-blur': 0.5
				}}
				layout={{
					'text-allow-overlap': true,
					'text-field': ['get', 'STUSPS'],
					'text-size': zoomTransition(3, 16, 5, 24)
				}}
			/>
		</GeoJSON>
	</ZoomRange>

	<ZoomRange minzoom={zoomThreshold - 0.5}>
		{@const fadeCounties = zoomTransition(zoomThreshold - 0.5, 0, zoomThreshold + 0.5, 0.8)}
		{@const fadeCountiesText = zoomTransition(zoomThreshold, 0.2, zoomThreshold + 0.5, 1)}
		{@const isSelected =
			$selectedConstituency.ls_seat_name === e.detail.features[0].properties.ls_seat_name}
		<GeoJSON id="counties" data={constituencies} promoteId="GEOID">
			<FillLayer
				on:click={(e) => {
					if (!excludeSeats.includes(e.detail.features[0].properties.ls_seat_name)) {
						setConstituency(e.detail.features[0].properties.ls_seat_name);
					}
				}}
				paint={{
					'fill-color': isSelected ? 'red' : 'blue'
				}}
			/>

			<LineLayer
				paint={{
					'line-color': 'black',
					'line-width': 0.5,
					'line-opacity': fadeCounties
				}}
			/>
		</GeoJSON>

		<GeoJSON id="county-centers" data={countyCenters} promoteId="GEOID">
			<SymbolLayer
				paint={{
					'text-color': 'black',
					'text-opacity': fadeCountiesText
				}}
				layout={{
					'text-field': ['get', 'ls_seat_name'],
					'text-size': zoomTransition(5, 12, 10, 24)
				}}
			/>
		</GeoJSON>
	</ZoomRange>
</MapLibre>
