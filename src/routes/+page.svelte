<script lang="ts">
	import Header from '$lib/Header.svelte';
	import { getTranslationHistory } from '$lib/utils';
	import HistoryCard from '$lib/HistoryCard.svelte';
	import { onMount } from 'svelte';
	import type { HistoryResearch } from '$lib/types/HistoryResearch';

	let historyResearches: HistoryResearch[] = [];

	onMount(async () => {
		historyResearches = getTranslationHistory();
	});

</script>

<Header />

<div class="overflow-y-scroll scrollbar-hidden p-2 overflow-visible">
	{#each historyResearches as historyResearch}
		<HistoryCard {historyResearch} />
	{/each}
</div>
