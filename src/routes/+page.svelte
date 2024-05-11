<script>
	import Constituency from '$lib/components/2024Candidates/Constituency.svelte';
	import Card from '$lib/components/Card.svelte';
	import Map from '$lib/components/Map.svelte';
	import { selectedConstituency } from '$lib/store';
	import { fade } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	export let data;

	console.log(data);
</script>

<section class="flex flex-col justify-start w-full h-full gap-6 mb-4 md:flex-row">
	<div class="h-full md:w-1/2">
		<h3
			class="inline-flex border-neutral/50 border-b-[1px] w-full items-center justify-start gap-2 py-2 pb-2 mb-2 mx-auto text-lg font-semibold text-center text-black/70"
		>
			Current MPs (2019-2024 Lok Sabha)
		</h3>
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
