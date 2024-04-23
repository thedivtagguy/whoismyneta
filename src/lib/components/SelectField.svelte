<script>
	import data from '$lib/data/data.json';
	import Typeahead from 'svelte-typeahead';
	import { SelectField } from 'svelte-ux';
	import { slugify, setConstituency, setCandidate } from '$lib/utils';
	import { selectedCandidate, selectedConstituency, searchMode } from '$lib/store';

	$: searchType = $searchMode;

	const searchPeople = data.map((item) => {
		return {
			id: slugify(item.candidate),
			text: `${item.candidate} | ${item.party_x}`
		};
	});

	const searchConstituency = data.map((item) => {
		return {
			id: slugify(item.ls_seat_name),
			text: `${item.ls_seat_name}, ${item.state_ut_name} | <span class="text-xs">
                    ${item.candidate}
                </span>`
		};
	});

	let searchIndex = [];
	$: searchIndex = searchType === 'people' ? searchPeople : searchConstituency;

	const extract = (option) => {
		// take text out of html tags
		// and remove empty spaces
		return option.text
			.replace(/<[^>]*>?/gm, '')
			.replace(/\s+/g, ' ')
			.trim();
	};

	function handleSelect(detail) {
		if (searchType === 'location') {
			setConstituency(detail.original.id);
		} else {
			setCandidate(detail.original.id);
		}
	}
</script>

<div class="search-container border-neutral-100 border-[1px] mb-4 w-full mx-auto shadow-sm">
	<Typeahead
		label={searchType === 'location'
			? 'Search for your constituency or a candidate'
			: 'Search for a candidate'}
		value={searchType === 'location' && $selectedConstituency.ls_seat_name
			? $selectedConstituency.ls_seat_name
			: ''}
		{extract}
		limit={5}
		on:select={({ detail }) => handleSelect(detail)}
		on:clear={() => {
			if (searchType === 'location') {
				selectedConstituency.set({});
			} else {
				selectedCandidate.set('');
			}
		}}
		data={searchIndex}
		showDropdownOnFocus={true}
	/>
</div>

<style>
	.search-container {
		width: 100%;
		padding: 1rem;
		border-radius: 0.25rem;
		font-size: 1rem;
		line-height: 1.5;
		color: #4a5568;

		background-clip: padding-box;
		transition:
			border-color 0.15s ease-in-out,
			box-shadow 0.15s ease-in-out;
	}

	/* Style data-svelte-typeahead */

	:global([data-svelte-typeahead], [data-svelte-typeahead] > form:nth-child(1)) {
		font-weight: 500;
	}

	:global([data-svelte-typeahead] > label) {
		font-weight: 800;
	}
</style>
