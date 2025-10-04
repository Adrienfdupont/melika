<script lang="ts">
	import type { WordData } from '../types/WordData';
	import Icon from '@iconify/svelte';
	import { getFavourites } from '$lib/utils';

	export let wordData: WordData;

	let isPinned = wordIsInFavourites(wordData);

	function wordIsInFavourites(word: WordData): boolean {
		const favourites = getFavourites();
		return favourites.some((fav: WordData) => fav.word === word.word);
	}

	function displayToast(message: string) {
		const existingToasts = document.querySelectorAll('.toast');
		existingToasts.forEach((toast) => toast.remove());

		const toast = document.createElement('div');
		toast.textContent = message;
		toast.className =
			'toast fixed bottom-4 left-1/2 text-center transform -translate-x-1/2 bg-primary-bis text-white py-2 px-4 rounded transition-opacity duration-500 w-full max-w-xs';
		document.body.appendChild(toast);

		setTimeout(() => {
			toast.classList.add('opacity-0');
			setTimeout(() => {
				toast.remove();
			}, 500);
		}, 3000);
	}

	function addWordToFavourites(word: WordData) {
		const favourites = localStorage.getItem('favourites');
		const newFavourites = favourites ? JSON.parse(favourites) : [];
		newFavourites.push(word);
		localStorage.setItem('favourites', JSON.stringify(newFavourites));
	}

	function removeWordFromFavourites(word: WordData) {
		const favourites = localStorage.getItem('favourites');
		const newFavourites = favourites ? JSON.parse(favourites) : [];
		const index = newFavourites.findIndex((fav: WordData) => fav.word === word.word);
		newFavourites.splice(index, 1);
		localStorage.setItem('favourites', JSON.stringify(newFavourites));
	}

	function togglePinnedWord(event: MouseEvent) {
		const target = event.target as HTMLElement;
		const button = target.closest('button') as HTMLButtonElement;

		isPinned = !isPinned;
		if (isPinned) {
			button.classList.replace('text-gray-500', 'text-yellow-500');
			addWordToFavourites(wordData);
			displayToast('Word has been pinned');
		} else {
			button.classList.replace('text-yellow-500', 'text-gray-500');
			removeWordFromFavourites(wordData);
			displayToast('Word has been unpinned');
		}
	}
</script>

<tr>
	<td class="align-top text-xl p-1 w-1/2">
		<p>
			{wordData.word}
			<span class="text-sm font-extralight text-gray-400">{wordData.pronunciation}</span>
		</p>
	</td>

	<td class="align-top p-1 text-sm">
		<ol class="list-decimal">
			{#each wordData.definitions.slice(0, 3) as definition}
				<li>{definition}</li>
			{/each}
		</ol>
	</td>

	<td class="text-right text-xl align-top p-1">
		<button on:click={togglePinnedWord} class="hover:opacity-50">
			<Icon icon="mdi:pin" class={isPinned ? 'text-primary' : 'text-gray-500'} />
		</button>
	</td>
</tr>
