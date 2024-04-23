<script>
	import QuestionDistribution from './QuestionDistribution.svelte';
	import QuestionSelection from './QuestionSelection.svelte';
	let questionKey = '';
	let candidateKey = '';
</script>

<div class="grid gap-4 mt-3 md:justify-center md:grid-cols-4">
	<div class="col-span-2">
		<QuestionSelection
			on:change={(e) => {
				questionKey = e.detail.selectedQuestion;
				candidateKey = e.detail.candidateData;
			}}
		/>
	</div>
	<div class="col-span-2">
		<QuestionDistribution {questionKey} candidate={candidateKey.candidate} />
	</div>
</div>
