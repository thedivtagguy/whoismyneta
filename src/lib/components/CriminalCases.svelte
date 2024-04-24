<script>
	export let criminalCases = 0;

	criminalCases = Number(criminalCases);
</script>

<div class="flex flex-col w-full gap-1 mt-4">
	<p class="font-bold text-md">
		{Number(criminalCases) === 0
			? 'Criminal Cases'
			: criminalCases > 1
				? 'Criminal Cases'
				: 'Criminal Case'}
		<span class="block text-xl font-medium">{criminalCases}</span>
	</p>
</div>
