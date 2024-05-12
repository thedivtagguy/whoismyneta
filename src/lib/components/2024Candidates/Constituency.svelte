<script lang="ts">
	import data from '$lib/data/2024-candidates.json';
	import dataAboutConstituency from '$lib/data/constituencies.json';
	import { selectedConstituency } from '$lib/store';
	import CandidateCard from './CandidateCard.svelte';
	import HistoricalWins from './HistoricalWins.svelte';
	import { InfiniteScroll, scrollShadow, SelectField } from 'svelte-ux';
	import VoteShare from './VoteShare.svelte';
	import Turnouts from './Turnouts.svelte';
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	import { quadInOut } from 'svelte/easing';
	import { partyProminenceOrder as partyProminence } from '$lib/infoUtils';

	$: candidates = data
		.filter((people) => people.constituency === $selectedConstituency.ls_seat_name)
		.map((candidate) => {
			candidate.combinedID = candidate.candidate + candidate.party;
			return candidate;
		});

	$: originalCandidates = [...candidates];

	$: constituencyData = dataAboutConstituency.filter(
		(constituency) => constituency.constituency === $selectedConstituency.ls_seat_name
	)[0];

	let sortOptions = [
		{ value: 'default', label: 'Default order' },
		{ value: 'party', label: 'Party prominence' },
		{ value: 'candidate', label: 'Name (A-Z)' },
		{ value: 'age_youngest', label: 'Age (youngest first)' },
		{ value: 'age_oldest', label: 'Age (oldest first)' }
	];

	$: if (candidates.some((candidate) => candidate.gender.toLowerCase() === 'f')) {
		if (!sortOptions.some((option) => option.value === 'gender')) {
			sortOptions = [...sortOptions, { value: 'gender', label: 'Women First' }];
		}
	} else {
		sortOptions = sortOptions.filter((option) => option.value !== 'gender');
	}
	let sort = 'default';

	$: sortedCandidates = candidates.sort((a, b) => {
		if (sort === 'candidate') {
			return a.candidate.localeCompare(b.candidate);
		} else if (sort === 'age_youngest') {
			return a.age - b.age;
		} else if (sort === 'age_oldest') {
			return b.age - a.age;
		} else if (sort === 'gender') {
			// return candidates with f first
			if (a.gender === 'f' && b.gender !== 'f') {
				return -1;
			} else if (b.gender === 'f' && a.gender !== 'f') {
				return 1;
			} else {
				return 0;
			}
		}
	});

	$: if (sort === 'default') {
		sortedCandidates = [...originalCandidates];
	}

	$: if (sort === 'party') {
		sortedCandidates = candidates.sort((a, b) => {
			let aIndex = partyProminence.indexOf(a.party);
			let bIndex = partyProminence.indexOf(b.party);

			if (aIndex === -1) {
				aIndex = partyProminence.length;
			}

			if (bIndex === -1) {
				bIndex = partyProminence.length;
			}

			if (a.party === 'Independent') {
				aIndex = partyProminence.length + 1;
			}

			if (b.party === 'Independent') {
				bIndex = partyProminence.length + 1;
			}

			return aIndex - bIndex;
		});
	}
</script>

<div class="w-full px-2 md:px-0">
	<section
		class="flex md:flex-col flex-col md:items-start justify-start border-b-[1px] md:gap-2 border-neutral-100 py-2 w-full"
	>
		<h2 class="py-2 text-5xl font-bold break-words text-neutral-500">
			{$selectedConstituency.ls_seat_name}
		</h2>

		<div class="items-start justify-between hidden w-full max-w-3xl md:flex md:flex-row">
			<HistoricalWins historical={constituencyData.historical} />
			<VoteShare historical={constituencyData.historical} />
			<Turnouts historical={constituencyData.historical} />
		</div>

		<div class="grid items-start w-full grid-cols-3 py-4 md:hidden">
			<div class="flex w-full col-span-3 gap-8">
				<HistoricalWins historical={constituencyData.historical} />
				<Turnouts historical={constituencyData.historical} />
			</div>
			<div class="w-full col-span-full">
				<VoteShare historical={constituencyData.historical} />
			</div>
		</div>
	</section>

	<div class="flex flex-col gap-2 py-4 md:gap-4 md:items-center md:flex-row">
		<h3 class="text-xl font-semibold md:py-2 text-neutral-500">Candidates in 2024</h3>
		<SelectField
			clearable={false}
			classes={{
				root: 'w-full hidden md:block max-w-[15rem]'
			}}
			options={sortOptions}
			bind:value={sort}
		></SelectField>

		<p class="max-w-[35rem] text-xs text-neutral-300">
			Explore affidavits by clicking "Know More" to go to an external portal with detailed
			information about the candidate. Due to limitations, this information is available exclusively
			on ADR's platform.
		</p>
		<SelectField
			clearable={false}
			classes={{
				root: 'w-full block md:hidden max-w-[15rem]'
			}}
			options={sortOptions}
			bind:value={sort}
		></SelectField>
	</div>
</div>

<ul class="hidden grid-cols-1 gap-4 py-4 list-none md:grid md:grid-cols-3">
	{#each sortedCandidates as candidate (candidate.combinedID)}
		<li in:fade={{ duration: 300 }} animate:flip={{ delay: 300, duration: 500, easing: quadInOut }}>
			<CandidateCard {candidate} constituencyID={constituencyData?.adr_id} />
		</li>
	{/each}
</ul>

<ul use:scrollShadow class="h-[400px] mb-8 md:hidden block overflow-auto">
	<InfiniteScroll items={sortedCandidates} let:visibleItems>
		{#each visibleItems as candidate (candidate.combinedID)}
			<li
				in:fade={{ duration: 300 }}
				animate:flip={{ delay: 300, duration: 500, easing: quadInOut }}
			>
				<CandidateCard {candidate} constituencyID={constituencyData?.adr_id} />
			</li>
		{/each}
	</InfiniteScroll>
</ul>
