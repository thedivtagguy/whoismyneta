<script>
	import { formatRupee } from '$lib/utils';
	import AssetsHistogram from './AssetsHistogram.svelte';
	export let criminalCases = 0;
	export let assets = 0;
	criminalCases = Number(criminalCases);
</script>

<div class="flex flex-col-reverse items-start justify-start w-full gap-2 py-4 md:flex-row">
	<div class="flex flex-col w-1/2 gap-1">
		<span class="font-bold">Declared Assets</span>
		<div class="inline-flex items-start justify-between">
			<span class="text-2xl">{formatRupee(assets)}</span>
		</div>
	</div>
</div>
