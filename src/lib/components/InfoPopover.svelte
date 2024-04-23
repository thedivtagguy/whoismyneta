<script>
	import { Popover, Button } from 'svelte-ux';
	import { mdiInformationOutline } from '@mdi/js';
	let open;

	export let text = 'Click me';
</script>

<div class="inline-block">
	<Popover bind:open placement="top">
		<div class="p-2 max-w-[8rem] text-sm border shadow bg-surface-100">{text}</div>
	</Popover>
	<Button size={'sm'} icon={mdiInformationOutline} on:click={() => (open = !open)} />
</div>
