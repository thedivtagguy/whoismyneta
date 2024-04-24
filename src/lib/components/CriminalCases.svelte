<script>
	export let criminalCases = 0;

	criminalCases = Number(criminalCases);
</script>

<div class="flex flex-col gap-1 mt-4">
	<p class="w-full font-bold text-md">
		{@html `${
			Number(criminalCases) === 0
				? 'Criminal <br/> Cases'
				: criminalCases > 1
					? 'Criminal  <br/>Cases'
					: 'Criminal <br/> Case'
		}`}
		<span class="block text-2xl font-normal">{criminalCases}</span>
	</p>
</div>
