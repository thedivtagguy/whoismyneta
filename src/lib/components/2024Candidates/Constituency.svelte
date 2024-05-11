<script lang="ts">
	import data from '$lib/data/2024-candidates.json';
	import dataAboutConstituency from '$lib/data/constituencies.json';
	import { selectedConstituency } from '$lib/store';
	import CandidateCard from './CandidateCard.svelte';
	import HistoricalWins from './HistoricalWins.svelte';
	import { InfiniteScroll, scrollShadow } from 'svelte-ux';
	import VoteShare from './VoteShare.svelte';

	$: candidates = data.filter(
		(people) => people.constituency === $selectedConstituency.ls_seat_name
	);

	$: constituencyData = dataAboutConstituency.filter(
		(constituency) => constituency.constituency === $selectedConstituency.ls_seat_name
	)[0];
</script>

<div class="w-full px-2 md:px-0">
	<section
		class="flex md:flex-col flex-col md:items-start justify-start border-b-[1px] md:gap-2 border-neutral-100 py-2 w-full"
	>
		<h2 class="py-2 text-5xl font-bold break-words text-neutral-500">
			{$selectedConstituency.ls_seat_name}
		</h2>

		<div class="flex flex-col items-center justify-between w-full max-w-xl md:flex-row">
			<HistoricalWins historical={constituencyData.historical} />
			<VoteShare historical={constituencyData.historical} />
		</div>
	</section>

	<div class="flex flex-col gap-2 py-4 md:gap-4 md:items-center md:flex-row">
		<h3 class="text-xl font-semibold md:py-2 text-neutral-500">Candidates in 2024</h3>
		<p class="max-w-[35rem] text-xs text-neutral-300">
			Explore affidavits by clicking "Know More" to go to an external portal with detailed
			information about the candidate. Information on the external portal is available only under
			ADR's terms of use.
		</p>
	</div>
</div>

<div class="hidden grid-cols-1 gap-4 py-4 md:grid md:grid-cols-3">
	{#each candidates as candidate}
		<CandidateCard {candidate} constituencyID={constituencyData?.adr_id} />
	{/each}
</div>

<div use:scrollShadow class="h-[400px] mb-8 md:hidden block overflow-auto">
	<InfiniteScroll items={candidates} let:visibleItems>
		{#each visibleItems as candidate}
			<CandidateCard {candidate} constituencyID={constituencyData?.adr_id} />
		{/each}
	</InfiniteScroll>
</div>
