<script lang="ts">
	import Icon from '@iconify/svelte';
	import '../app.css';
	import { onMount } from 'svelte';

	let textToSearch: string;
	let sourceLang: string;
	let targetLang: string;
	let placeholderText: string;
	const englishPlaceholder = 'Translate into Persian';
	const persianPlaceholder = 'به انگلیسی ترجمه کنید';

	onMount(() => {
		sourceLang = localStorage.sourceLang || 'en';
		targetLang = localStorage.targetLang || 'fa';
		placeholderText = targetLang === 'fa' ? englishPlaceholder : persianPlaceholder;
	});

	function research() {
		if (textToSearch.length > 0) {
			const url = new URL(window.location.href);
			url.pathname = '/search';
			url.searchParams.set('input', textToSearch);
			url.searchParams.set('from', sourceLang);
			url.searchParams.set('to', targetLang);
			window.location.href = url.toString();
		}
		document.querySelector('#spinner-modal')?.classList.remove('hidden');
		document.body.style.overflow = 'hidden';
	}

	function navigateToHome() {
		if (window.location.pathname !== '/') {
			window.location.href = '/';
		}
	}

	function switchLanguages() {
		[sourceLang, targetLang] = [targetLang, sourceLang];
		localStorage.sourceLang = sourceLang;
		localStorage.targetLang = targetLang;
		placeholderText = targetLang === 'fa' ? englishPlaceholder : persianPlaceholder;
	}
</script>

<div class="pt-16">
	<header
		class="fixed top-0 left-0 right-0 z-50 mx-auto lg:w-2/3 xl:w-1/2 flex items-center gap-2 h-16 p-2"
	>
		<input
			bind:value={textToSearch}
			on:keydown={(e) => e.key === 'Enter' && research()}
			type="text"
			placeholder={placeholderText}
			class="w-full h-full px-4 outline-none bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/70 shadow-md transition duration-200 ease-in-out focus:bg-white/20 focus:ring-1 focus:ring-white/30"
		/>
		<div class="absolute right-4 flex items-center">
			<button on:click={switchLanguages} class="opacity-80 hover:opacity-100">
				<Icon icon="mdi:circular-arrows" class="text-4xl" />
			</button>
			<button on:click={navigateToHome} class="opacity-80 hover:opacity-100">
				<Icon icon="mdi:home-outline" class="text-4xl" />
			</button>
		</div>
	</header>

	<div id="spinner-modal" class="fixed inset-0 bg-black opacity-50 z-50 hidden">
		<div
			class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full h-32 w-32 border-8 border-t-secondary animate-spin"
		></div>
	</div>
	<slot />
</div>
