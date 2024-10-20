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
	<td class="align-top text-xl p-1 w-1/2">
		<p>
			{word.match}
			{#if (word.pronunciation)}
				<span class="text-sm font-extralight">{word.pronunciation}</span>
			{/if}
		</p>
	</td>

	<td class="align-top p-1 text-sm">
		<p>{word.definitions}</p>
	</td>

	<td class="text-right text-xl align-top p-1">
		<button on:click={toggleStarredWord}>
			<Icon icon="mdi:star" class={isStarred ? 'text-yellow-500' : 'text-gray-500'} />
		</button>
	</td>
</tr>
