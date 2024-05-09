<script>
	import GenericField from './GenericField.svelte';
	import AttendanceMarker from './AttendanceMarker.svelte';

	export let age;
	export let education;
	export let attendance;
</script>

<div class="grid grid-cols-4 gap-10 pt-4">
	<div class="col-span-1">
		<GenericField
			title={'Education'}
			value={education}
			textHeight={education.length > 12 ? 'text-lg font-normal' : 'text-lg'}
		/>
	</div>
	<div class="col-span-1">
		<GenericField title={'Age'} value={age} />
	</div>

	<AttendanceMarker value={attendance} />
</div>
