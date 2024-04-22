<script>
	import Header from '$lib/components/Header.svelte';
	import '../lib/styles.css';
</script>

<!-- <nav>
	<a href="/">Home</a>
	<a href="/about">About</a>
	<a href="/lists">Lists</a>
</nav> -->

<main class=" max-w-xl mx-auto md:py-8">
	<Header />
	<main class="flex p-8 flex-col justify-center items-center">
		<slot></slot>
	</main>
</main>
