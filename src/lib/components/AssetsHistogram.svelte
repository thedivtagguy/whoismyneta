<script>
	import { sort, quantile, scaleLinear } from 'd3';
	import data from '$lib/data/data.json';
	import { formatRupee, textMultiline } from '$lib/utils';
	export let assets = 0;
	export let threshold = 10;

	// sort and get the quantiles of the data
	// sort and get the quantiles of the data
	let sortedData = sort(data, (a, b) => Number(a.total_assets) - Number(b.total_assets));
	let q1 = quantile(sortedData, 0.25, (d) => Number(d.total_assets));
	let median = quantile(sortedData, 0.5, (d) => Number(d.total_assets));
	let q3 = quantile(sortedData, 0.75, (d) => Number(d.total_assets));
	let interQuantileRange = q3 - q1;
	let min = q1 - 1.5 * interQuantileRange;
	let max = q3 + 1.5 * interQuantileRange;

	$: console.log(min, max, q1, median, q3, interQuantileRange);
	let height = 15;
	let center = 20;
	$: xScale = scaleLinear().domain([min, max]).range([0, 150]);

	$: console.log(xScale(assets));
</script>

<div class="w-[400px]">
	<span class="font-bold">Relative wealth</span>
	<svg class="w-full h-[85px]">
		<line y1={center} y2={center} x1={xScale(min)} x2={xScale(max)} class=" stroke-neutral-500" />

		<rect
			y={center - height / 2}
			x={xScale(q1)}
			width={xScale(q3) - xScale(q1)}
			{height}
			class="fill-neutral-400 stroke-neutral-500"
		/>

		{#each [min, median, max] as d (d)}
			<line
				y1={center - height / 2}
				y2={center + height / 2}
				x1={xScale(d)}
				x2={xScale(d)}
				class={median === d ? ' stroke-white' : 'stroke-neutral-500'}
			/>
		{/each}

		<circle
			cx={xScale(assets) >= 640 ? 350 : xScale(assets)}
			cy={center + 13}
			r={3}
			class="fill-info-500"
		/>

		<line
			y1={center - height / 2}
			y2={center + height / 2}
			x1={xScale(assets) >= 640 ? 350 : xScale(assets)}
			x2={xScale(assets) >= 640 ? 350 : xScale(assets)}
			class="stroke-info-500 stroke-2"
		/>
		<text
			y={center + 28}
			alignment-baseline="middle"
			text-anchor="middle"
			class="text-xs text-neutral-500"
		>
			<tspan x={xScale(assets) >= 640 ? 350 : xScale(assets)} dy="0.2em">
				{assets < q1 ? 'Lower' : assets < median ? 'Average' : assets < q3 ? 'Upper' : 'Top'} wealth
				range
			</tspan>
		</text>
	</svg>
</div>
