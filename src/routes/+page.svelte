<script lang="ts">
	import Header from '$lib/Header.svelte';
	import { getFavourites, getTranslationHistory } from '$lib/utils';
	import HistoryCard from '$lib/HistoryCard.svelte';
	import { onMount } from 'svelte';
	import type { HistoryResearch } from '$lib/types/HistoryResearch';
	import Icon from '@iconify/svelte';
	import type { Word } from '$lib/types/Word';
	import FavouriteCard from '$lib/FavouriteCard.svelte';

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

<nav class="flex sticky w-full top-16 bg-secondary p-1">
	<div class="w-1/2 flex justify-center">
		<button on:click={switchTabs} disabled={showHistory}>
			<Icon icon="mdi:history" class="w-8 h-8" />
		</button>
	</div>

	<div class="w-1/2 flex justify-center">
		<button on:click={switchTabs} disabled={showFavourites}>
			<Icon icon="mdi:star-outline" class="w-8 h-8"/>
		</button>
	</div>
</nav>

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
			<FavouriteCard {word} on:remove={() => {favouriteWords = getFavourites()}}/>
		{/each}
	</div>
{/if}
