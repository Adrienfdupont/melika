<script lang="ts">
	import FavouriteCard from '$lib/FavouriteCard.svelte';
	import { onMount } from 'svelte';
	import { getFavourites } from '$lib/utils';
	import type { Word } from '$lib/types/Word';
	import Navigation from '$lib/Navigation.svelte';
	import Header from '$lib/Header.svelte';

	let favouriteWords: Word[] = [];

	onMount(async () => {
		favouriteWords = getFavourites();
	});
</script>

<Header />

<main class="fixed top-16 bottom-12 left-0 right-0 overflow-y-scroll">
	<div>
		{#each favouriteWords as word}
			<FavouriteCard {word} on:remove={() => {favouriteWords = getFavourites()}}/>
		{/each}
	</div>
</main>

<Navigation />