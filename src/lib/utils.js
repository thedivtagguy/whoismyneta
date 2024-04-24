import { selectedConstituency, selectedCandidate } from './store';
import data from '../lib/data/data.json';
import { goto } from '$app/navigation';
import { range } from 'd3';

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
	const constituencyData = data.find(
		(constituencyData) => slugify(constituencyData.ls_seat_name) === constituency
	);

	if (constituencyData) {
		selectedConstituency.set(constituencyData);
	}

	goto(`/?constituency=${slugify(constituency)}`, { noScroll: true });
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

export function formatRupee(value) {
	if (value >= 10000000) {
		return (value / 10000000).toFixed(2) + ' Cr';
	} else if (value >= 100000) {
		return (value / 100000).toFixed(2) + ' L';
	} else {
		return new Intl.NumberFormat('en-IN', {
			style: 'currency',
			currency: 'INR',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		}).format(value);
	}
}

export function radiansToDegrees(radians) {
	return radians * (180 / Math.PI);
}

export function formatAge(value) {
	// no decimal places
	return new Intl.NumberFormat('en-IN', {
		style: 'decimal',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	}).format(value);
}

export function textMultiline(node) {
	const x = 0,
		y = 20,
		width = 360,
		lineHeight = 10;

	const element = node;
	const text = element.innerHTML;
	const words = text.split(' ');
	let line = '';

	const testElem = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
	testElem.textContent = 'busy';
	node.appendChild(testElem);

	for (let n = 0; n < words.length; n++) {
		const testLine = `${line}${words[n]} `;
		testElem.textContent = testLine;
		const metrics = testElem.getBoundingClientRect();
		const testWidth = metrics.width;

		if (testWidth > width && n > 0) {
			const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
			tspan.setAttribute('x', x);
			tspan.setAttribute('dy', y);
			tspan.textContent = line;
			element.appendChild(tspan);
			line = `${words[n]} `;
		} else {
			line = testLine;
		}
	}

	const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
	tspan.setAttribute('x', x);
	tspan.setAttribute('dy', y);
	tspan.textContent = line;
	element.appendChild(tspan);
	testElem.remove();
}

export const generateTickValues = (data, count, key) => {
	// Filter out any invalid or missing values
	const filteredData = data.filter((d) => typeof d[key] === 'number' && !isNaN(d[key]));

	// Calculate the maximum value
	const maxDataValue = Math.max(...filteredData.map((d) => d[key]));

	// Calculate the step size
	const step = maxDataValue / (count - 1);

	// Generate evenly spaced tick values
	return range(0, maxDataValue + 1, step);
};
