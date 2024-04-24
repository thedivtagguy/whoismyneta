<script>
	import Header from '$lib/components/Header.svelte';
	import Seo from '$lib/components/SEO.svelte';
	import '../lib/styles.css';
	import ShareCard from '$lib/assets/sharecard.jpg';
</script>

<Seo
	seoTitle="What's the neta in your constituency up to?"
	seoDesc="Find out more about your constituency's representative, their declared assets, criminal cases, and attendance in the Lok Sabha."
	keywords={['elections', 'india', 'constituency', 'neta', 'dashboard']}
	siteName="What's your neta up to?"
	twitter="thedivtagguy"
	shareImg={ShareCard}
/>

<main
	class="min-h-[90vh] overflow-hidden h-fit flex flex-col w-full justify-center items-center max-w-6xl mx-auto mt-4 mb-4 md:mb-8"
>
	<Header />
	<main class="flex flex-col items-center justify-center w-full px-2 py-2 md:px-0 md:flex-row">
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
				This is a small project made as part of OpenCity.in's April 2024 Elections Datajam. Election
				affidavits filed by candidates during the 2019 general elections was scraped from MyNeta.
				Legislative activity of representatives in the 17th Lok Sabha (2019-2024) was scraped from
				PRS India.
				<br />
				<br />

				Age, attendance and questions raised data are from PRS India as of 2024. All other data is
				from MyNeta as per 2019 election affidavits. Attendance is calculated as average attendance
				percentage across every session of parliament where the neta's attendance was tracked.
			</p>
		</div>
		<div class="py-4 text-left md:pl-4 md:py-0 md:w-1/2">
			<h3 class="text-sm font-semibold text-neutral-600">Data Sources</h3>

			<ul
				class=" align-bottom text-left list-outside max-w-[20rem] gap-2 flex flex-col pt-2 text-neutral-500 text-xs"
			>
				<li>
					<a href="https://github.com/Vonter/india-election-affidavits"
						>Election affidavits filed by candidates, compiled from MyNeta, by Vonter</a
					>
				</li>
				<li>
					<a href="https://github.com/Vonter/india-representatives-activity"
						>Legislative activity of parliamentary representatives, compiled from PRS India, by
						Vonter</a
					>
				</li>
				<li>
					<a href="https://github.com/shijithpk/2024_maps_supplement/"
						>Lok Sabha constituencies Shapefile, compiled by Shijith PK</a
					>
				</li>
			</ul>
		</div>
		<div class="py-4 text-left md:pl-4 md:py-0 md:w-1/4">
			<p class="max-w-lg pt-2 text-xs text-left text-neutral-500">
				Developed by <a href="https://twitter.com/thedivtagguy">Aman Bhargava</a>.
				<br />
				Data by <a href="https://twitter.com/Vonterinon">Vivek Matthew</a> and additional inputs by
				<a href="https://twitter.com/bengawalk">Pravar Chaudhary</a>
			</p>
		</div>
	</div>
</footer>

<style>
	a {
		@apply text-neutral-500 underline;
	}

	a:hover {
		@apply text-neutral-600 underline font-medium;
	}
</style>
