<script>
	import { TweenedValue, BarStack, cls, format } from 'svelte-ux';
	import { getPartyColor } from '$lib/utils';

	export let historical = {};
	let duration = 100;

	$: voteShares = Object.keys(historical).map((year) => {
		const parties = Object.entries(historical[year]).filter(([party, _]) => party !== 'Turnout');
		const total = parties.reduce((acc, [_, value]) => acc + value, 0);
		return {
			year,
			data: parties.map(([party, value]) => ({
				label: party,
				value,
				color: getPartyColor(party, 'abbreviation').backgroundColor
			})),
			total
		};
	});

	$: latest = voteShares[voteShares.length - 1].data;
</script>

<div class="flex flex-col gap-2 md:flex-col md:justify-start">
	<h3 class="font-sans text-xs font-bold uppercase text-neutral">2019 Vote Shares</h3>
	<BarStack
		classes={{
			root: 'w-full'
		}}
		data={voteShares[voteShares.length - 1].data}
		let:item
	>
		<div
			style="background-color: {item.color};"
			class={cls(`group-first:rounded-l group-last:rounded-r`)}
		>
			<div class="flex items-center gap-1 px-2 py-1 truncate">
				<span class="text-sm font-semibold text-gray-900">
					<TweenedValue value={item.value} let:value options={{ duration }}>
						{format(value / 100, 'percent', { fractionDigits: 1 })}
					</TweenedValue>
				</span>
			</div>
		</div>
		<div class="text-xs font-semibold truncate text-surface-content">
			{item.label}
		</div>
	</BarStack>
</div>
