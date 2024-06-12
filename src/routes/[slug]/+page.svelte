<script lang="ts">
	import Header from '$lib/Header.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import type { Word } from '$lib/types/Word';
	import type { Page } from '$lib/types/Page';
	import WordSection from '$lib/WordSection.svelte';

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

	onMount(async () => {
		data.pages.forEach((page) => {
			words.push(extractWordData(page));
		});
		isDataLoaded = true;
	});
</script>

<Header />

<div class="p-2">
	<p class="text-3xl">{data.input}</p>
	<p class="text-3xl">{data.translation}</p>

	<br />

	{#if isDataLoaded}
		{#each words as word}
			<WordSection {word} />
		{/each}
	{/if}
</div>
