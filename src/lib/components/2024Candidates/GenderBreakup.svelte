<script>
	import { BarStack, cls, format, TweenedValue } from 'svelte-ux';

	export let data = [];
	let genderCounts = {};

	// Count each gender and convert counts to percentages
	$: result = data.reduce((acc, item) => {
		acc[item.gender] = (acc[item.gender] || 0) + 1;
		return acc;
	}, {});

	$: result = Object.entries(result).map(([gender, count]) => {
		let barClass;
		switch (gender) {
			case 'Male':
				barClass = 'bg-success';
				break;
			case 'Female':
				barClass = 'bg-warning';
				break;
			default:
				barClass = 'bg-info';
		}
		return {
			label: gender,
			value: (count / data.length) * 100,
			classes: { bar: barClass }
		};
	});
</script>

<BarStack
	data={result}
	let:item
	let:total
	classes={{
		root: 'py-1'
	}}
>
	<div class={cls('group-first:rounded-l group-last:rounded-r', item.classes?.bar)}>
		<div class="flex items-center gap-1 px-2 py-1 truncate">
			<span class="text-sm font-semibold text-gray-900">
				<TweenedValue value={item.value / total} let:value options={{ duration: 300 }}>
					{format(value, 'percent', { fractionDigits: 1 })}
				</TweenedValue>
			</span>

			<span class="text-xs text-gray-900 truncate">
				<TweenedValue value={item.value} let:value options={{ duration: 200 }}>
					({format(value, 'integer')})
				</TweenedValue>
			</span>
		</div>
	</div>
	<div class="py-1 text-xs font-semibold truncate text-surface-content">
		{item.label}
	</div>
</BarStack>
