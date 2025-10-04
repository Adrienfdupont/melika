<script lang="ts">
	import type { WordData } from '$lib/types/WordData';
	import { extendCard, removeWordFromFavourites } from '$lib/utils';
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';

	export let wordData: WordData;
	const dispatch = createEventDispatcher();

	function handleRemove() {
		removeWordFromFavourites(wordData);
		dispatch('remove', { wordData });
	}
</script>

<div
	class="flex justify-between flex-shrink-0 bg-primary-bis rounded p-4 m-2"
	on:mousedown={extendCard}
	role="button"
	tabindex="0"
>
	<div class="whitespace-nowrap overflow-hidden text-ellipsis">
		<span>{wordData.word}</span>
		<span class="text-sm font-extralight text-gray-400 mr-2">{wordData.pronunciation}</span>
		<span>{wordData.definitions.join(', ')}</span>
	</div>

	<div class="flex items-center ml-2">
		<button on:mousedown={handleRemove} class="hover:opacity-50">
			<Icon icon="mdi:close" class="text-xl" />
		</button>
	</div>
</div>
