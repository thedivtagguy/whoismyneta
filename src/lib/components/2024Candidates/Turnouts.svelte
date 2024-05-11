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

	export let historical = {};

	$: turnouts = Object.keys(historical).map((year) => {
		return { date: new Date(year), value: historical[year].Turnout };
	});
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
				<Labels format="decimal" />
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
