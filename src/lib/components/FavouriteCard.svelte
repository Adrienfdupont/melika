<script lang="ts">
	import type { Word } from '$lib/types/Word';
	import { extendCard, removeWordFromFavourites } from '$lib/utils';
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';

	export let word: Word;
	const dispatch = createEventDispatcher();
</script>

<div class="flex justify-between flex-shrink-0 bg-primary rounded p-4 m-2"
		 on:mousedown={extendCard} role="button" tabindex="0"
>
	<div class="whitespace-nowrap overflow-hidden text-ellipsis">{word.match}
		<span class="font-light">({word.pronunciation})</span>
		<span>{word.definitions}</span>
	</div>

	<div class="flex items-center ml-2">
		<button on:mousedown={() => {removeWordFromFavourites(word); dispatch('remove')}}>
			<Icon icon="mdi:close" class="text-xl"/>
		</button>
	</div>
</div>