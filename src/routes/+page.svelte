<script lang="ts">
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

	function handleRemove(event: CustomEvent<{ word: Word }>) {
		favouriteWords = favouriteWords.filter((w) => w.word !== event.detail.word.word);
	}
</script>

<nav class="container mx-auto lg:w-2/3 xl:w-1/2 flex sticky w-full bg-secondary text-xl py-2">
	<button
		on:click={switchTabs}
		disabled={showHistory}
		class="w-1/2 border-b-4 flex justify-center items-center gap-1 pb-2 {showHistory
			? 'border-primary'
			: 'border-transparent'}"
	>
		<span><Icon icon="mdi:history" class="text-3xl" /></span> History
	</button>

	<button
		on:click={switchTabs}
		disabled={showFavourites}
		class="w-1/2 border-b-4 flex justify-center items-center gap-1 pb-2 {showFavourites
			? 'border-primary'
			: 'border-transparent'}"
	>
		<span><Icon icon="mdi:pin-outline" class="text-3xl" /></span> Pinned
	</button>
</nav>

<main class="container mx-auto lg:w-2/3 xl:w-1/2 pb-1">
	{#if showHistory}
		<div>
			{#if historyResearches.length === 0}
				<p class="text-center text-xl m-10">There is no research to show</p>
			{/if}
			{#each historyResearches as historyResearch}
				<HistoryCard {historyResearch} />
			{/each}
		</div>
	{/if}

	{#if showFavourites}
		<div>
			{#if favouriteWords.length === 0}
				<p class="text-center text-xl m-10">You haven't pinned any word yet</p>
			{/if}
			{#each favouriteWords as word}
				<FavouriteCard {word} on:remove={handleRemove} />
			{/each}
		</div>
	{/if}
</main>
