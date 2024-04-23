<script>
	import { Chart, Svg, Group, Arc, Text, LinearGradient } from 'layerchart';
	import { SpringValue, cls } from 'svelte-ux';

	export let value;
	let segments = 50;

	$: fillColor =
		value >= 75 ? 'fill-success-400' : value >= 50 ? 'fill-warning-400' : 'fill-danger-400';
</script>

<div class="h-[175px] flex flex-col justify-center rounded p-4">
	<span class="mb-2 -mt-1 text-sm font-medium leading-6 text-center text-gray-900">Attendance</span>
	<Chart>
		<Svg>
			<Group center>
				{#each { length: segments } as _, segmentIndex}
					{@const segmentAngle = (2 * Math.PI) / segments}
					{@const startAngle = segmentIndex * segmentAngle}
					{@const endAngle = (segmentIndex + 1) * segmentAngle}
					<SpringValue value={Number(value)} let:value>
						<Arc
							{startAngle}
							{endAngle}
							innerRadius={-15}
							cornerRadius={2}
							padAngle={0.01}
							class={cls((segmentIndex / segments) * 100 < value ? fillColor : 'fill-gray-300')}
						>
							{#if value}
								<Text
									value={Math.round(value) + '%'}
									textAnchor="middle"
									verticalAnchor="middle"
									dy={1}
									class="text-3xl tabular-nums fill-primary-800"
								/>
							{:else}
								<Text
									value="Not available"
									textAnchor="middle"
									verticalAnchor="middle"
									dy={1}
									class="text-sm font-light fill-primary-300"
								/>
							{/if}
						</Arc>
					</SpringValue>
				{/each}
			</Group>
		</Svg>
	</Chart>
</div>
