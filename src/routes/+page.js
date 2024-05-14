import data from '../lib/data/data.json';
import { browser } from '$app/environment';
import { selectedConstituency } from '$lib/store';
import { slugify } from '$lib/utils';
import { dev } from '$app/environment';

export const load = async ({ fetch, url }) => {
	if (browser && url.searchParams.size === 0) {
		// Dev has no Netlify functions so just return random constituencies
		if (dev) {
			const loadConstituencies = getRandomConstituencies(5);
			return {
				status: 200,
				body: {
					loadConstituencies
				}
			};

			// If we can geolocate the user, get the state and return constituencies from that state
		} else {
			const state = await getGeoLocationState(fetch);
			const constituencies = getConstituenciesByState(state);
			const loadConstituencies = getRandomConstituencies(constituencies, 5);
			return {
				status: 200,
				body: {
					loadConstituencies
				}
			};
		}
		// But we might have users who are navigating to a specific constituency
	} else if (browser && url.searchParams.size > 0) {
		const constituency = url.searchParams.get('constituency');
		if (constituency) {
			const constituencyData = getConstituencyDataBySlug(constituency);
			if (constituencyData) {
				selectedConstituency.set(constituencyData);
			}
		}
		return {
			status: 200
		};
	}
};

function getRandomConstituencies(count) {
	return data.sort(() => 0.5 - Math.random()).slice(0, count);
}

async function getGeoLocationState(fetch) {
	const response = await fetch('/geolocation');
	const {
		geo: {
			subdivision: { name: state }
		}
	} = await response.json();
	return state;
}

function getConstituenciesByState(state) {
	let constituencies = data.filter((constituencyData) => constituencyData.state_ut_name === state);
	if (constituencies.length === 0) {
		const randomState = data[Math.floor(Math.random() * data.length)].state_ut_name;
		constituencies = data.filter(
			(constituencyData) => constituencyData.state_ut_name === randomState
		);
	}
	return constituencies;
}

function getConstituencyDataBySlug(slug) {
	return data.find((constituencyData) => slugify(constituencyData.ls_seat_name) === slug);
}
