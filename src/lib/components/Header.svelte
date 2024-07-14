<script lang="ts">
	import { fadeButton } from '$lib/utils';
	import Icon from '@iconify/svelte';

	let textToSearch: string;

	function research() {
		fadeButton(document.querySelector('#search-button'));
		if (textToSearch.length) {
			window.location.href = `/${textToSearch}`;
		}
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
