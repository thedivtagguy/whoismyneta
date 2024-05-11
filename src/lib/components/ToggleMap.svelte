<script>
	import { ToggleGroup, ToggleOption, Button } from 'svelte-ux';
	import { createEventDispatcher } from 'svelte';
	import { selectedConstituency } from '$lib/store';
	import { mdiFilterRemove } from '@mdi/js';
	import { goto } from '$app/navigation';
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

<div class="flex w-full md:w-full mb-2 py-2 gap-2 md:max-w-[700px]">
	<div class="sticky left-0 z-10 bg-white">
		<Button
			on:click={() => {
				$selectedConstituency = {};
				goto('/', { noScroll: true });
			}}
			classes={{
				root: 'text-xs whitespace-nowrap h-8 w-fit max-w-[125px] '
			}}
			color="neutral"
			icon={mdiFilterRemove}
		/>
	</div>
	<ToggleGroup gap {variant} bind:value={selectedStr}>
		{#each optionsArray as option}
			<ToggleOption
				classes={{
					root: ' text-xs whitespace-nowrap h-8 w-fit max-w-[125px] '
				}}
				value={option.value}
			>
				{option.label.label}</ToggleOption
			>
		{/each}
	</ToggleGroup>
</div>
