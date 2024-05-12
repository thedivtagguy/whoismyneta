<script>
	import { selectedConstituency } from '$lib/store';
	import { ProgressCircle } from 'svelte-ux';
	import { MapPin } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { formatAge, formatRupee } from '$lib/utils';
	import { mdiBankCheck } from '@mdi/js';
	import AttendanceMarker from './AttendanceMarker.svelte';
	import { partyColors } from '$lib/colors';
	import { setConstituency, locateMe } from '$lib/utils';
	import Button from './Button.svelte';
	import QuestionViz from './QuestionViz.svelte';
	import AssetsHistogram from './AssetsHistogram.svelte';
	import InfoPopover from './InfoPopover.svelte';
	import GenericField from './GenericField.svelte';
	import { Button as SvelteUXButton } from 'svelte-ux';
	import { mdiCrosshairsGps } from '@mdi/js';

	export let onLoadData = [];
	$: results = $selectedConstituency;

	let partyBackgroundColor = '#FFFFFF'; // default color
	let partyTextColor = '#000000'; // default color

	$: {
		if (partyColors && results && results.party_x) {
			partyBackgroundColor =
				partyColors[results.party_x]?.backgroundColor ||
				partyColors['IND']?.backgroundColor ||
				'#FFFFFF';
			partyTextColor =
				partyColors[results.party_x]?.textColor || partyColors['IND']?.textColor || '#000000';
		}
	}
</script>

{#if results && Object.keys(results).length > 0}
	{@const baseURl = results.recontesting ? 'LokSabha2024' : 'LokSabha2019'}
	<section
		in:fade={{ duration: 300, easing: cubicInOut }}
		class="relative flex flex-col justify-between w-full min-h-[750px] h-full px-6 py-4 rounded-md bg-surface-200"
	>
		<div>
			<div class="flex items-center justify-between">
				<div>
					<span
						style:background-color={partyBackgroundColor}
						style:color={partyTextColor}
						class="inline-flex px-2 mb-2 font-mono text-sm font-bold rounded-md text-neutral-500"
					>
						{results.party_x}</span
					>
					<span class="pl-4 -mt-2 font-mono text-sm font-bold"> Sitting MP </span>
				</div>

				<div class="block -mt-2">
					{#if !results.attendance}
						<span class="inline-flex items-center justify-center font-sans text-xs font-normal 2">
							This MP's data has different availability
							<InfoPopover
								width="10rem"
								text="This MP was a minister. Ministers represent the government in parliament, so their participation is not reported."
							/>
						</span>
					{/if}
				</div>
			</div>

			<div class="  border-b-[1px] border-neutral-100 pb-4 flex flex-col gap-2">
				<div class="inline-flex items-end justify-start gap-2">
					<h2 class="text-4xl font-bold w-fit text-pretty">
						{results.candidate}
					</h2>
					{#if results.recontesting}
						<InfoPopover icon={mdiBankCheck} text="MP is recontesting in 2024" />
					{/if}
				</div>

				<div class="inline-flex items-center justify-start gap-2">
					<MapPin class="stroke-2 size-5 text-neutral-500" />
					<p class="text-lg font-medium capitalize">
						{results.ls_seat_name}, {results.state_ut_name}
					</p>
				</div>
			</div>
			<div class="metadata">
				<div
					class="grid items-start border-b-[1px] border-neutral-100 pb-4 justify-start w-full grid-flow-row grid-cols-7 gap-4 my-4"
				>
					<GenericField
						title="Education"
						value={results.education_x}
						infoPopOverText={'Education level as per 2019 affidavit'}
						cols={2}
					/>
					<GenericField
						title="Age"
						value={formatAge(results.age_y)}
						infoPopOverText={'Age as of 2024'}
						cols={2}
					/>
					<AttendanceMarker value={results.attendance} cols={3} />
					<GenericField
						title={`${
							Number(results.criminal_cases) === 0
								? 'Criminal Cases'
								: results.criminal_cases > 1
									? 'Criminal Cases'
									: 'Criminal Case'
						}`}
						value={results.criminal_cases}
						infoPopOverText={'Declared criminal cases as per 2019 affidavit'}
						cols={2}
					/>

					<GenericField
						title={'Assets (2019)'}
						infoPopOverText={'Declared value of assets owned as per 2019 affidavit'}
						value={formatRupee(results.total_assets)}
						cols={2}
					/>

					{#if results.end_total_assets}
						<GenericField
							title={'Assets (2024)'}
							infoPopOverText={'Declared value of assets owned as per 2024 affidavit'}
							value={formatRupee(results.end_total_assets)}
							cols={2}
						/>
					{/if}
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
		class="flex min-h-[750px] shadow-inner flex-col items-start justify-center w-full h-full px-16 py-4 rounded-md bg-surface-200"
	>
		{#if onLoadData.length !== 0}
			<div in:fade={{ duration: 300 }}>
				<h2 class="text-3xl text-left">
					Choose a constituency in <span class="inline-block font-bold"
						>{onLoadData[0]?.state_ut_name}</span
					>
				</h2>
				<p class="py-2 text-left text-md text-neutral-500">
					and see your sitting MLA's declared assets, criminal cases, and attendance — or explore
					candidates contesting in the 2024 Lok Sabha elections.
				</p>

				<div class="flex flex-wrap max-w-sm gap-2">
					{#each onLoadData as constituency}
						{#if constituency.ls_seat_name}
							<SvelteUXButton
								variant="fill-light"
								on:click={() => {
									setConstituency(constituency.ls_seat_name);
								}}
							>
								{constituency.ls_seat_name}
							</SvelteUXButton>
						{/if}
					{/each}
					<SvelteUXButton
						on:click={() => {
							locateMe();
						}}
						icon={mdiCrosshairsGps}
						classes={{ root: ' bg-primary text-white ' }}
					>
						Locate me
					</SvelteUXButton>
				</div>
			</div>
		{:else}
			<ProgressCircle class="mx-auto text-neutral-400" />
		{/if}
	</section>
{:else if results && Object.keys(results).length === 0}
	<section
		in:fade={{ duration: 300, easing: cubicInOut }}
		class="flex flex-col items-center justify-center w-full h-full px-6 py-4 rounded-md bg-surface-200"
	>
		<ProgressCircle />
	</section>
{/if}
