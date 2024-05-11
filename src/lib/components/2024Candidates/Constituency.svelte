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
</script>

<div class="w-full">
	<section
		class="flex items-center justify-between border-b-[1px] border-neutral-100 py-2 w-full md:flex-row"
	>
		<h2 class="py-2 text-4xl font-bold break-words text-neutral-500">
			{$selectedConstituency.ls_seat_name}
		</h2>

		<HistoricalWins historical={constituencyData.historical} />
	</section>

	<div class="flex flex-row items-center gap-4 pt-2">
		<h3 class="py-2 text-xl font-semibold text-neutral-500">Candidates in 2024</h3>
		<p class="max-w-[35rem] text-xs text-neutral-300">
			Explore affidavits by clicking "Know More" to go to an external portal with detailed
			information about the candidate. Information on the external portal is available only under
			ADR's terms of use.
		</p>
	</div>
</div>

<div class="grid grid-cols-3 gap-4 py-4">
	{#each candidates as candidate}
		<CandidateCard {candidate} constituencyID={constituencyData?.adr_id} />
	{/each}
</div>
