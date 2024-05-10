<script>
	import GenderBreakup from './GenderBreakup.svelte';
	import { Stack } from 'svelte-ux';

	export let constituency;
	export let constituencyData;
</script>

<section class="w-full">
	<div class=" border-b-[1px] border-neutral-100">
		<p class="font-serif text-md text-neutral-400">About candidates contesting in 2024</p>
		<h2 class="py-2 text-4xl font-bold break-words text-neutral-500">
			{constituency.ls_seat_name}
		</h2>
	</div>
	<div class="py-2 border-neutral-100">
		<span class="text-md text-neutral-400">Gender breakup</span>
		<GenderBreakup data={constituencyData} />
	</div>
</section>
