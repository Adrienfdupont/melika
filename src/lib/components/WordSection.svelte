<script lang="ts">
	import type { Word } from '../types/Word';
	import Icon from '@iconify/svelte';
	import { getFavourites, displayToast } from '$lib/utils';
	import { createEventDispatcher } from 'svelte';

	export let word: Word;
	export let dispatchable: boolean;
	const dispatch = createEventDispatcher();

	let isPinned = wordIsInFavourites(word);
	let definitionsExpanded = false;

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
		definitionsExpanded = !definitionsExpanded;
		button.classList.toggle('rotate-180');
	}
</script>

<div class="flex justify-between bg-primary-bis rounded gap-3 p-4 m-2 word-section">
	<div class="flex justify-start w-1/3 gap-2">
		<div class="text-2xl align-top">
			<button on:click={togglePinnedWord} class="opacity-80 hover:opacity-100">
				<Icon icon="mdi:pin" class={isPinned ? 'text-primary' : 'text-gray-500'} />
			</button>
		</div>

		<div class="align-top text-xl">
			<p>
				{word.value}
				<span class="text-sm font-extralight text-gray-400 text-nowrap align-top"
					>{word.pronunciation}</span
				>
			</p>
		</div>
	</div>

	<div class="flex justify-between w-2/3 gap-2">
		<div class="align-top text-sm">
			<ol class="list-decimal list-inside">
				<li>{word.definitions[0]}</li>
				{#each word.definitions.slice(1, word.definitions.length) as definition (definition)}
					<li class="item mt-2 overflow-hidden" class:expanded={definitionsExpanded}>
						<div class="definition-content">{definition}</div>
					</li>
				{/each}
			</ol>
		</div>

		<div class="text-3xl align-top">
			{#if word.definitions.length > 1}
				<button
					on:click={toggleDefinitions}
					class="opacity-80 hover:opacity-100 transition-transform duration-300"
				>
					<Icon icon="mdi:expand-more" />
				</button>
			{/if}
		</div>
	</div>
</div>

<style>
	.item {
		max-height: 0;
		opacity: 0;
		transform: translateY(-10px);
		transition:
			max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
			opacity 0.3s ease-in-out,
			transform 0.3s ease-in-out;
	}

	.item.expanded {
		max-height: 500px;
		opacity: 1;
		transform: translateY(0);
	}

	.definition-content {
		padding-bottom: 2px;
	}
</style>
