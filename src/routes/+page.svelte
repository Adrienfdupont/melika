<script lang="ts">
	import Header from '$lib/Header.svelte';
	import { getTranslationHistory } from '$lib/utils';
	import HistoryCard from '$lib/HistoryCard.svelte';
	import { onMount } from 'svelte';
	import type { HistoryResearch } from '$lib/types/HistoryResearch';
	import Navigation from '$lib/Navigation.svelte';

	let historyResearches: HistoryResearch[] = [];

	onMount(async () => {
		historyResearches = getTranslationHistory();
	});
</script>

<Header />

<main class="fixed top-16 bottom-12 left-0 right-0 overflow-y-scroll">
	<div class="container mx-auto lg:w-2/3 xl:w-1/2">
		{#each historyResearches as historyResearch}
			<HistoryCard {historyResearch} />
		{/each}
	</div>
</main>

<Navigation />