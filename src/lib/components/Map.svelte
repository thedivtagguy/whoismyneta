<script>
	import { geoMercator } from 'd3';
	import { feature } from 'topojson-client';
	import { Chart, Svg, GeoPath, Text } from 'layerchart';
	import country from '$lib/data/india_ls_seats_545.json';

	let hovered = null;
	const states = feature(country, country.objects.india_ls_seats_545);
</script>

<main class="h-[80vh] w-full">
	<Chart
		geo={{
			projection: geoMercator,
			fitGeojson: states
		}}
	>
		<Svg>
			<g class="states">
				{#each states.features as feature}
					<GeoPath
						on:mousemove={() => (hovered = feature)}
						on:mouseleave={() => (hovered = null)}
						geojson={feature}
						class=" fill-surface-200 stroke-neutral-50 stroke-[0.1px] hover:fill-neutral-50"
					/>
				{/each}
			</g>
			<g class="labels pointer-events-none">
				{#each states.features as feature}
					<GeoPath geojson={feature} let:geoPath>
						{@const [x, y] = geoPath.centroid(feature)}
						{#if hovered === feature}
							<Text
								{x}
								y={y - 20}
								value={feature.properties.ls_seat_name}
								textAnchor="middle"
								verticalAnchor="top"
								class="text-[12px] stroke-surface-100 [stroke-width:2px]"
							/>
						{/if}
					</GeoPath>
				{/each}
			</g>
		</Svg>
	</Chart>
</main>
