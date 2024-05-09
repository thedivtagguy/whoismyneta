<script>
	import DataTable from '$lib/components/2024Candidates/DataTable.svelte';
	import Card from '$lib/components/Card.svelte';
	import Map from '$lib/components/Map.svelte';
</script>

<section class="flex flex-col justify-start w-full h-full gap-6 mb-4 md:flex-row">
	<div class="h-full md:w-1/2">
		<h3
			class="inline-flex border-neutral/50 border-b-[1px] w-full items-center justify-start gap-2 py-2 pb-2 mb-2 mx-auto text-lg font-semibold text-center text-black/70"
		>
			MPs in the 17th Lok Sabha
		</h3>
		<Map />
	</div>
	<div class="flex flex-col gap-8 md:w-1/2">
		<Card />
	</div>
</section>
<DataTable />
