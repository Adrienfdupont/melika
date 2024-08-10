<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { getFavourites, getTranslationHistory } from '$lib/utils';
	import HistoryCard from '$lib/components/HistoryCard.svelte';
	import { onMount } from 'svelte';
	import type { HistoryResearch } from '$lib/types/HistoryResearch';
	import Icon from '@iconify/svelte';
	import type { Word } from '$lib/types/Word';
	import FavouriteCard from '$lib/components/FavouriteCard.svelte';

	let historyResearches: HistoryResearch[] = [];
	let favouriteWords: Word[] = [];
	let showHistory = true;
	let showFavourites = false;

	onMount(async () => {
		historyResearches = getTranslationHistory();
		favouriteWords = getFavourites();
	});

	function switchTabs() {
		showHistory = !showHistory;
		showFavourites = !showFavourites;
	}
</script>

<Header />

<nav class="container mx-auto lg:w-2/3 xl:w-1/2 flex sticky w-full bg-secondary text-xl py-2">
	<button on:click={switchTabs} disabled={showHistory}
		class="w-1/2 border-b-4 flex justify-center items-center gap-1 pb-2 {showHistory ? 'border-primary' : 'border-transparent'}"
	>
		<span><Icon icon="mdi:history" class="text-3xl"/></span> History
	</button>

	<button on:click={switchTabs} disabled={showFavourites}
		class="w-1/2 border-b-4 flex justify-center items-center gap-1 pb-2 {showFavourites ? 'border-primary' : 'border-transparent'}"
	>
		<span><Icon icon="mdi:star-outline" class="text-3xl"/></span> Favourites
	</button>
</nav>

<main class="container mx-auto lg:w-2/3 xl:w-1/2 pb-1">
	{#if showHistory}
		<div>
			{#each historyResearches as historyResearch}
				<HistoryCard {historyResearch} />
			{/each}
		</div>
	{/if}

	{#if showFavourites}
		<div>
			{#each favouriteWords as word}
				<FavouriteCard {word} on:remove={() => favouriteWords = getFavourites()}/>
			{/each}
		</div>
	{/if}
</main>
