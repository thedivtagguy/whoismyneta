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

			const constituencies = data.filter(
				(constituencyData) => constituencyData.state_ut_name === state
			);

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
