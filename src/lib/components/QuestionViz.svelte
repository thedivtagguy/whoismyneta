<script>
	import QuestionDistribution from './QuestionDistribution.svelte';
	import QuestionSelection from './QuestionSelection.svelte';
</script>

<div class="grid justify-center gap-4 mt-3 md:grid-cols-4">
	<div class="col-span-2">
		<QuestionSelection />
	</div>
	<div class="col-span-2">
		<QuestionDistribution />
	</div>
</div>
