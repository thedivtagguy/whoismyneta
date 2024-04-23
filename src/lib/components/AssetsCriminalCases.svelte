<script>
	import data from '$lib/data/data.json';
	import { formatRupee } from '$lib/utils';
	import AssetsHistogram from './AssetsHistogram.svelte';
	export let criminalCases = 0;
	export let assets = 0;
	criminalCases = Number(criminalCases);
</script>

<div class="flex my-2 flex-row justify-start items-start gap-2">
	<div class="flex flex-col w-1/2 gap-1">
		<span class="font-bold">Assets</span>
		<div class="inline-flex justify-between items-start">
			<span class=" text-2xl">{formatRupee(assets)}</span>
		</div>
	</div>

	<div class="flex flex-col gap-1">
		<p class="text-lg">
			<span class="text-xl block font-bold">{criminalCases}</span>

			{Number(criminalCases) === 0
				? 'Criminal Cases'
				: criminalCases > 1
					? 'Criminal Cases'
					: 'Criminal Case'}
		</p>
	</div>
</div>
<AssetsHistogram assets={Number(assets)} />
