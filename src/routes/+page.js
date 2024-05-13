import data from '../lib/data/data.json';
import { browser } from '$app/environment';
import { selectedConstituency } from '$lib/store';
import { slugify } from '$lib/utils';
import { dev } from '$app/environment';
export const load = async ({ fetch, url }) => {
	if (browser && url.searchParams.size === 0) {
		if (dev) {
			const loadConstituencies = data.sort(() => 0.5 - Math.random()).slice(0, 5);

			return {
				status: 200,
				body: {
					loadConstituencies
				}
			};
		} else {
			const response = await fetch('/geolocation');
			const {
				geo: {
					subdivision: { name: state }
				}
			} = await response.json();

			let constituencies = data.filter(
				(constituencyData) => constituencyData.state_ut_name === state
			);

			// If no constituencies are found for the state, select a random state
			if (constituencies.length === 0) {
				const randomState = data[Math.floor(Math.random() * data.length)].state_ut_name;
				constituencies = data.filter(
					(constituencyData) => constituencyData.state_ut_name === randomState
				);
			}

			const loadConstituencies = constituencies.sort(() => 0.5 - Math.random()).slice(0, 5);

			return {
				status: 200,
				body: {
					loadConstituencies
				}
			};
		}
	} else if (browser && url.searchParams.size > 0) {
		const constituency = url.searchParams.get('constituency');

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
