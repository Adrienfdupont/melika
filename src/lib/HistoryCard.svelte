<script lang="ts">
	import type { HistoryResearch } from '$lib/types/HistoryResearch';
	import { extendCard } from '$lib/utils';

	export let historyResearch: HistoryResearch;
</script>

<div class="flex-shrink-0 bg-primary rounded p-4 m-2"
		 on:mousedown={extendCard} role="button" tabindex="0"
>
	<div class="whitespace-nowrap overflow-hidden text-ellipsis text-left">{historyResearch.input}</div>
	<div class="whitespace-nowrap overflow-hidden text-ellipsis text-left">{historyResearch.translation}</div>
</div>