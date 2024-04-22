import { selectedConstituency, selectedCandidate } from './store';
import data from '../lib/data/data.json';
import { goto } from '$app/navigation';

/**
 * Converts a string to a slug by removing spaces and special characters.
 *
 * @param {string} str - The string to be slugified.
 * @returns {string} - The slugified string.
 */
export function slugify(str) {
	if (!str) {
		return '';
	}
	return str
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^a-z0-9-]/g, '');
}

export function setConstituency(constituency = '') {
	console.log('setConstituency', constituency);
	const constituencyData = data.find(
		(constituencyData) => slugify(constituencyData.ls_seat_name) === constituency
	);

	if (constituencyData) {
		selectedConstituency.set(constituencyData);
	}

	goto(`/?constituency=${slugify(constituency)}`);
}

export function setCandidate(candidate = '') {
	const candidateData = data.find(
		(candidateData) => slugify(candidateData.candidate) === candidate
	);

	if (candidateData) {
		selectedCandidate.set(candidateData);
	}

	goto(`/?candidate=${slugify(candidate)}`);
}
