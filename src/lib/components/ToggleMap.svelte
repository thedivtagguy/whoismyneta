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

<div class="flex md:w-full mb-2 gap-2 md:max-w-[700px] max-w-[300px]">
	<ToggleGroup gap {variant} bind:value={selectedStr}>
		{#each optionsArray as option}
			<ToggleOption
				classes={{
					root: ' text-xs whitespace-nowrap w-fit max-w-[125px] '
				}}
				value={option.value}
			>
				{option.label.label}</ToggleOption
			>
		{/each}
	</ToggleGroup>
</div>
