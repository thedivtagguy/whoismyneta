<script>
	import { ToggleGroup, ToggleOption } from 'svelte-ux';
	import { createEventDispatcher } from 'svelte';
	export let options = {};
	let selectedStr = '';
	let variant = 'fill-surface';
	const dispatch = createEventDispatcher();
	// make options array from object
	let optionsArray = Object.keys(options).map((key) => {
		return { value: key, label: options[key] };
	});
	$: selected = optionsArray.find((option) => option.value === selectedStr);
	$: dispatch('change', selected);
</script>

<div class="inline-grid gap-2 mt-2">
	<ToggleGroup gap {variant} bind:value={selectedStr}>
		{#each optionsArray as option}
			<ToggleOption value={option.value}>
				{option.label.label}</ToggleOption
			>
		{/each}
	</ToggleGroup>
</div>
