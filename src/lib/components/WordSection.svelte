<script lang="ts">
	import type { Word } from '../types/Word';
	import Icon from '@iconify/svelte';
	import { getFavourites, displayToast } from '$lib/utils';
	import { createEventDispatcher } from 'svelte';

	export let word: Word;
	export let dispatchable: boolean;
	const dispatch = createEventDispatcher();

	let isPinned = wordIsInFavourites(word);

	function wordIsInFavourites(word: Word): boolean {
		const favourites = getFavourites();
		return favourites.some((fav: Word) => fav.value === word.value);
	}

	function addWordToFavourites(word: Word) {
		const favourites = localStorage.getItem('favourites');
		const newFavourites = favourites ? JSON.parse(favourites) : [];
		newFavourites.push(word);
		localStorage.setItem('favourites', JSON.stringify(newFavourites));
	}

	function removeWordFromFavourites(word: Word) {
		const favourites = localStorage.getItem('favourites');
		const newFavourites = favourites ? JSON.parse(favourites) : [];
		const index = newFavourites.findIndex((fav: Word) => fav.value === word.value);
		newFavourites.splice(index, 1);
		localStorage.setItem('favourites', JSON.stringify(newFavourites));
		if (dispatchable) {
			dispatch('remove', { word });
		}
	}

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

	function toggleDefinitions(event: MouseEvent) {
		const target = event.target as HTMLElement;
		const button = target.closest('button') as HTMLButtonElement;
		const row = button.closest('tr') as HTMLTableRowElement;
		const hiddenDefinitions = row.querySelectorAll('li.item');

		hiddenDefinitions.forEach((definition) => {
			definition.classList.toggle('hidden');
		});

		button.classList.toggle('rotate-180');
	}
</script>

<tr>
	<td class="text-2xl align-top p-1 m-1">
		<button on:click={togglePinnedWord} class="opacity-80 hover:opacity-100">
			<Icon icon="mdi:pin" class={isPinned ? 'text-primary' : 'text-gray-500'} />
		</button>
	</td>

	<td class="align-top text-xl p-1 m-1">
		<p>
			{word.value}
			<span class="text-sm font-extralight text-gray-400 text-nowrap align-top"
				>{word.pronunciation}</span
			>
		</p>
	</td>

	<td class="align-top text-sm w-1/2 p-1 m-1">
		<ol class="list-decimal list-inside">
			<li>{word.definitions[0]}</li>
			{#each word.definitions.slice(1, word.definitions.length) as definition}
				<li class="item hidden">{definition}</li>
			{/each}
		</ol>
	</td>

	<td class="text-3xl align-top p-1 m-1">
		{#if word.definitions.length > 1}
			<button on:click={toggleDefinitions} class="opacity-80 hover:opacity-100">
				<Icon icon="mdi:expand-more" />
			</button>
		{/if}
	</td>
</tr>
