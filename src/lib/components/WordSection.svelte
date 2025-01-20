<script lang="ts">
	import type { Word } from '../types/Word';
	import Icon from '@iconify/svelte';
	import { addWordToFavourites, displayToast, removeWordFromFavourites, wordIsInFavourites } from '$lib/utils';

	export let word: Word;

	let isPinned = wordIsInFavourites(word);

	function togglePinnedWord(event: MouseEvent) {
		const target = event.target as HTMLElement;
		const button = target.closest('button') as HTMLButtonElement;

		isPinned = !isPinned;
		if (isPinned) {
			button.classList.replace('text-gray-500', 'text-yellow-500');
			addWordToFavourites(word);
			displayToast('Word has been pinned');
		} else {
			button.classList.replace('text-yellow-500', 'text-gray-500');
			removeWordFromFavourites(word);
			displayToast('Word has been unpinned');
		}
	}
</script>

<tr>
	<td class="align-top text-xl p-1 w-1/2">
		<p>
			{word.match}
			{#if (word.pronunciations?.length > 0)}
				<span class="text-sm font-extralight text-gray-400">{word.pronunciations.join(', ')}</span>
			{/if}
		</p>
	</td>

	<td class="align-top p-1 text-sm">
		<p>{word.definitions}</p>
	</td>

	<td class="text-right text-xl align-top p-1">
		<button on:click={togglePinnedWord} class="hover:opacity-50">
			<Icon icon="mdi:pin" class={isPinned ? 'text-primary' : 'text-gray-500'} />
		</button>
	</td>
</tr>
