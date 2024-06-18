<script lang="ts">
	import Header from '$lib/Header.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import type { Word } from '$lib/types/Word';
	import type { Page } from '$lib/types/Page';
	import WordSection from '$lib/WordSection.svelte';
	import copy from '$lib/assets/copy.svg';

	export let data: PageData;
	let isDataLoaded = false;
	const words: Word[] = [];

	function extractWordData(page: Page): Word {
		const htmlDOM = new DOMParser().parseFromString(page.content, 'text/html');
		const definitionItems = htmlDOM.querySelector('ol')?.querySelectorAll('li');
		const definitions: string[] = [];

		definitionItems?.forEach((item) => {
			item.childNodes.forEach((child) => {
				if (child.nodeName === 'A') {
					definitions.push(child.textContent ?? '');
				}
			});
		});

		return {
			target: page.targetWord,
			match: page.matchedWord,
			pronunciation: htmlDOM.querySelector('.headword-tr')?.textContent ?? '',
			definitions
		};
	}

	function copyToClipboard() {
		navigator.clipboard.writeText(document.querySelector('#textToSearch')?.textContent ?? '');
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
	<section class="text-2xl p-2 border-2 border-primary relative">
		<p>{data.input}</p>
		<p id="textToSearch">{data.translation}</p>
		<button on:click={copyToClipboard} class="absolute right-2 bottom-2">
			<img src={copy} alt="Copy to clipboard" />
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
