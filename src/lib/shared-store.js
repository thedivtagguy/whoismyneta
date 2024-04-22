import { getContext, hasContext, setContext } from 'svelte';
import { readable, writable } from 'svelte/store';

// context for any type of store
export function useSharedStore(name, fn, defaultValue) {
	if (hasContext(name)) {
		return getContext(name);
	}
	const _value = fn(defaultValue);
	setContext(name, _value);
	return _value;
}

// writable store context
export function useWritable(name, value) {
	return useSharedStore(name, writable, value);
}

// readable store context
export function useReadable(name, value) {
	return useSharedStore(name, readable, value);
}
