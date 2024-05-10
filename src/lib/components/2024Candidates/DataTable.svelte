<script>
	import data from '$lib/data/2024-candidates.json';
	import { selectedConstituency } from '$lib/store';
	import { Table, Paginate, Pagination, tableOrderStore, Button } from 'svelte-ux';
	import AboutConstituency from './AboutConstituency.svelte';
	import { html } from 'd3';

	// filter where data.constituency is equal to $selectedConstituency.ls_seat_name

	const genderMapping = {
		m: 'Male',
		f: 'Female',
		o: 'Other'
	};

	$: constituencyData = data
		.filter((candidate) => candidate.constituency === $selectedConstituency.ls_seat_name)
		.map((candidate) => ({
			...candidate,
			gender: genderMapping[candidate.gender]
		}));

	const order = tableOrderStore({ initialBy: 'candidate', initialDirection: 'desc' });

	let columns = [
		{
			name: 'candidate',
			align: 'left'
		},
		{
			name: 'party',
			align: 'left'
		},
		{
			name: 'gender',
			align: 'left'
		},
		{
			name: 'age',
			align: 'left'
		},
		{
			name: 'constituency',
			align: 'left',
			format: (value) => {
				return `<a href="${value}" target="_blank" class="w-full  text-white px-4 py-2 rounded-sm bg-[#5E81AC]">Affidavit</a>`;
			},
			html: true
		}
	];
</script>

<section class="grid grid-cols-8 gap-4">
	<div class="col-span-2">
		<AboutConstituency {constituencyData} constituency={$selectedConstituency} />
	</div>
	<div class="col-span-6">
		<Paginate data={constituencyData} perPage={7} let:pageData let:pagination>
			<Table
				styles={{
					table: 'border-separate'
				}}
				classes={{
					container: 'md:h-[400px] min-h-[400px] px-1 md:px-0 overflow-x-auto',
					th: ' capitalize bg-[#f4f4f4]',
					tr: ' text-md  h-[50px] even:bg-[#eff2f6]/30 odd:bg-white'
				}}
				data={[...pageData].sort($order.handler)}
				{columns}
				{order}
			/>
			<Pagination
				{pagination}
				perPageOptions={[5, 10, 25, 100]}
				show={['pagination', 'prevPage', 'nextPage']}
				classes={{
					root: 'border-t py-1 mt-2',
					perPage: 'flex-1 text-right',
					pagination: 'px-8'
				}}
			/>
		</Paginate>
	</div>
</section>
