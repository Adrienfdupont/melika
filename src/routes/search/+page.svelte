<script lang="ts">
	import { onMount } from 'svelte';
	import WordSection from '$lib/components/WordSection.svelte';
	import Icon from '@iconify/svelte';
	import type { TranslationResult } from '$lib/types/TranslationResult';
	import type { HistoryResearch } from '$lib/types/HistoryResearch';
	import { displayToast, getTranslationHistory } from '$lib/utils';

	export let data: TranslationResult;
	let isDataLoaded = false;

	onMount(async () => {
		isDataLoaded = true;
		addTranslationToHistory(data.input, data.translation);
	});

	function fadeButton(button: HTMLButtonElement) {
		if (button.classList.contains('animate-fade')) {
			button.classList.remove('animate-fade');
		}
		setTimeout(() => {
			button.classList.add('animate-fade');
		}, 10);
	}

	function copyTranslationToClipboard() {
		console.log('Copy button clicked');
		navigator.clipboard.writeText(document.querySelector('#textToSearch')?.textContent ?? '');
		fadeButton(document.querySelector('#copy-button')!);
		displayToast('Translation copied to clipboard');
	}

	export function addTranslationToHistory(input: string, translation: string): void {
		let history = getTranslationHistory();
		history = history.filter((entry) => entry.input !== input);
		if (history.length >= 20) {
			history = history.slice(0, 19);
		}
		const newEntry: HistoryResearch = {
			input,
			translation
		};
		history.unshift(newEntry);
		localStorage.setItem('translationHistory', JSON.stringify(history));
	}
</script>

<main class="p-2 flex flex-col gap-y-8 container mx-auto lg:w-2/3 xl:w-1/2">
	<div>
		<section class="text-2xl p-2 relative pr-12 bg-primary-bis xl:min-w-96 rounded">
			<p>{data.input}</p>
			<p id="textToSearch">{data.translation}</p>
			<button
				id="copy-button"
				class="absolute right-2 bottom-2 opacity-80 hover:opacity-100"
				on:click={copyTranslationToClipboard}
			>
				<Icon icon="mdi:content-copy" />
			</button>
		</section>
	</div>

	{#if isDataLoaded}
		<section>
			<table class="w-full">
				{#each data.words as word}
					<WordSection {word} dispatchable={false} />
				{/each}
			</table>
		</section>
	{/if}
</main>
