import { useWritable } from './shared-store';

export const selectedConstituency = () => useWritable('selectedConstituency', null);
