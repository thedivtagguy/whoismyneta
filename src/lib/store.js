import { writable } from 'svelte/store';
import { dirtyStore } from 'svelte-ux';
export const selectedConstituency = writable({});
export const selectedCandidate = writable({});
export const searchMode = writable('location');
export const firstClickOnModal = writable(false);
export const isDirty = dirtyStore(firstClickOnModal);
