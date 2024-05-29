<script lang="ts">
	import Header from '$lib/Header.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import type { extractedData } from '$lib/types/extractedData';

	export let data: PageData;

	function extractWordData(html: string): extractedData {
		const htmlDOM = new DOMParser().parseFromString(html, 'text/html');

		const definitionItems = htmlDOM.querySelector('ol')?.querySelectorAll('li');
		const definitions: string[] = [];
		definitionItems?.forEach((item) => {
			if (item.textContent) definitions.push(item.textContent);
		});

		return {
			pronunciation: htmlDOM.querySelector('.headword-tr')?.textContent ?? null,
			definitions
		};
	}

	onMount(async () => {
		console.log(data.translation);

		data.wordData.forEach((word) => {
			if (word.page) word.extractedData = extractWordData(word.page);
		});
		console.log(data.wordData);
	});
</script>

<Header />
