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
	import Button from './Button.svelte';
	import QuestionViz from './QuestionViz.svelte';
	import CriminalCases from './CriminalCases.svelte';
	import AssetsHistogram from './AssetsHistogram.svelte';

	$: results = $selectedConstituency;
</script>

{#if results && Object.keys(results).length > 0}
	{@const baseURl = results.recontesting ? 'LokSabha2024' : 'LokSabha2019'}
	<section
		in:fade={{ duration: 300, easing: cubicInOut }}
		class="relative flex flex-col justify-between w-full h-full px-6 py-4 rounded-md bg-surface-200"
	>
		<div>
			<span
				style:background-color={partyColors[results.party_x].backgroundColor
					? partyColors[results.party_x].backgroundColor
					: partyColors['IND'].backgroundColor}
				style:color={partyColors[results.party_x].textColor
					? partyColors[results.party_x].textColor
					: partyColors['IND'].textColor}
				class="inline-flex px-2 mb-2 font-mono text-sm font-bold rounded-md text-neutral-500"
			>
				{results.party_x}</span
			>
			<div class="  border-b-[1px] border-neutral-100 pb-4 flex flex-col gap-2">
				<div class="inline-flex items-end justify-between">
					<h2 class="w-full text-4xl font-bold text-pretty">
						{results.candidate}
					</h2>
				</div>
				<div class="inline-flex items-center justify-start gap-2">
					<MapPin class="stroke-2 size-5 text-neutral-500" />
					<p class="text-lg font-medium capitalize">
						{results.ls_seat_name}, {results.state_ut_name}
					</p>
				</div>
			</div>
			<div class="metadata">
				<div class="flex justify-between gap-1">
					<div class="flex flex-col">
						<dl class="flex border-b-[1px] divide-x gap-4 md:w-full">
							<div class="py-2 pr-4 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
								<dt class="col-span-1 font-bold leading-6 text-gray-900 text-md">Education</dt>
								<dd class="mt-1 leading-6 text-gray-700 md:pl-4 text-md sm:col-span-3 sm:mt-0">
									{results.education_x}
								</dd>
							</div>
							<div class="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
								<dt class="col-span-2 font-bold leading-6 text-gray-900 text-md md:ml-4">Age</dt>
								<dd class="mt-1 leading-6 text-gray-700 text-md sm:col-span-2 sm:mt-0">
									{formatAge(results.age_y)}
								</dd>
							</div>
						</dl>
						<div class="flex border-b-[1px] border-neutral-100/50 w-full">
							<AssetsCriminalCases
								currentAssets={results?.end_total_assets}
								assets={results.total_assets}
								criminalCases={results.criminal_cases}
							/>
							<CriminalCases criminalCases={results.criminal_cases} />
						</div>
					</div>
					<div class="w-2/3 md:w-1/3">
						<AttendanceMarker value={results.attendance} />
					</div>
				</div>
				<AssetsHistogram
					assets={results.end_total_assets ? results.end_total_assets : results.total_assets}
				/>
				<QuestionViz />
			</div>
		</div>
		<div class="flex items-center justify-between w-full gap-2 align-bottom">
			<span class="text-[0.6rem] md:max-w-[300px] text-neutral-500"
				>Neta details from 2019 and 2024 election affidavits (MyNeta). Parliament activity from
				2019-2024 Lok Sabha sessions (PRS India).</span
			>

			<div class="align-start">
				<Button
					link={'https://www.myneta.info/' +
						baseURl +
						'/candidate.php?candidate_id=' +
						results.candidate_id}
				/>
			</div>
		</div>
	</section>
{:else if Object.keys($selectedConstituency).length === 0}
	<section
		in:fade={{ duration: 300, easing: cubicInOut }}
		class="flex min-h-[300px] shadow-inner flex-col items-center justify-center w-full h-full px-6 py-4 rounded-md bg-surface-200"
	>
		<p class="text-lg text-neutral-500">Select a constituency to view details</p>
		<p class=" text-gray-800 my-4 self-start text-sm max-w-[300px] mx-auto text-left">
			Find out more about your constituency's representative, their declared assets, criminal cases,
			and attendance in the Lok Sabha.
		</p>
	</section>
{:else if results && Object.keys(results).length === 0}
	<section
		in:fade={{ duration: 300, easing: cubicInOut }}
		class="flex flex-col items-center justify-center w-full h-full px-6 py-4 rounded-md bg-surface-200"
	>
		<ProgressCircle />
	</section>
{/if}
