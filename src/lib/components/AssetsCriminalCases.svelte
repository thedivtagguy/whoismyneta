<script>
	import { formatRupee } from '$lib/utils';

	import GenericField from './GenericField.svelte';
	export let criminalCases;
	export let assets = 0;
	export let currentAssets;

	$: caseCount = criminalCases.end_criminal_cases
		? criminalCases.end_criminal_cases
		: criminalCases.criminal_cases;
</script>

<div class="grid justify-start w-full grid-cols-6 gap-8 py-4">
	<GenericField
		title={`${
			Number(caseCount) === 0
				? 'Criminal Cases'
				: caseCount > 1
					? 'Criminal Cases'
					: 'Criminal Case'
		}`}
		value={caseCount}
		infoPopOverText={'Criminal cases on record'}
		cols={2}
	/>
	<GenericField
		title={'Assets (2019)'}
		infoPopOverText={'Assets declared by the candidate in 2019'}
		value={formatRupee(assets)}
		cols={2}
	/>

	{#if currentAssets}
		<GenericField
			title={'Assets (2024)'}
			infoPopOverText={'Assets declared by the candidate in 2024'}
			value={formatRupee(currentAssets)}
			cols={2}
		/>
	{/if}
</div>
<!-- <div class="flex justify-start w-2/5 gap-4 py-4 md:flex-row">
	<GenericField
		title={`${
			Number(caseCount) === 0
				? 'Criminal Cases'
				: caseCount > 1
					? 'Criminal Cases'
					: 'Criminal Case'
		}`}
		value={caseCount}
		infoPopOverText={'Criminal cases on record'}
	/>
</div> -->
