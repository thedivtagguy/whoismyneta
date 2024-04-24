<script>
	import { Popover, Button } from 'svelte-ux';
	import { mdiInformationOutline } from '@mdi/js';
	let open;

	export let text = 'Click me';
	export let width = '8rem';
	export let icon = mdiInformationOutline;
</script>

<div class="inline-block">
	<Popover bind:open placement="top">
		<div class="p-2 max-w-[{width}] text-sm border shadow bg-surface-100">{text}</div>
	</Popover>
	<Button size={'sm'} {icon} on:click={() => (open = !open)} />
</div>
