<script>
	import {
		geoMercator,
		scaleQuantile,
		scaleOrdinal,
		schemePurples,
		schemeGreens,
		schemePuRd,
		schemeObservable10
	} from 'd3';
	import { feature } from 'topojson-client';
	import { Chart, GeoPoint, Svg, GeoPath, Text, Transform } from 'layerchart';
	import country from '$lib/data/india_ls_seats_545.json';
	import { cubicOut } from 'svelte/easing';
	import TransformControls from './TransformControls.svelte';
	import { selectedConstituency } from '$lib/store';
	import { setConstituency, slugify } from '$lib/utils';
	import data from '$lib/data/data.json';
	import ToggleMap from './ToggleMap.svelte';
	let hovered = null;
	const states = feature(country, country.objects.india_ls_seats_545);

	let transform = Transform;

	let category = {
		all: {
			key: 'all',
			type: 'all',
			label: 'All'
		},
		assets: {
			key: 'total_assets',
			label: 'Total Assets',
			type: 'number',
			scheme: schemePurples[5]
		},
		criminalCases: {
			key: 'criminal_cases',
			type: 'number',
			label: 'Criminal Cases',
			scheme: schemeGreens[5]
		},
		attendance: {
			key: 'attendance',
			type: 'number',
			label: 'Attendance',
			scheme: schemePuRd[5]
		},
		education: {
			key: 'education_x',
			type: 'categorical',
			label: 'Education',
			scheme: schemeObservable10
		}
	};
	let selectedCategory = category.all;
	let numericColorScale, categoricalColorScale;

	$: if (selectedCategory.key != 'all') {
		numericColorScale = scaleQuantile()
			.domain(data.map((d) => d[selectedCategory.key]))
			.range(selectedCategory.scheme);

		categoricalColorScale = scaleOrdinal()
			.domain(data.map((d) => d[selectedCategory.key]))
			.range(selectedCategory.scheme);
	}

	$: colorScale =
		selectedCategory.type === 'all'
			? null
			: selectedCategory.type === 'number'
				? numericColorScale
				: categoricalColorScale;
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
							fill={colorScale
								? colorScale(
										data.find((d) => d.ls_seat_name === feature.properties.ls_seat_name)[
											selectedCategory.key
										]
									)
								: '#ECEFF4'}
							style="fill-opacity:0.5"
							class="{$selectedConstituency &&
							$selectedConstituency.ls_seat_name === feature.properties.ls_seat_name
								? 'fill-neutral-900'
								: ''} hover:cursor-pointer 
                                {colorScale ? 'stroke-neutral-800' : 'stroke-neutral-50'}
                                stroke-[0.2px]  
                            
                            hover:fill-neutral-50"
						/>
					{/each}
				</g>
				<g class="labels pointer-events-none">
					{#each states.features as feature}
						<GeoPath geojson={feature} let:geoPath>
							{@const [x, y] = geoPath.centroid(feature)}
							{#if $selectedConstituency && $selectedConstituency.ls_seat_name === feature.properties.ls_seat_name}
								<Text
									{x}
									y={y - 20}
									value={feature.properties.ls_seat_name}
									textAnchor="middle"
									verticalAnchor="start"
									class="text-[14px] stroke-surface-100 stroke-[2px] shadow-md"
								/>
							{/if}
						</GeoPath>
					{/each}
				</g>
			</Transform>
		</Svg>
	</Chart>
</main>

<ToggleMap on:change={(e) => (selectedCategory = category[e.detail.value])} options={category} />
