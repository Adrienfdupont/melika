<script lang="ts">
	import type { Word } from '../types/Word';
	import Icon from '@iconify/svelte';
	import { addWordToFavourites, removeWordFromFavourites, wordIsInFavourites } from '$lib/utils';

	export let word: Word;

	let isStarred = wordIsInFavourites(word);

	function toggleStarredWord(event: MouseEvent) {
		const target = event.target as HTMLElement;
		const button = target.closest('button') as HTMLButtonElement;

		isStarred = !isStarred;
		if (isStarred) {
			button.classList.replace('text-gray-500', 'text-yellow-500');
			addWordToFavourites(word);
		} else {
			button.classList.replace('text-yellow-500', 'text-gray-500');
			removeWordFromFavourites(word);
		}
	}
</script>

<tr>
	<td class="align-top p-1 w-1/3">
		<p class="text-xl">
			{word.match}
			{#if (word.pronunciation)}
				<span class="text-base font-light">({word.pronunciation})</span>
			{/if}
		</p>
	</td>

	<td class="align-top p-1">
		<p>{word.definitions}</p>
	</td>

	<td class="text-right align-top p-1">
		<button class="text-xl" on:click={toggleStarredWord}>
			<Icon icon="mdi:star" class={isStarred ? 'text-yellow-500' : 'text-gray-500'} />
		</button>
	</td>
</tr>
