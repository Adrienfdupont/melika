<script lang="ts">
	import { onMount } from 'svelte';
	import WordSection from '$lib/components/WordSection.svelte';
	import { getTranslationHistory } from '$lib/utils';
	import type { HistoryResearch } from '$lib/types/HistoryResearch';
	import Icon from '@iconify/svelte';
	import type { TranslationResult } from '$lib/types/TranslationResult';

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
		navigator.clipboard.writeText(document.querySelector('#textToSearch')?.textContent ?? '');
		fadeButton(document.querySelector('#copy-button')!);
	}

	function addTranslationToHistory(input: string, translation: string) {
		const history = getTranslationHistory();
		const index = history.findIndex((research: HistoryResearch) => research.input === input);
		if (index !== -1) {
			history.splice(index, 1);
		}
		if (history.length >= 50) {
			history.shift();
		}
		history.push({ input, translation });
		localStorage.setItem('translationHistory', JSON.stringify(history));
	}
</script>

<main class="p-2 flex flex-col gap-y-8 container mx-auto lg:w-2/3 xl:w-1/2">
	<div>
		<section class="text-2xl p-2 relative pr-12 bg-primary-bis xl:min-w-96 -z-10">
			<p>{data.input}</p>
			<p id="textToSearch">{data.translation}</p>
			<button
				id="copy-button"
				class="absolute right-2 bottom-2 hover:opacity-50"
				on:mousedown={copyTranslationToClipboard}
			>
				<Icon icon="mdi:content-copy" />
			</button>
		</section>
	</div>

	{#if isDataLoaded}
		<section>
			<table class="w-full">
				{#each data.words as word}
					<WordSection {word} />
				{/each}
			</table>
		</section>
	{/if}
</main>
