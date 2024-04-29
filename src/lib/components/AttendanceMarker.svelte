<script>
	import { Chart, Svg, Group, Arc, Text, LinearGradient } from 'layerchart';
	import { SpringValue, cls } from 'svelte-ux';

	export let value;
	// let value = 100;

	$: fillColor =
		value >= 75 ? 'fill-success-400' : value >= 50 ? 'fill-warning-400' : 'fill-danger-400';
</script>

<div class="flex flex-col items-start justify-between w-full gap-4 py-4 md:flex-row">
	<div class="flex flex-col gap-1">
		<span class="inline-flex items-end justify-start font-bold">Attendance</span>
		<div class="inline-flex items-start justify-between">
			<svg width={224} height={40}>
				<rect y={5} x={12} width={2 * 100} height={25} class="fill-[#d1d5db]" />
				<rect y={5} x={12} width={2 * value} height={25} class={fillColor} />
				<text x={112} y={10} dominant-baseline="hanging" text-anchor="middle">{value}%</text>
			</svg>
		</div>
	</div>
</div>
