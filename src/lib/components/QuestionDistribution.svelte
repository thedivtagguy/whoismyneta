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
		Bar,
		Tooltip,
		TooltipItem,
		Text
	} from 'layerchart';
	export let questionKey = 'environment_forest_and_climate_change';
	export let candidate = 'Dharambir Singh';

	let questionData = [];
	let thresholds = 10;
	let binQuestions = [];

	$: {
		if (questionKey) {
			questionData = data
				.filter((d) => d[questionKey] !== undefined)
				.map((d) => ({
					candidate: d.candidate,
					questions: +d[questionKey] // Convert to number
				}));

			binQuestions = d3bin()
				.thresholds(thresholds)
				.value((d) => d.questions)(questionData);
		}
	}

	let questionIndex;
	let binIndex;
	$: {
		// find the index of the selected candidate in the data
		questionIndex = questionData.findIndex((d) => d.candidate === candidate);

		// now where is it in the bins?
		binIndex = binQuestions.findIndex((d) => d.includes(questionData[questionIndex]));
	}
</script>

<div>
	{#if binQuestions.length === 0}
		<p>No data available</p>
	{/if}
	<div class="p-4 mb-6 md:mb-0" style:height="280px">
		<Chart
			data={binQuestions}
			x="length"
			xDomain={[0, 545]}
			xNice
			y={['x0', 'x1']}
			yScale={scaleBand().padding(0.1)}
			padding={{ left: 16, bottom: 16 }}
		>
			<Svg>
				<Axis placement="left" rule ticks={6} />
				<Axis placement="bottom" ticks={6} grid rule />
				{#each binQuestions as binQuestion, i}
					<Bar bar={binQuestion} fill="#8F9090" />
				{/each}
				<Highlight
					data={binQuestions[binIndex]}
					bar={{
						class: 'fill-[#E8845A]'
					}}
					axis="y"
				/>

				<Text
					dx={75}
					y={220}
					width={280}
					value=" 🟧  Selected candidate"
					anchor="center"
					class="text-[#E8845A] text-xs font-medium"
				></Text>

				<Text
					y={267}
					width={280}
					value=" Number of MPs"
					anchor="center"
					class="text-[#E8845A]  text-[0.6rem] font-mono font-medium"
				></Text>
			</Svg>
		</Chart>
	</div>
</div>
