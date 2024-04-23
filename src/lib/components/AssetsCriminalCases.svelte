<script>
	import { formatRupee } from '$lib/utils';
	import AssetsHistogram from './AssetsHistogram.svelte';
	export let criminalCases = 0;
	export let assets = 0;
	criminalCases = Number(criminalCases);
</script>

<div
	class="flex py-4 border-b-[1px] border-neutral-100/50 flex-row justify-start items-start gap-2"
>
	<div class="flex flex-col w-1/2 gap-1">
		<span class="font-bold">Declared Assets</span>
		<div class="inline-flex justify-between items-start">
			<span class=" text-2xl">{formatRupee(assets)}</span>
		</div>
	</div>

	<div class="flex flex-col gap-1">
		<p class="text-md font-bold">
			{Number(criminalCases) === 0
				? 'Criminal Cases'
				: criminalCases > 1
					? 'Criminal Cases'
					: 'Criminal Case'}
			<span class="text-xl block font-medium">{criminalCases}</span>
		</p>
	</div>
</div>
<AssetsHistogram assets={Number(assets)} />
