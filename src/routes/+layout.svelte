<script lang="ts">
	import Icon from '@iconify/svelte';
	import '../app.css';
	import { onMount } from 'svelte';

	let textToSearch: string;
	let sourceLang: 'Auto' | 'English';
	let placeholderText: string;

	onMount(() => {
		sourceLang = localStorage.sourceLang || 'Auto';
		placeholderText = `Translate : ${sourceLang} → Persian`;
	});

	function research() {
		if (textToSearch.length > 0) {
			const url = new URL(window.location.href);
			const from = sourceLang === 'Auto' ? navigator.language.split('-')[0] : sourceLang;

			url.pathname = '/search';
			url.searchParams.set('input', textToSearch);
			url.searchParams.set('from', from);
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

	function toggleSourceLang() {
		sourceLang = sourceLang === 'Auto' ? 'English' : 'Auto';
		localStorage.sourceLang = sourceLang;
		placeholderText = `Translate : ${sourceLang} → Persian`;
	}
</script>

<div class="pt-16">
	<header
		class="fixed top-0 left-0 right-0 z-50 mx-auto lg:w-2/3 xl:w-1/2 flex items-center gap-2 h-16 p-2"
	>
		<input
			id="search-input"
			bind:value={textToSearch}
			on:keydown={(e) => e.key === 'Enter' && research()}
			type="text"
			placeholder={placeholderText}
			class="w-full h-full px-4 outline-none bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/70 shadow-md transition duration-200 ease-in-out focus:bg-white/20 focus:ring-1 focus:ring-white/30"
		/>
		<div class="absolute right-4 flex items-center">
			<button
				on:click={toggleSourceLang}
				class={sourceLang === 'Auto' ? 'opacity-100' : 'opacity-70'}
			>
				<Icon icon="mdi:automatic" class="text-4xl" />
			</button>
			<button on:click={navigateToHome} class="opacity-70 hover:opacity-100">
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
