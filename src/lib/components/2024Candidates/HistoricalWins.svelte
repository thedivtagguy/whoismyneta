<script>
	import { getPartyColor } from '$lib/utils';
	import { Breadcrumb } from 'svelte-ux';
	export let historical = {};

	$: winners = Object.keys(historical).map((year) => {
		const parties = Object.entries(historical[year]).filter(([party, _]) => party !== 'Turnout');
		const winner = parties.reduce(
			(prev, current) => (current[1] > (prev ? prev[1] : 0) ? current : prev),
			null
		);
		return { year, winner: winner[0] };
	});
</script>

<div class="flex flex-col gap-2 md:flex-col md:justify-start">
	<h3 class="font-sans text-xs font-bold uppercase text-neutral">Previous Winners</h3>
	<Breadcrumb items={winners} class="gap-2">
		<span slot="item" let:item>
			<div class="text-xs uppercase text-surface-content/90">
				{item.year}
			</div>
			<div
				class="py-1 my-1 text-xs font-bold text-center uppercase rounded-sm text-surface-content/90"
				style="background-color: {item === winners[winners.length - 1]
					? getPartyColor(item.winner, 'abbreviation').backgroundColor
					: 'none'};
	
					color: {item === winners[winners.length - 1]
					? getPartyColor(item.winner, 'abbreviation').textColor
					: 'none'};
	
					padding: {item === winners[winners.length - 1] ? '0.0rem 0.5rem' : '0'};
					"
			>
				{item.winner}
			</div>
		</span>
	</Breadcrumb>
</div>
