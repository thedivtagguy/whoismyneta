<script>
	import { interpolateRound } from 'd3-interpolate';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	export let value;

	const progress = tweened(0, {
		duration: 400,
		interpolate: interpolateRound
	});

	$: formattedValue = Math.round(value);
	$: progress.set(formattedValue);

	$: fillColor =
		value >= 75 ? 'fill-success-400' : value >= 50 ? 'fill-warning-400' : 'fill-danger-400';
</script>

<div class="flex flex-col gap-1">
	<span class="inline-flex items-end justify-start font-bold">Attendance</span>
	<svg width={224} height={50}>
		<rect y={2} x={12} width={2 * 100} height={30} class="fill-[#d1d5db]" />
		<rect y={2} x={12} width={2 * $progress} height={30} class={fillColor} />
		<text x={112} y={5} dominant-baseline="hanging" text-anchor="middle" class="text-2xl"
			>{$progress}%</text
		>
	</svg>
</div>
