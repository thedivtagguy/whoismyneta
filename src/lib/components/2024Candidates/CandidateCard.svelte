<script lang="ts">
	import { partyColors } from '$lib/colors';
	import { Icon, dirtyStore } from 'svelte-ux';
	import { formatTextForHighlight, getPartyColor } from '$lib/utils';
	import { mdiAccountGroup, mdiAccount } from '@mdi/js';
	import { writable } from 'svelte/store';
	import LinkModal from './LinkModal.svelte';

	interface Candidate {
		age: string;
		candidate: string;
		constituency: string;
		gender: string;
		party: string;
		state: string;
		link: string;
	}

	export let candidate: Candidate;
	export let constituencyID: string;

	$: partyColor = getPartyColor(candidate.party);

	$: link = `https://www.myneta.info/LokSabha2024/index.php?action=show_candidates&constituency_id=${constituencyID}${formatTextForHighlight(
		candidate.candidate
	)}`;

	$: console.log(constituencyID);

	$: isConstituencyID = constituencyID ? false : true;
</script>

<!-- Card -->
<div
	class="flex group transition hover:border-neutral/50 hover:bg-offWhite h-[9rem] gap-2 p-4 bg-white rounded-lg shadow-sm border-surface-200 border-[1px]"
>
	{#if partyColor.abbreviation && partyColor.abbreviation !== 'IND'}
		<img
			src="/symbols/{partyColor.abbreviation}.webp"
			alt="Party Logo"
			class="object-fill rounded-full group-hover:border-[1px] border-neutral/50 size-16"
		/>
	{:else}
		<span
			class="inline-flex items-center justify-center font-bold rounded-full text-neutral-100/30 size-16 group-hover:bg-neutral-100/50 group-hover:text-white/50 bg-surface-100"
		>
			<Icon
				path={candidate.party === 'Independent' ? mdiAccount : mdiAccountGroup}
				class="size-8"
			/>
		</span>
	{/if}

	<div class="flex flex-col justify-between h-full gap-2">
		<div class="flex flex-col gap-1">
			<h4 class="font-serif text-xl font-bold text-neutral-500">
				{candidate.candidate}
				<span class="inline font-sans text-sm font-semibold uppercase"
					>({candidate.gender}) {candidate.age}
				</span>
			</h4>
			<p class="text-sm text-neutral-400">{candidate.party}</p>
		</div>
		<LinkModal disabled={isConstituencyID} linkURI={link} />
	</div>
</div>
