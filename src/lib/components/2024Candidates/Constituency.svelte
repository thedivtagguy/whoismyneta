<script lang="ts">
	import data from '$lib/data/2024-candidates.json';
	import dataAboutConstituency from '$lib/data/constituencies.json';
	import { selectedConstituency } from '$lib/store';
	import CandidateCard from './CandidateCard.svelte';
	import HistoricalWins from './HistoricalWins.svelte';
	$: candidates = data.filter(
		(people) => people.constituency === $selectedConstituency.ls_seat_name
	);

	$: constituencyData = dataAboutConstituency.filter(
		(constituency) => constituency.constituency === $selectedConstituency.ls_seat_name
	)[0];

	$: console.log(constituencyData);
</script>

<div class="w-full">
	<section
		class="flex items-center justify-between border-b-[1px] border-neutral-100 py-2 w-full md:flex-row"
	>
		<h2 class="px-4 py-2 text-4xl font-bold break-words bg-surface-100 text-neutral-500">
			{$selectedConstituency.ls_seat_name}
		</h2>

		<HistoricalWins historical={constituencyData.historical} />
	</section>
</div>

<div class="grid grid-cols-3 gap-2 py-4">
	{#each candidates as candidate}
		<CandidateCard {candidate} constituencyID={constituencyData?.adr_id} />
	{/each}
</div>
