import { writable } from 'svelte/store';

export const selectedConstituency = writable({});
export const selectedCandidate = writable({});
export const searchMode = writable('location');
