<script>
	import Card from '$lib/components/Card.svelte';
	import Header from '$lib/components/Header.svelte';
	import Map from '$lib/components/Map.svelte';
	import SelectField from '$lib/components/SelectField.svelte';
</script>

<section class=" flex flex-col md:flex-row w-full gap-6 justify-start">
	<div class=" w-1/2 self-start">
		<SelectField />
		<Map />
	</div>
	<div class="w-1/2">
		<Card />
	</div>
</section>
