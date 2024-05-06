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

<div class="grid justify-start w-full grid-cols-4 gap-2 py-4">
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
	<GenericField
		title={'Assets (2019)'}
		infoPopOverText={'Assets declared by the candidate in 2019'}
		value={formatRupee(assets)}
	/>

	{#if currentAssets}
		<GenericField
			title={'Assets (2024)'}
			infoPopOverText={'Assets declared by the candidate in 2024'}
			value={formatRupee(currentAssets)}
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
