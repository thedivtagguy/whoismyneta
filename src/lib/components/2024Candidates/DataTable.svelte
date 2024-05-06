<script>
	import data from '$lib/data/2024-candidates.json';
	import { selectedConstituency } from '$lib/store';
	import { Table, Paginate, Pagination, tableOrderStore } from 'svelte-ux';
	import { slugify } from '$lib/utils';

	// filter where data.constituency is equal to $selectedConstituency.ls_seat_name

	$: constituencyData = data.filter(
		(candidate) => candidate.constituency === $selectedConstituency.ls_seat_name
	);

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
		}
	];
</script>

<Paginate data={constituencyData} perPage={10} let:pageData let:pagination>
	<Table
		styles={{
			table: 'border-separate'
		}}
		classes={{
			th: ' capitalize',
			tr: ' text-md  p-8 even:bg-gray-50 odd:bg-white'
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
