<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import type { Word } from '$lib/types/Word';
	import WordSection from '$lib/components/WordSection.svelte';
	import { extractWordData, fadeButton, addTranslationToHistory } from '$lib/utils';
	import Icon from '@iconify/svelte';

	export let data: PageData;
	let isDataLoaded = false;
	const words: Word[] = [];

	function copyTranslationToClipboard() {
		navigator.clipboard.writeText(document.querySelector('#textToSearch')?.textContent ?? '');
		fadeButton(document.querySelector('#copy-button')!);
	}

	onMount(async () => {
		data.pages.forEach((page) => {
			words.push(extractWordData(page));
		});
		isDataLoaded = true;
		addTranslationToHistory(data.input, data.translation);
	});
</script>

<Header />

<main class="p-2 flex flex-col gap-y-8 container mx-auto lg:w-2/3 xl:w-1/2">
	<div>
		<section class="text-2xl p-2 relative pr-12 bg-primary-bis xl:min-w-96">
		<p>{data.input}</p>
		<p id="textToSearch">{data.translation}</p>
		<button id="copy-button" class="absolute right-2 bottom-2" on:mousedown={copyTranslationToClipboard}>
			<Icon icon="mdi:content-copy" />
		</button>
		</section>
	</div>

	{#if isDataLoaded}
		<section>
			<table class="w-full">
				{#each words as word}
					<WordSection {word} />
				{/each}
			</table>
		</section>
	{/if}
</main>
