<script>
	import { ToggleGroup, ToggleOption } from 'svelte-ux';
	import { createEventDispatcher } from 'svelte';

	export let options = {};
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

<div class=" mt-2">
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
					root: `${option.color} hover:text-black important text-${option.text}`,
					option: `bg-${option.color} text-${option.text}`
				}}
				value={option.value}
			>
				{option.label.label}</ToggleOption
			>
		{/each}
	</ToggleGroup>
</div>
