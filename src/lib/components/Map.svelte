<script>
	import { geoMercator } from 'd3';
	import { feature } from 'topojson-client';
	import { Chart, Svg, GeoPath, Text, Transform } from 'layerchart';
	import country from '$lib/data/india_ls_seats_545.json';
	import { cubicOut } from 'svelte/easing';
	import TransformControls from './TransformControls.svelte';
	import { selectedConstituency } from '$lib/store';
	import { setConstituency, slugify } from '$lib/utils';
	let hovered = null;
	const states = feature(country, country.objects.india_ls_seats_545);

	let transform = Transform;
</script>

<main
	class="border-[1px] border-surface-300 p-6 relative overflow-clip h-[500px] w-full max-w-[900px]"
>
	<div class=" absolute top-2 right-2">
		<TransformControls {transform} />
	</div>
	<Chart
		geo={{
			projection: geoMercator,
			fitGeojson: states
		}}
	>
		<Svg>
			<Transform
				bind:this={transform}
				scroll="scale"
				tweened={{ duration: 800, easing: cubicOut }}
				let:zoomTo
				let:reset={resetZoom}
				let:scale
			>
				<g class="states">
					{#each states.features as feature}
						<GeoPath
							on:click={() => setConstituency(feature.properties.ls_seat_name)}
							on:mousemove={() => (hovered = feature)}
							on:mouseleave={() => (hovered = null)}
							geojson={feature}
							class=" fill-surface-200 hover:cursor-pointer stroke-neutral-50 stroke-[0.1px]  
                            {$selectedConstituency &&
							$selectedConstituency.ls_seat_name != null &&
							$selectedConstituency.ls_seat_name === slugify(feature.properties.ls_seat_name)
								? 'fill-neutral-50'
								: 'fill-surface-200'} 
                            hover:fill-neutral-50"
						/>
					{/each}
				</g>
				<g class="labels pointer-events-none">
					{#each states.features as feature}
						<GeoPath geojson={feature} let:geoPath>
							{@const [x, y] = geoPath.centroid(feature)}
							{#if $selectedConstituency.ls_seat_name === slugify(feature.properties.ls_seat_name)}
								<Text
									{x}
									y={y - 10}
									value={feature.properties.ls_seat_name}
									textAnchor="middle"
									verticalAnchor="start"
									class="text-[14px] stroke-surface-100 [stroke-width:1px]"
								/>
							{/if}
						</GeoPath>
					{/each}
				</g>
			</Transform>
		</Svg>
	</Chart>
</main>
