<script>
	import GenericField from './GenericField.svelte';
	import AttendanceMarker from './AttendanceMarker.svelte';

	export let age;
	export let education;
	export let attendance;

	$: console.log('String length', education.length);
</script>

<div class="grid grid-cols-2 w-2/3 gap-4 py-4">
	<GenericField
		title={'Education'}
		value={education}
		textHeight={education.length > 9 ? 'text-xl font-normal' : 'text-2xl'}
	/>
	<GenericField title={'Age'} value={age} />
</div>
<div class="w-1/3 gap-4 py-4 relative right-20">
	<AttendanceMarker value={attendance} />
</div>
