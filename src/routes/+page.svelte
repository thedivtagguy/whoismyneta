<script>
	import Card from '$lib/components/Card.svelte';
	import Header from '$lib/components/Header.svelte';
	import Map from '$lib/components/Map.svelte';
	import SelectField from '$lib/components/SelectField.svelte';
</script>

<section class="flex flex-col justify-start w-full gap-6 md:flex-row">
	<div class="self-start md:w-1/2">
		<SelectField />
		<Map />
	</div>
	<div class="md:w-1/2">
		<Card />
	</div>
</section>
