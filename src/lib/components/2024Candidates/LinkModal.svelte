<script>
	import { Dialog, dirtyStore, Button, Icon } from 'svelte-ux';
	import highlightScreenshot from '$lib/assets/highlight.webp';
	import { writable } from 'svelte/store';
	import { firstClickOnModal } from '$lib/store';

	export let linkURI = '';
	export let linkText = 'Know more';

	let isFirefox = false;
	$: if (typeof window !== 'undefined') {
		isFirefox = /Firefox/.test(navigator.userAgent);
	}

	let open = false;
</script>

{#if !$firstClickOnModal}
	<Button
		size="sm"
		variant="fill-light"
		classes={{
			root: 'w-[6rem] transition duration-150 px-2 py-1 group-hover:bg-primary-300 text-xs font-bold group-hover:text-white text-neutral-300 rounded-sm text-center bg-surface-200'
		}}
		on:click={() => {
			open = true;
			$firstClickOnModal = true;
		}}>{linkText}</Button
	>
{:else}
	<a
		href={linkURI}
		target="_blank"
		class="w-[6rem] transition duration-150 px-2 py-1 group-hover:bg-primary-300 text-xs font-bold group-hover:text-white text-neutral-300 rounded-sm text-center bg-surface-200"
		>{linkText}</a
	>
{/if}

<Dialog
	classes={{
		dialog: 'w-[38rem] mx-2  bg-white rounded-lg shadow-lg border-[1px] border-neutral-200'
	}}
	bind:open
>
	<div class="font-serif text-2xl text-neutral" slot="title">A little head's up</div>

	<div class="px-6 mb-4">
		<p class="pt-2 pb-4 text-md text-neutral-500">
			Due to ADR's terms of use, we cannot display candidate information directly on our site. You
			will be redirected to their website, with the candidate's name highlighted.

			<span class="block pt-2 text-sm font-semibold">
				{isFirefox
					? 'Since you are using Firefox, please note that the highlighting feature may not work.'
					: ''}
			</span>
		</p>

		<img
			src={highlightScreenshot}
			alt="highlighted screenshot"
			class="w-full h-auto border-neutral/50 border-[1px]"
		/>
		<p class="pt-4 pb-1 text-sm text-neutral-500">This popup will only show once.</p>
	</div>
	<div slot="actions" class="py-2 mx-auto">
		<a
			href={linkURI}
			target="_blank"
			class="w-full px-8 py-3 font-bold text-center text-white transition duration-150 rounded-sm text-md group-hover:bg-primary-300 group-hover:text-white bg-primary-200"
			>Continue to page</a
		>
	</div>
</Dialog>
