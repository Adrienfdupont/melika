<script lang="ts">
	import search from '$lib/assets/search.svg';
	import home from '$lib/assets/home.svg';
	import { fadeButton } from '$lib/utils';

	let textToSearch: string;

	function research() {
		fadeButton(document.querySelector('#search-button'));
		if (textToSearch.length) {
			window.location.href = `/${textToSearch}`;
		}
	}
</script>

<header class="p-2 container mx-auto lg:w-2/3 xl:w-1/2">
	<div class="flex items-center gap-2">
		<a href="/"><img src={home} alt="Home" class="h-10" /> </a>
		<input
			bind:value={textToSearch}
			on:keydown={(e) => e.key === 'Enter' && research()}
			type="text"
			placeholder="Translate into Persian..."
			class="bg-transparent border-white border-2 rounded-full w-full h-10 px-4 outline-none"
		/>
		<button id="search-button" on:click={research}><img src={search} alt="Search" class="h-10" /> </button>
	</div>
</header>
