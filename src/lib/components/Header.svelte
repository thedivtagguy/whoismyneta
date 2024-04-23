<script>
	import VoteIcon from '$lib/assets/vote.webp';
</script>

<header class=" px-4 border-t-[1px] border-b-[1px] border-neutral-300 py-4 w-full mb-4">
	<div class="flex flex-col items-start justify-between w-full md:flex-row md:items-end">
		<div class="flex">
			<img src={VoteIcon} alt="Vote" class=" hidden md:block md:size-[120px]" />
			<h1
				class="px-2 py-4 text-3xl font-bold leading-tight text-right text-black md:text-left md:w-2/3 md:text-5xl"
			>
				Wondering how your constituency's neta is doing?
			</h1>
		</div>
		<div class="flex flex-row self-end px-4 md:px-0">
			<img src={VoteIcon} alt="Vote" class=" block md:hidden size-[100px] md:size-[150px]" />
		</div>
	</div>
</header>
