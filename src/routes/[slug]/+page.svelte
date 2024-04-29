<script lang="ts">
	import Header from '$lib/Header.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	function extractPageContent(html: string) {
		console.log('------');
		const htmlDOM = new DOMParser().parseFromString(html, 'text/html');

		htmlDOM.querySelectorAll('span.IPA').forEach((phonetic) => {
			//const dialect = phonetic.closest('li')?.querySelector('a.extiw')?.textContent;
			//console.log(`${dialect} : ${phonetic.textContent}`);
		});

		const pronunciation = htmlDOM.querySelector('.headword-tr');
		console.log(pronunciation?.textContent);
	}

	onMount(async () => {
		console.log(data.translation);
		data.pages.forEach((page) => {
			extractPageContent(page);
		});
	});
</script>

<Header />
