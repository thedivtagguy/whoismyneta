<script>
	import GenericField from './GenericField.svelte';

	export let age;
	export let education;
</script>

<div class="flex items-start justify-between w-1/2 gap-4 py-4 md:flex-row">
	<GenericField title={'Education'} value={education} />
	<GenericField title={'Age'} value={age} />
</div>
