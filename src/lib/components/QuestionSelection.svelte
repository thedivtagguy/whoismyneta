<script>
	import { Button, scrollIntoView } from 'svelte-ux';
	import { scrollShadow } from 'svelte-ux';
	import { questions } from './questions';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	import data from '$lib/data/data.json';

	export let candidate = 'Dharambir Singh';

	let candidateData = data.find((d) => d.candidate === candidate);

	// find the questions that the candidate answered
	//
	let questionsInCandidateData = Object.keys(candidateData).filter(
		(key) => questions[key] !== undefined
	);

	let questionsArray = Object.keys(questions).map((key) => {
		return { value: key, label: questions[key] };
	});

	let selectedQuestion = questionsArray[0];

	$: dispatch('change', {
		selectedQuestion,
		candidateData
	});
</script>

<span class="mb-2 font-bold">Questions raised <br /> in parliament about...</span>
<div use:scrollShadow class="overflow-auto mt-2 w-full h-[12rem]">
	{#each questionsInCandidateData as question}
		{@const isSelected = selectedQuestion === question}
		<div class="scroller-buttons" use:scrollIntoView={{ condition: isSelected }}>
			<Button
				variant={isSelected ? 'fill-light' : 'default'}
				color={isSelected ? 'primary' : 'default'}
				classes={{
					root: 'text-xs  text-wrap text-left important'
				}}
				fullWidth
				on:click={() => {
					selectedQuestion = question;
				}}
			>
				{questions[question]}
			</Button>
		</div>
	{/each}
</div>

<style>
	:global(.scroller-buttons > button) {
		text-align: left !important;
		margin: none;
		display: block;
		padding: 8px 5px;
	}
</style>
