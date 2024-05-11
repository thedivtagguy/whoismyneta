<script>
	import Constituency from '$lib/components/2024Candidates/Constituency.svelte';
	import Card from '$lib/components/Card.svelte';
	import Map from '$lib/components/Map.svelte';
	import { selectedConstituency } from '$lib/store';

	export let data;
</script>

<section class="flex flex-col justify-start w-full h-full gap-6 md:flex-row">
	<div class="self-start h-full top-6 md:w-1/2">
		<Map />
	</div>
	<div class="flex flex-col gap-8 md:w-1/2">
		<Card onLoadData={data.body?.loadConstituencies} />
	</div>
</section>
{#if Object.keys($selectedConstituency).length !== 0}
	<Constituency />
	<!-- {:else}
	<section
		in:fade={{ duration: 300, easing: cubicInOut }}
		class="flex min-h-[400px] shadow-inner flex-col items-center justify-center w-full h-full px-6 py-4 rounded-md bg-surface-200"
	>
		<p class="text-lg text-neutral-500">Select a constituency to see candidates</p>
		<p class=" text-gray-800 my-4 self-start text-sm max-w-[300px] mx-auto text-left">
			Candidates contesting in the 2024 Lok Sabha elections and links to their election affidavits.
		</p>
	</section> -->
{/if}
