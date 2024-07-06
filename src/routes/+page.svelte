<script lang="ts">
	import Header from '$lib/Header.svelte';
	import { getTranslationHistory } from '$lib/utils';
	import HistoryCard from '$lib/HistoryCard.svelte';
	import { onMount } from 'svelte';
	import type { HistoryResearch } from '$lib/types/HistoryResearch';

	let historyIsLoaded = false;
	let historyResearches: HistoryResearch[] = [];
	let modalHistoryResearch: HistoryResearch | null;

	onMount(async () => {
		historyResearches = getTranslationHistory();
		historyIsLoaded = true;
	});

</script>

<Header />

<div class="overflow-y-scroll scrollbar-hidden p-2 overflow-visible">
	{#if historyIsLoaded}
		{#each historyResearches as historyResearch}
				<HistoryCard {historyResearch} />
		{/each}
	{/if}
</div>

{#if modalHistoryResearch}
	<div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
		<div class="bg-white p-4 rounded">
			<p>{modalHistoryResearch.input}</p>
			<p>{modalHistoryResearch.translation}</p>
			<button on:mousedown={() => modalHistoryResearch = null}>Close</button>
		</div>
	</div>
{/if}