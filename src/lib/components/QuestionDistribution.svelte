<script>
	import data from '$lib/data/data.json';
	import { questions } from './questions';
	import { scaleLinear, bin as d3bin, scaleBand, bin } from 'd3';
	import {
		Chart,
		Svg,
		RectClipPath,
		Axis,
		Bars,
		Highlight,
		Tooltip,
		TooltipItem
	} from 'layerchart';
	export let questionKey = 'environment_forest_and_climate_change';
	export let candidate = 'Dharambir Singh';

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

	// get candidates value
	$: questionValue =
		binQuestions.flat().find((candidate) => candidate.candidate === candidate)?.questions ?? null;
</script>

<div>
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
				<Bars radius={1} class="fill-neutral-100" />
				<Highlight area>
					<svelte:fragment slot="area" let:area>
						<RectClipPath x={0} y={questionValue} width={area.width} height={area.height} spring>
							<Bars radius={4} strokeWidth={1} class="fill-primary" />
						</RectClipPath>
					</svelte:fragment>
				</Highlight>
			</Svg>
		</Chart>
	</div>
</div>
