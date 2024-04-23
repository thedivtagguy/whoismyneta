<script>
	import VoteIcon from '$lib/assets/vote.webp';
</script>

<header class=" px-4 border-t-[1px] border-b-[1px] border-neutral-300 py-4 w-full mb-4">
	<div class=" w-full flex md:flex-row flex-col justify-between items-start md:items-end">
		<div class="flex">
			<img src={VoteIcon} alt="Vote" class=" hidden md:block md:size-[120px]" />
			<h1
				class=" text-3xl px-2 md:text-left text-right md:w-2/3 leading-tight py-4 text-black font-bold md:text-5xl"
			>
				Wondering how your constituency's neta is doing?
			</h1>
		</div>
		<div class="px-4 md:px-0 self-end flex flex-row">
			<img src={VoteIcon} alt="Vote" class=" block md:hidden size-[100px] md:size-[150px]" />
			<p class=" text-gray-800 bottom-3 self-start text-xs max-w-[340px] text-right">
				Find out more about your constituency's representative, their declared assets, criminal
				cases, and attendance in the Lok Sabha.
			</p>
		</div>
	</div>
</header>
