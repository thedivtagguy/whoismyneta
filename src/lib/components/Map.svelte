<script>
	import { geoMercator } from 'd3';
	import { feature } from 'topojson-client';
	import { Chart, Svg, GeoPath, Text, Transform } from 'layerchart';
	import country from '$lib/data/india_ls_seats_545.json';
	import { fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { Field, SelectField, ToggleGroup, ToggleOption } from 'svelte-ux';
	import TransformControls from './TransformControls.svelte';
	let hovered = null;
	const states = feature(country, country.objects.india_ls_seats_545);

	let transform = Transform;
	let scrollMode = 'scale';
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
							on:click={() => (hovered = feature)}
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
			</Transform>
		</Svg>
	</Chart>
</main>
