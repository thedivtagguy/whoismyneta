<script>
	import InfoPopover from './InfoPopover.svelte';
	export let title;
	export let infoPopOverText = null;
	export let value;
</script>

<div class="flex flex-col gap-1">
	{#if infoPopOverText != null}
		<span class="inline-flex font-bold">{title} <InfoPopover text={infoPopOverText} /></span>
	{:else}
		<span class="inline-flex font-bold">{title}</span>
	{/if}
	<div class="inline-flex">
		<span class="text-2xl">{value}</span>
	</div>
</div>
