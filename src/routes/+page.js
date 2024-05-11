import data from '../lib/data/data.json';
import { browser } from '$app/environment';
import { selectedCandidate, selectedConstituency } from '$lib/store';
import { slugify } from '$lib/utils';
import { dev } from '$app/environment';
export const load = async ({ fetch, url }) => {
	const searchParams = url.searchParams;
	console.log(searchParams.size);
	if (searchParams.size === 0) {
		if (dev) {
			const randomConstituencies = data.sort(() => 0.5 - Math.random()).slice(0, 5);
			console.log(randomConstituencies);

			return {
				status: 200,
				body: {
					randomConstituencies
				}
			};
		} else {
			const response = await fetch('/geolocation');
			const {
				geo: {
					subdivision: { name: state }
				}
			} = await response.json();

			const constituencies = data.filter(
				(constituencyData) => slugify(constituencyData.ls_seat_name) === state
			);

			const randomConstituencies = constituencies.sort(() => 0.5 - Math.random()).slice(0, 5);
			console.log(randomConstituencies);
			return {
				status: 200,
				body: {
					randomConstituencies
				}
			};
		}
	} else {
		const constituency = searchParams.get('constituency');
		console.log('constituency', constituency);

		if (constituency) {
			const constituencyData = data.find(
				(constituencyData) => slugify(constituencyData.ls_seat_name) === constituency
			);

			if (constituencyData) {
				selectedConstituency.set(constituencyData);
			}
		}

		return {
			status: 200
		};
	}
};
