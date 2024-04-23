<script>
	import { ToggleGroup, ToggleOption } from 'svelte-ux';
	import { createEventDispatcher } from 'svelte';

	export let options = {};
	export let reset = false;
	let selectedStr = '';
	let variant = 'fill-surface';
	const dispatch = createEventDispatcher();

	// make options array from object
	let optionsArray = Object.keys(options).map((key) => {
		return { value: key, label: options[key], color: options[key].color, text: options[key].text };
	});

	$: selected = optionsArray.find((option) => option.value === selectedStr);

	$: dispatch('change', selected);
</script>

<div class="mb-3">
	<ToggleGroup
		classes={{
			root: 'grid grid-flow-col overflow-hidden'
		}}
		gap
		{variant}
		bind:value={selectedStr}
	>
		{#each optionsArray as option}
			<ToggleOption
				classes={{
					root: 'text-sm ',
					indicator: `${option.color}`
				}}
				value={option.value}
			>
				{option.label.label}</ToggleOption
			>
		{/each}
	</ToggleGroup>
</div>
