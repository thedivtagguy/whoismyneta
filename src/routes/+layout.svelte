<script>
	import Header from '$lib/components/Header.svelte';
	import '../lib/styles.css';
</script>

<!-- <nav>
	<a href="/">Home</a>
	<a href="/about">About</a>
	<a href="/lists">Lists</a>
</nav> -->

<main
	class="min-h-[90vh] h-fit flex flex-col w-full justify-center items-center max-w-6xl mx-auto mt-4"
>
	<Header />
	<main class="md:px-0 w-full px-2 py-2 md:flex-row flex flex-col justify-center items-center">
		<slot></slot>
	</main>
</main>
<footer class="bg-surface-100 px-2 py-4 max-w-6xl mx-auto">
	<h3 class=" font-semibold text-neutral-600 text-xs">Methodology</h3>
	<p class="text-left text-neutral-500 text-xs"></p>
</footer>
