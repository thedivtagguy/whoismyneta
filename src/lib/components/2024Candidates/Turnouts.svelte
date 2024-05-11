<script>
	import {
		Chart,
		Svg,
		Labels,
		Spline,
		Axis,
		Text,
		Tooltip,
		TooltipItem,
		Highlight
	} from 'layerchart';
	import { scaleTime } from 'd3';
	import { format } from 'date-fns';
	import { scale } from 'svelte/transition';

	export let historical = {};

	$: turnouts = Object.keys(historical).map((year) => {
		return { date: new Date(year), value: Math.round(historical[year].Turnout * 10) / 10 };
	});
</script>

<div class="flex flex-col gap-2 md:flex-col md:justify-start">
	<h3 class="font-sans text-xs font-bold uppercase text-neutral">Turnout</h3>
	<div class="h-[60px] w-[180px] md:w-[200px]">
		<Chart
			data={turnouts}
			x="date"
			xScale={scaleTime()}
			y="value"
			padding={{ left: 10, bottom: 24 }}
			tooltip={{ mode: 'bisect-x' }}
		>
			<Svg>
				<Labels format={(d) => d + '%'} />
				<Axis
					placement="bottom"
					rule
					ticks={() => [new Date(2009, 0), new Date(2014, 0), new Date(2019, 0)]}
					format={(d) => format(d, 'yyyy')}
				></Axis>
				<Spline class="stroke-2 stroke-primary" />
				<Highlight points lines />
			</Svg>
			<Tooltip header={(data) => format(data.date, 'yyyy')} let:data>
				<TooltipItem label="Turnout" value={data.value + '%'} />
			</Tooltip>
		</Chart>
	</div>
</div>
