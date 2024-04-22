import data from '../lib/data/data.json';
import { browser } from '$app/environment';
import { selectedCandidate, selectedConstituency } from '$lib/store';
import { slugify } from '$lib/utils';
export const load = async ({ url }) => {
	const searchParams = browser && url.searchParams;

	if (!searchParams) {
		return {
			status: 200
		};
	} else {
		const constituency = searchParams.get('constituency');
		const candidate = searchParams.get('candidate');

		if (constituency) {
			const constituencyData = data.find(
				(constituencyData) => slugify(constituencyData.ls_seat_name) === constituency
			);

			if (constituencyData) {
				selectedConstituency.set(constituencyData);
			}
		}

		if (candidate) {
			const candidateData = data.find(
				(candidateData) => slugify(candidateData.candidate) === candidate
			);

			if (candidateData) {
				selectedCandidate.set(candidateData);
			}
		}

		return {
			status: 200
		};
	}
};
