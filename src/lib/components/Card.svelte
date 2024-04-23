<script>
	import { selectedConstituency, searchMode, selectedCandidate } from '$lib/store';
	import { page } from '$app/stores';
	import { CopyButton, ProgressCircle } from 'svelte-ux';
	import { MapPin } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { formatAge, formatRupee } from '$lib/utils';
	import AttendanceMarker from './AttendanceMarker.svelte';
	import AssetsCriminalCases from './AssetsCriminalCases.svelte';
	import { partyColors } from '$lib/colors';

	$: results = $searchMode === 'location' ? $selectedConstituency : $selectedCandidate;
</script>

{#if results && Object.keys(results).length > 0}
	{#key results}
		<section
			class="px-6 py-4 h-full rounded-md w-full bg-surface-200 flex flex-col justify-between"
		>
			<div>
				<div class="  border-b-[1px] border-neutral-100 pb-4 flex flex-col gap-2">
					<div class="inline-flex items-end justify-between">
						<h2 class="w-full text-pretty font-bold text-4xl">
							{results.candidate}
							<span
								style:background-color={partyColors[results.party_x].backgroundColor}
								style:color={partyColors[results.party_x].textColor}
								class=" px-2 font-mono text-sm rounded-md inline-flex text-neutral-500"
							>
								{results.party_x}</span
							>
						</h2>
					</div>
					<div class="inline-flex gap-2 justify-start items-center">
						<MapPin class=" stroke-2 size-5 text-neutral-500" />
						<p class=" text-lg font-medium capitalize">
							{results.ls_seat_name}, {results.state_ut_name}
						</p>
					</div>
				</div>
				<div class="metadata">
					<div class="flex gap-1 justify-between">
						<div class=" flex flex-col">
							<dl class="flex border-b-[1px] divide-x gap-4 md:w-full">
								<div class="pr-4 py-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
									<dt class="text-md col-span-1 leading-6 font-bold text-gray-900">Education</dt>
									<dd class="mt-1 text-md leading-6 text-gray-700 pl-4 sm:col-span-3 sm:mt-0">
										{results.education_x}
									</dd>
								</div>
								<div class="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
									<dt class="text-md md:ml-4 col-span-2 font-bold leading-6 text-gray-900">Age</dt>
									<dd class="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
										{formatAge(results.age_y)}
									</dd>
								</div>
							</dl>
							<AssetsCriminalCases
								assets={results.total_assets}
								criminalCases={results.criminal_cases}
							/>
						</div>
						<div class="w-2/3 md:w-1/3">
							<AttendanceMarker value={results.attendance} />
						</div>
					</div>
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
{:else if results && Object.keys(results).length === 0}
	<section
		in:fade={{ duration: 300, easing: cubicInOut }}
		class="px-6 py-4 h-full rounded-md w-full bg-surface-200 flex flex-col justify-center items-center"
	>
		<ProgressCircle />
	</section>
{/if}
