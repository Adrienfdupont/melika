<script lang="ts">
	import { fadeButton } from '$lib/utils';
	import Icon from '@iconify/svelte';

	let textToSearch: string;

	function research() {
		fadeButton(document.querySelector('#search-button'));
		if (textToSearch.length) {
			window.location.href = `/${textToSearch}`;
		}
		document.querySelector('#spinner-modal').classList.remove('hidden');
		document.body.style.overflow = 'hidden';
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
			placeholder="Translate into Persian..."
			class="bg-transparent border-white border-2 rounded-full w-full h-full px-4 outline-none"
		/>
		<button id="search-button" on:click={research}>
			<Icon icon="mdi:search"  class="text-3xl"/>
		</button>
	</div>
</header>

<div id="spinner-modal" class="fixed inset-0 bg-black opacity-50 z-20 hidden">
	<div
		class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full h-32 w-32 border-8 border-t-secondary animate-spin"
	>
	</div>
</div>
