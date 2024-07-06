<script lang="ts">
	import type { HistoryResearch } from '$lib/types/HistoryResearch';
	import { extendCard } from '$lib/utils';

	export let historyResearch: HistoryResearch;
</script>

<button class="flex-shrink-0 bg-primary rounded p-4 w-full my-1" on:click={extendCard}>
	<p class="whitespace-nowrap overflow-hidden text-ellipsis text-left">{historyResearch.input}</p>
	<p class="whitespace-nowrap overflow-hidden text-ellipsis text-left">{historyResearch.translation}</p>
</button>