<script>
	import { Chart, Svg, Spline, Axis, Text, Tooltip, TooltipItem, Highlight } from 'layerchart';

	import { scaleTime } from 'd3';
	import { format } from 'date-fns';

	export let historical = {};

	$: turnouts = Object.keys(historical).map((year) => {
		return { date: new Date(year), value: historical[year].Turnout };
	});

	$: console.log(turnouts);

	$: minTurnout = Math.min(...turnouts.map((d) => d.value));
</script>

<div class="flex flex-col gap-2 md:flex-col md:justify-start">
	<h3 class="font-sans text-xs font-bold uppercase text-neutral">Turnouts</h3>
	<div class="h-[60px] w-[200px]">
		<Chart
			data={turnouts}
			x="date"
			xScale={scaleTime()}
			y="value"
			padding={{ bottom: 24 }}
			tooltip={{ mode: 'bisect-x' }}
		>
			<Svg>
				{#each turnouts as { date, value }, i}
					<Text x={date} y={value} dy={i % 2 === 0 ? 12 : -12} text-anchor="middle">
						{value}%
					</Text>
				{/each}
				<Axis placement="bottom" rule ticks={2} />
				<Spline class="stroke-2 stroke-primary" />
				<Highlight points lines />
			</Svg>
			<Tooltip header={(data) => format(data.date, 'yyyy')} let:data>
				<TooltipItem label="Turnout" value={data.value + '%'} />
			</Tooltip>
		</Chart>
	</div>
</div>
