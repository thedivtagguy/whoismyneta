<script>
	import Header from '$lib/components/Header.svelte';
	import '../lib/styles.css';
</script>

<!-- <nav>
	<a href="/">Home</a>
	<a href="/about">About</a>
	<a href="/lists">Lists</a>
</nav> -->

<main class=" max-w-6xl mx-auto md:py-8">
	<Header />
	<main class="md:px-0 px-2 py-2 md:flex-row flex flex-col justify-center items-center">
		<slot></slot>
	</main>
</main>
