<script>
	import { selectedConstituency, searchMode, selectedCandidate } from '$lib/store';
	import { slugify } from '$lib/utils';
	import data from '$lib/data/data.json';
	import { page } from '$app/stores';
	import { CopyButton } from 'svelte-ux';
	import { MapPin } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	$: results = $searchMode === 'location' ? $selectedConstituency : $selectedCandidate;
</script>

{#if results}
	{#key results}
		<section
			in:fade={{ duration: 300, easing: cubicInOut }}
			class="px-6 py-4 h-full rounded-md w-full bg-surface-200 flex flex-col justify-between"
		>
			<div class=" border-b-[1px] pb-4 flex flex-col gap-2">
				<h2 class=" text-pretty font-bold text-4xl">
					{results.candidate} <span class=" text-lg text-neutral-500">| {results.party_x}</span>
				</h2>
				<div class="inline-flex gap-2 justify-start items-center">
					<MapPin class=" stroke-2 size-5 text-neutral-500" />
					<p class=" text-lg font-medium capitalize">
						{results.ls_seat_name}, {results.state_ut_name}
					</p>
				</div>
			</div>
			<div class="flex justify-end w-full items-center align-bottom">
				<span class="text-base-content font-medium text-xs">Share</span><CopyButton
					value={$page.url.href}
					color="#f2f2f2"
					variant="fill"
					size="md"
				/>
			</div>
		</section>
	{/key}
{/if}
