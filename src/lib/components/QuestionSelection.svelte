<script>
	import { Button, scrollIntoView } from 'svelte-ux';
	import { scrollShadow } from 'svelte-ux';
	import { questions } from './questions';
	import { createEventDispatcher, onMount } from 'svelte';
	import { selectedConstituency } from '$lib/store';

	const dispatch = createEventDispatcher();
	import data from '$lib/data/data.json';

	export let candidate = 'Dharambir Singh';

	$: if (selectedConstituency) {
		candidate = $selectedConstituency.candidate;
	}

	$: candidateData = data.find((d) => d.candidate === candidate);

	// find the questions that the candidate answered
	//
	$: questionsInCandidateData = Object.keys(candidateData).filter(
		(key) => questions[key] !== undefined
	);

	$: selectedQuestion = questionsInCandidateData[0];

	$: dispatch('change', {
		selectedQuestion,
		candidateData
	});

	onMount(() => {
		dispatch('change', {
			selectedQuestion,
			candidateData
		});
	});
</script>

<span class="mb-2 font-bold">No. of questions raised <br /> in parliament about...</span>
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
