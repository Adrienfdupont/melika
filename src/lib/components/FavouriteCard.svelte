<script lang="ts">
	import type { Word } from '$lib/types/Word';
	import { extendCard, removeWordFromFavourites } from '$lib/utils';
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';

	export let word: Word;
	const dispatch = createEventDispatcher();

	function handleRemove() {
		removeWordFromFavourites(word);
		dispatch('remove', { word });
	}
</script>

<div class="flex justify-between flex-shrink-0 bg-primary-bis rounded p-4 m-2"
		 on:mousedown={extendCard} role="button" tabindex="0"
>
	<div class="whitespace-nowrap overflow-hidden text-ellipsis">
		<span>{word.match}</span>
		<span class="text-sm font-extralight text-gray-400 mr-2">{word.pronunciations.join(', ')}</span>
		<span>{word.definitions.join(', ')}</span>
	</div>

	<div class="flex items-center ml-2">
		<button on:mousedown={handleRemove} class="hover:opacity-50">
			<Icon icon="mdi:close" class="text-xl"/>
		</button>
	</div>
</div>