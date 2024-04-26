<script>
	export let criminalCases;

	$: caseCount = criminalCases.end_criminal_cases
		? criminalCases.end_criminal_cases
		: criminalCases.criminal_cases;
</script>

<div class="flex flex-col gap-1 mt-4">
	<p class="w-full font-bold text-md">
		{@html `${
			Number(caseCount) === 0
				? 'Criminal <br/> Cases'
				: caseCount > 1
					? 'Criminal  <br/>Cases'
					: 'Criminal <br/> Case'
		}`} ({criminalCases.end_criminal_cases ? '2024' : '2019'})
		<span class="block text-2xl font-normal">{caseCount}</span>
	</p>
</div>
