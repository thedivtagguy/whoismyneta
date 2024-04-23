<script>
	import data from '$lib/data/data.json';
	import { questions } from './questions';
	import { scaleLinear, bin as d3bin, scaleBand, bin } from 'd3';
	import { Chart, Svg, Axis, Bars, Highlight, Tooltip, TooltipItem } from 'layerchart';
	export let questionKey = 'environment_forest_and_climate_change';
	export let candidate = 'Dharambir Singh';
	let width;
	let height = 300;

	let questionData = [];
	let thresholds = 10;
	$: {
		questionData = data
			.filter((d) => d[questionKey] !== undefined)
			.map((d) => ({
				candidate: d.candidate,
				questions: +d[questionKey] // Convert to number
			}));
	}

	$: binQuestions = d3bin()
		.thresholds(thresholds)
		.value((d) => d.questions)(questionData);

	$: console.log(binQuestions);

	$: yScale = scaleLinear()
		.domain([0, Math.max(...questionData.map((d) => d.questions))])
		.range([0, 100]);
</script>

<div bind:clientWidth={width}>
	<div class="p-4" style:height="{binQuestions.length * 20}px">
		<Chart
			data={binQuestions}
			x="length"
			xDomain={[0, null]}
			xNice
			y={['x0', 'x1']}
			yScale={scaleBand().padding(0.1)}
			padding={{ left: 16, bottom: 16 }}
			tooltip={{ mode: 'band' }}
		>
			<Svg>
				<Axis placement="left" rule />
				<Axis placement="bottom" grid rule />
				<Bars radius={1} class="fill-primary" />
				<Highlight area />
			</Svg>
		</Chart>
	</div>
</div>
