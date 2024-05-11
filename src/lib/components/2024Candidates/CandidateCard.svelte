<script lang="ts">
	import { partyColors } from '$lib/colors';
	import { Icon } from 'svelte-ux';
	import { formatTextForHighlight, getPartyColor } from '$lib/utils';
	import { mdiAccountGroup, mdiAccount } from '@mdi/js';
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

	$: console.log(constituencyID);

	$: partyColor = getPartyColor(candidate.party);
</script>

<!-- Card -->
<div
	class="flex group transition duration-150 hover:bg-offWhite h-36 gap-2 p-4 bg-white rounded-lg shadow-sm border-surface-200 border-[1px]"
>
	{#if partyColor.abbreviation && partyColor.abbreviation !== 'IND'}
		<img
			src="src/lib/assets/symbols/{partyColor.abbreviation}.webp"
			alt="Party Logo"
			class="object-fill rounded-full size-16"
		/>
	{:else}
		<span
			class="inline-flex items-center justify-center font-bold text-white rounded-full size-16 bg-surface-100"
		>
			.
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
		<a
			href="https://www.myneta.info/LokSabha2024/index.php?action=show_candidates&constituency_id={constituencyID}{formatTextForHighlight(
				candidate.candidate
			)}"
			class="max-w-[6rem] transition duration-150 px-2 py-1 group-hover:bg-primary-300 text-xs font-bold group-hover:text-white text-neutral-300 rounded-sm text-center bg-surface-200"
		>
			Know More
		</a>
	</div>
</div>
