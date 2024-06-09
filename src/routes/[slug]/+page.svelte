<script lang="ts">
	import Header from '$lib/Header.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import type { Word } from '$lib/types/word';
	import type { Page } from '$lib/types/page';

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

<main>
	<p>{data.input}</p>
	<p>{data.translation}</p>

	<br />

	{#if isDataLoaded}
		{#each words as word}
			<section>
				<p>{word.match} <span>({word.pronunciation})</span></p>
				<ol>
					{#each word.definitions as definition, i}
						<li><span>{i + 1}. </span>{definition}</li>
					{/each}
				</ol>
			</section>
			<br />
		{/each}
	{/if}
</main>
