<script>
	import data from '$lib/data/constituencies.json';
	import { Breadcrumb } from 'svelte-ux';
	export let constituency;
	console.log(constituency);
</script>

<section
	class="flex items-center justify-between border-b-[1px] border-neutral-100 w-full md:flex-row"
>
	<div class="">
		<h2 class="py-2 text-4xl font-bold break-words text-neutral-500">
			{constituency.ls_seat_name}
		</h2>
	</div>
	<!-- <Breadcrumb items={labeledItems} class="gap-2">
		<span slot="item" let:item>
		  <div class="text-xs uppercase text-surface-content/50">{item.label}</div>
		  <div>{item.value}</div>
		</span>
	  </Breadcrumb> -->
</section>
