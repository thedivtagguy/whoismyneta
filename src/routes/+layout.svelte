<script>
	import Header from '$lib/components/Header.svelte';
	import '../lib/styles.css';
</script>

<!-- <nav>
	<a href="/">Home</a>
	<a href="/about">About</a>
	<a href="/lists">Lists</a>
</nav> -->

<main
	class="min-h-[90vh] overflow-hidden h-fit flex flex-col w-full justify-center items-center max-w-6xl mx-auto mt-4 mb-4 md:mb-8"
>
	<Header />
	<main class="md:px-0 w-full px-2 py-2 md:flex-row flex flex-col justify-center items-center">
		<slot></slot>
	</main>
</main>
<footer class="bg-surface-100 mx-2 mb-8 px-4 py-4 max-w-6xl md:mx-auto">
	<div class="flex divide-y-[1px] md:divide-x-[1px] justify-between md:flex-row flex-col">
		<div class="md:w-1/2 md:pb-0 pb-4">
			<h3 class=" font-semibold text-neutral-600 text-sm">Methodology</h3>
			<p class="text-left max-w-lg pt-2 text-neutral-500 text-xs">
				This is a small project made as part of OpenCity.in's April 2024 Elections Datajam. The data
				was scraped from candidate affidavits filed during the runup to the 2024 general elections.
				Sourced from MyNeta, an open data repository platform of Association for Democratic Reforms
				(ADR). This information is self-reported by the candidates and may not necessarily reflect
				reality.
			</p>
		</div>
		<div class="text-right md:w-1/2">
			<h3 class=" font-semibold text-neutral-600 text-sm">Data Sources</h3>

			<ul
				class=" align-bottom text-right list-outside max-w-[20rem] gap-2 flex flex-col pt-2 text-neutral-500 text-xs"
			>
				<li>
					<a href="https://github.com/Vonter/india-election-affidavits"
						>Indian Election affidavits compiled by Vonter</a
					>
				</li>
				<li>
					<a href="https://github.com/Vonter/india-representatives-activity"
						>Dataset of legislative activity by Indian parlimentary representatives compiled by
						Vonter
					</a>
				</li>
				<li>
					<a href="https://github.com/shijithpk/2024_maps_supplement/"
						>Lok Sabha constituencies shapefile compiled by Shijith PK</a
					>
				</li>
			</ul>
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
