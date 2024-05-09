<script>
	import Header from '$lib/components/Header.svelte';
	import Seo from '$lib/components/SEO.svelte';
	import '../lib/styles.css';
	import ShareCard from '$lib/assets/sharecard.jpg';
	import { Button, Icon } from 'svelte-ux';
	import { setConstituency } from '$lib/utils';
	import data from '$lib/data/data.json';
	import InfoPopover from '$lib/components/InfoPopover.svelte';
	import { mdiGithub } from '@mdi/js';
	import LokSabhaRecontestingList from '$lib/components/LokSabhaRecontestingList.svelte';
</script>

<Seo
	seoTitle="What's the neta in your constituency up to?"
	seoDesc="Find out more about your constituency's representative, their declared assets, criminal cases, and attendance in the Lok Sabha."
	keywords={['elections', 'india', 'constituency', 'neta', 'dashboard']}
	siteName="What's your neta up to?"
	twitter="thedivtagguy"
	shareImg={ShareCard}
/>

<header></header>
<main
	class="min-h-[90vh] z-10 bg-white h-fit flex flex-col w-full justify-center items-center mt-2 mb-4 md:mb-8"
>
	<Header />

	<main class="w-full h-full max-w-6xl px-2 pb-2 md:mx-auto md:pb-8 md:pt-4 md:px-0 md:flex-row">
		<slot></slot>
	</main>
</main>
<footer class="max-w-6xl px-4 py-4 mx-2 mb-4 md:mb-8 bg-surface-100 md:mx-auto">
	<div
		class="flex divide-y-[1px] md:divide-y-0 md:divide-x-[1px] justify-between md:flex-row flex-col"
	>
		<div class="pb-4 pr-4 md:w-1/2 md:pb-0">
			<h3 class="text-sm font-semibold text-neutral-600">Methodology</h3>
			<p class="max-w-lg pt-2 text-xs text-left text-neutral-500">
				This is a small project made as part of the April 2024
				<a href="https://opencity.in/">OpenCity.in</a>
				Elections Datajam. Election affidavits filed by candidates during the 2019 and 2024 general elections
				from MyNeta. Legislative activity of representatives in the 17th Lok Sabha (2019-2024) from PRS
				India.
				<br />
				<br />

				Data on age, attendance and questions is from PRS India. Other data is from MyNeta, as per
				2019 and 2024 (where available) election affidavits. Attendance shown is the average
				attendance percentage across parliamentary sessions where the neta's attendance was tracked.
			</p>
		</div>
		<div class="py-4 text-left md:pl-4 md:py-0 md:w-1/2">
			<h3 class="text-sm font-semibold text-neutral-600">Data Sources</h3>

			<ul
				class=" align-bottom text-left list-outside max-w-[20rem] gap-2 flex flex-col pt-2 text-neutral-500 text-xs"
			>
				<li>
					<a href="https://myneta.info/">Election affidavits, from MyNeta</a>
				</li>
				<li>
					<a href="https://prsindia.org/">Legislative activity, from PRS India</a>
				</li>
				<li>
					<a href="https://github.com/shijithpk/2024_maps_supplement/"
						>Constituencies Shapefile, compiled by Shijith PK</a
					>
				</li>
			</ul>
		</div>
		<div class="flex flex-col justify-between py-4 text-left md:pl-4 md:py-0 md:w-1/4">
			<p class="max-w-lg pt-2 text-xs text-left text-neutral-500">
				Developed by <a href="https://twitter.com/thedivtagguy">Aman Bhargava</a>.
				<br />
				Assisted by <a href="https://twitter.com/Vonterinon">Vivek Matthew</a> and additional inputs
				by <a href="https://twitter.com/bengawalk">Pravar Chaudhary</a>.
			</p>
			<div>
				<a
					href="https://github.com/thedivtagguy/whoismyneta"
					class="text-xs underline text-neutral-500"
					target="_blank"
				>
					<span>
						<Icon data={mdiGithub} class="inline-block w-4 h-4" />
					</span>
					View source on GitHub</a
				>
				<p class="text-[0.6rem] uppercase text-neutral-500">
					Last updated: {BUILD_DATE}
				</p>
			</div>
		</div>
	</div>
</footer>
