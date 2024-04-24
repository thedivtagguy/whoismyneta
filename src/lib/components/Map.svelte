<script>
	import {
		geoMercator,
		scaleQuantile,
		scaleOrdinal,
		schemeOrRd,
		schemeBlues,
		schemeGreens,
		schemeTableau10,
		format,
		scaleLinear,
		range,
		scaleThreshold,
		formatLocale
	} from 'd3';
	import { feature } from 'topojson-client';
	import { Chart, Legend, Svg, GeoPath, Text, Transform } from 'layerchart';
	import country from '$lib/data/india_ls_seats_545.json';
	import { cubicOut } from 'svelte/easing';
	import TransformControls from './TransformControls.svelte';
	import { selectedConstituency } from '$lib/store';
	import { setConstituency, slugify } from '$lib/utils';
	import data from '$lib/data/data.json';
	import ToggleMap from './ToggleMap.svelte';
	import { generateTickValues } from '$lib/utils';
	let hovered = null;
	const states = feature(country, country.objects.india_ls_seats_545);

	let colorScale;
	let numericColorScale, categoricalColorScale;
	let transform = Transform;

	let assetsTicks = generateTickValues(data, 5, 'total_assets');
	let attendanceTicks = generateTickValues(data, 5, 'attendance');
	let criminalCasesTicks = generateTickValues(data, 5, 'criminal_cases');

	let category = {
		all: {
			key: 'all',
			type: 'all',
			label: 'All',
			color: 'bg-surface-100',
			text: 'black'
		},
		assets: {
			key: 'total_assets',
			label: 'Declared Assets',
			type: 'number',
			scheme: schemeOrRd[7],
			intervals: ['0-210cr', '210-420cr', '420-630cr', '630+ cr'],
			color: 'bg-orangePrimary',
			text: 'white',
			tickValues: assetsTicks,
			format: (d) => '₹' + parseInt(d / 10000000, 10) + ' cr'
		},
		criminalCases: {
			key: 'criminal_cases',
			type: 'number',
			label: 'Criminal Cases',
			scheme: schemeBlues[6],
			color: 'bg-bluePrimary',
			tickValues: criminalCasesTicks,
			text: 'white'
		},
		attendance: {
			key: 'attendance',
			type: 'number',
			label: 'Attendance',
			tickValues: attendanceTicks,
			scheme: schemeGreens[5],
			color: 'bg-sagePrimary',
			text: 'white',
			format: (d) => parseInt(d, 10) + '%'
		},
		education: {
			key: 'education_x',
			type: 'categorical',
			label: 'Education',
			scheme: schemeTableau10,
			color: 'bg-yellowPrimary',
			text: 'black'
		}
	};
	let selectedCategory = category.all;

	$: if (selectedCategory && selectedCategory.key != 'all' && selectedCategory.type === 'number') {
		numericColorScale = scaleQuantile(selectedCategory.scheme).domain(selectedCategory.tickValues);
	}
	if (selectedCategory && selectedCategory.type === 'number') {
		numericColorScale.range(['#f7fbff', '#08519c']); // Adjust the range of colors here
	}
	$: if (
		selectedCategory &&
		selectedCategory.key != 'all' &&
		selectedCategory.type === 'categorical'
	) {
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

	$: tickValues = selectedCategory.tickValues;
</script>

<div class="overflow-auto">
	<ToggleMap on:change={(e) => (selectedCategory = category[e.detail.value])} options={category} />
</div>

<main
	class="border-[1px] border-surface-300 p-6 relative overflow-clip h-[650px] w-full max-w-[900px]"
>
	<div class="absolute top-2 right-2">
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
				scroll="scale"
				bind:this={transform}
				tweened={{ duration: 800, easing: cubicOut }}
				let:zoomTo
				let:reset={resetZoom}
				let:scale
			>
				<g class="states">
					{#each states.features as feature}
						<GeoPath
							on:click={(e) => {
								const { geoPath, event } = e.detail;

								let [[left, top], [right, bottom]] = geoPath.bounds(feature);
								selectedCategory = category.all;
								setConstituency(feature.properties.ls_seat_name);
								let width = right - left;
								let height = bottom - top;
								let x = (left + right) / 2;
								let y = (top + bottom) / 2;
								const padding = 80;
								zoomTo({ x, y }, { width: width + padding, height: height + padding });
							}}
							on:mousemove={() => (hovered = feature)}
							on:mouseleave={() => (hovered = null)}
							geojson={feature}
							stroke-width={0.4 / scale}
							stroke="#8F96A3"
							fill={colorScale
								? colorScale(
										data.find((d) => d.ls_seat_name === feature.properties.ls_seat_name)[
											selectedCategory.key
										]
									)
								: '#ECEFF4'}
							style="fill-opacity:0.8"
							class="{$selectedConstituency &&
							$selectedConstituency.ls_seat_name === feature.properties.ls_seat_name
								? 'fill-neutral-900'
								: ''} hover:cursor-pointer 
                                                             
                            
                            hover:fill-neutral-50"
						/>
					{/each}
				</g>
				<g class="pointer-events-none labels">
					{#each states.features as feature}
						<GeoPath geojson={feature} let:geoPath>
							{@const [x, y] = geoPath.centroid(feature)}
							{#if $selectedConstituency && $selectedConstituency.ls_seat_name === feature.properties.ls_seat_name}
								<Text
									{x}
									scaleToFit
									y={y - 20}
									value={feature.properties.ls_seat_name}
									textAnchor="middle"
									verticalAnchor="start"
									class=" stroke-surface-100 font-serif  text-[5px] stroke-[2px] shadow-md"
								/>
							{/if}
						</GeoPath>
					{/each}
				</g>
			</Transform>
		</Svg>
		<div class="bg-white legend z-[1000]">
			{#if selectedCategory.type === 'categorical'}
				<Legend
					scale={colorScale}
					let:values
					let:scale
					classes={{
						root: 'bg-white z-[9000]'
					}}
					title={selectedCategory.label}
				>
					<div class="flex flex-col gap-1 bg-white">
						{#each values as value}
							{#if value !== undefined}
								{@const scaledValue = selectedCategory.valueScale
									? selectedCategory.valueScale[value]
									: value}
								<div class="flex items-center gap-1">
									<div class="rounded-full size-2" style:background-color={scale(scaledValue)} />
									<div class="text-xs text-surface-content/50">{value}</div>
								</div>
							{/if}
						{/each}
					</div>
				</Legend>
			{:else if selectedCategory.type === 'number'}
				<div class="legend">
					<Legend
						scale={colorScale}
						tickFormat={selectedCategory.format}
						classes={{
							root: 'bg-white  text-xs absolute py-2 px-4 rounded shadow-sm z-[9000]',
							label: 'anchor-end'
						}}
						title={selectedCategory.label}
					></Legend>
				</div>
			{/if}
		</div>
	</Chart>
</main>

<style>
	:global(.legend *) {
		text-anchor: end !important;
	}
</style>
