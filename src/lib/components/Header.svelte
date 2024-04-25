<script>
	import VoteIcon from '$lib/assets/vote.webp';
</script>

<header class="w-full pt-0 pb-2 mb-0 2 md:mb-0">
	<div
		class="flex border-b-[1px] border-neutral-300 flex-row items-center justify-between w-full md:flex-row md:items-end"
	>
		<div class="flex flex-col justify-between w-full md:items-end md:flex-row">
			<div class="flex flex-row items-end justify-center my-2 md:my-0">
				<img src={VoteIcon} alt="Vote" class=" hidden md:block md:size-[120px]" />
				<h1
					class="px-2 text-4xl font-bold leading-tight text-center text-black md:text-left md:py-4 md:text-7xl"
				>
					Who is my neta?
					<!-- <span
						class="md:block hidden px-4 py-2 font-sans text-[1rem] font-normal text-neutral-500 md:text-lg"
					>
						And what do their numbers say?
					</span> -->
				</h1>
			</div>
			<p
				class=" text-xs md:text-[0.8rem] mx-auto md:mx-0 max-w-[280px] mb-4 md:mb-6 text-center md:text-right"
			>
				Explore self-reported details and parliamentary activity of MPs in the 17th Lok Sabha
			</p>
		</div>
	</div>
</header>
