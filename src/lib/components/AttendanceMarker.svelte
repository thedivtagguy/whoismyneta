<script>
	import { Chart, Svg, Group, Arc, Text, LinearGradient } from 'layerchart';
	import { SpringValue, cls } from 'svelte-ux';

	export let value = 75;
	let segments = 50;

	$: fillColor =
		value >= 75 ? 'fill-success-400' : value >= 50 ? 'fill-warning-400' : 'fill-danger-400';
</script>

<div class="h-[175px] flex flex-col justify-center rounded p-4">
	<span class="text-sm text-center mb-2 -mt-1 font-medium leading-6 text-gray-900">Attendance</span>
	<Chart>
		<Svg>
			<Group center>
				{#each { length: segments } as _, segmentIndex}
					{@const segmentAngle = (2 * Math.PI) / segments}
					{@const startAngle = segmentIndex * segmentAngle}
					{@const endAngle = (segmentIndex + 1) * segmentAngle}
					<SpringValue {value} let:value>
						<Arc
							{startAngle}
							{endAngle}
							innerRadius={-15}
							cornerRadius={2}
							padAngle={0.01}
							class={cls((segmentIndex / segments) * 100 < value ? fillColor : 'fill-gray-300')}
						>
							<Text
								value={Math.round(value) + '%'}
								textAnchor="middle"
								verticalAnchor="middle"
								dy={1}
								class="text-3xl tabular-nums fill-primary-800"
							/>
						</Arc>
					</SpringValue>
				{/each}
			</Group>
		</Svg>
	</Chart>
</div>
