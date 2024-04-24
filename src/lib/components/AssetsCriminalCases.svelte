<script>
	import { formatRupee } from '$lib/utils';

	import InfoPopover from './InfoPopover.svelte';
	export let criminalCases = 0;
	export let assets = 0;
	export let currentAssets;

	criminalCases = Number(criminalCases);
</script>

<div
	class="flex flex-col items-start justify-start {currentAssets
		? 'w-2/3'
		: 'w-1/2'} gap-2 py-4 md:flex-row"
>
	<div class="flex flex-col w-1/2 gap-1">
		<span class="inline-flex items-end justify-start font-bold"
			>Assets <br />(2019) <InfoPopover text="Assets declared by the candidate in 2019" /></span
		>
		<div class="inline-flex items-start justify-between">
			<span class="text-2xl">{formatRupee(assets)}</span>
		</div>
	</div>

	{#if currentAssets}
		<div class="flex flex-col w-1/2 gap-1">
			<span class="inline-flex items-end justify-start font-bold"
				>Assets <br />(2024) <InfoPopover text="Assets declared by the candidate in 2024." />
			</span>
			<div class="inline-flex items-start justify-between">
				<span class="text-2xl">{formatRupee(currentAssets)}</span>
			</div>
		</div>
	{/if}
</div>
