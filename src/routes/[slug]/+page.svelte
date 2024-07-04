<script lang="ts">
	import Header from '$lib/Header.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import type { Word } from '$lib/types/Word';
	import WordSection from '$lib/WordSection.svelte';
	import copy from '$lib/assets/copy.svg';
	import { extractWordData, fadeButton } from '$lib/utils';

	export let data: PageData;
	let isDataLoaded = false;
	const words: Word[] = [];

	function copyTranslationToClipboard() {
		navigator.clipboard.writeText(document.querySelector('#textToSearch')?.textContent ?? '');
		fadeButton(document.querySelector('#copy-button'));
	}

	onMount(async () => {
		data.pages.forEach((page) => {
			words.push(extractWordData(page));
		});
		isDataLoaded = true;
	});
</script>

<Header />

<div class="p-2 flex flex-col gap-y-8">
	<section class="text-2xl p-2 relative pr-4 bg-primary">
		<p>{data.input}</p>
		<p id="textToSearch">{data.translation}</p>
		<button id="copy-button" class="absolute right-2 bottom-2" on:mousedown={copyTranslationToClipboard}>
			<img src={copy} alt="Copy translation to clipboard" />
		</button>
	</section>

	<section>
		{#if isDataLoaded}
			<table>
				{#each words as word}
					<WordSection {word} />
				{/each}
			</table>
		{/if}
	</section>
</div>
