<script lang="ts">
	import { fadeButton } from '$lib/utils';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { languages } from '$lib/languages';

	let textToSearch: string;
	let sourceLanguage: string;
	let targetLanguage: string;
	let placeholder: string;

	onMount(() => {
		sourceLanguage = localStorage.getItem('sourceLanguage') ?? 'en';
		targetLanguage = localStorage.getItem('targetLanguage') ?? 'fa';
		document.querySelectorAll('select').forEach((option) => {
			option.classList.remove('hidden');
		});
		getPlaceholder();
	});

	function research() {
		fadeButton(document.querySelector('#search-button'));
		if (textToSearch.length > 0) {
			window.location.href = `/search?from=${sourceLanguage}&to=${targetLanguage}&text=${encodeURIComponent(textToSearch)}`;
		}
		document.querySelector('#spinner-modal').classList.remove('hidden');
		document.body.style.overflow = 'hidden';
	}

	function checkNewSourceLanguage() {
		if (sourceLanguage !== targetLanguage) {
			localStorage.setItem('sourceLanguage', sourceLanguage);
			getPlaceholder();
		} else {
			sourceLanguage = localStorage.getItem('sourceLanguage') ?? 'en';
		}
	}

	function checkNewTargetLanguage() {
		if (sourceLanguage !== targetLanguage) {
			localStorage.setItem('targetLanguage', targetLanguage);
		} else {
			targetLanguage = localStorage.getItem('targetLanguage') ?? 'fa';
		}
	}

	function switchLanguages() {
		sourceLanguage = localStorage.getItem('targetLanguage') ?? 'fa';
		targetLanguage = localStorage.getItem('sourceLanguage') ?? 'en';
		localStorage.setItem('sourceLanguage', sourceLanguage);
		localStorage.setItem('targetLanguage', targetLanguage);
		getPlaceholder();
	}

	function getPlaceholder() {
		placeholder = languages.find((lang) => lang.code === sourceLanguage).inputPlaceholder;
	}
</script>

<header class="sticky top-0 z-10 bg-secondary container mx-auto lg:w-2/3 xl:w-1/2">
	<div class="flex items-center gap-2 h-16 p-2">
		<a href="/">
			<Icon icon="mdi:home-outline" class="text-4xl"/>
		</a>
		<input
			bind:value={textToSearch}
			on:keydown={(e) => e.key === 'Enter' && research()}
			type="text"
			placeholder="{placeholder}"
			class="bg-transparent border-2 rounded-full w-full h-full px-4 outline-none"
		/>
		<button id="search-button" on:click={research}>
			<Icon icon="mdi:search"  class="text-3xl"/>
		</button>
	</div>

	<div class="flex justify-between items-center">
		<select bind:value={sourceLanguage} on:change={checkNewSourceLanguage} class="cursor-pointer hidden bg-primary rounded-full w-1/2 py-1 px-4 m-2 focus:outline-0">
			{#each languages as { code, nativeName, flag }}
				<option value="{code}">{flag}&emsp;{nativeName}</option>
			{/each}
		</select>

		<button on:click={switchLanguages}>
			<Icon icon="mdi:circle-arrows" class="text-3xl"/>
		</button>

		<select bind:value={targetLanguage} on:change={checkNewTargetLanguage} class="cursor-pointer hidden bg-primary rounded-full w-1/2 py-1 px-4 m-2 focus:outline-0">
			{#each languages as { code, nativeName, flag }}
				<option value="{code}">{flag}&emsp;{nativeName}</option>
			{/each}
		</select>
	</div>
</header>

<div id="spinner-modal" class="fixed inset-0 bg-black opacity-50 z-20 hidden">
	<div
		class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full h-32 w-32 border-8 border-t-secondary animate-spin"
	>
	</div>
</div>
