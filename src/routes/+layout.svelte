<script lang="ts">
	import Icon from '@iconify/svelte';
	import '../app.css';

	let textToSearch: string;

	function research() {
		if (textToSearch.length > 0) {
			window.location.href = `/search?input=${encodeURIComponent(textToSearch)}`;
		}
		document.querySelector('#spinner-modal')?.classList.remove('hidden');
		document.body.style.overflow = 'hidden';
	}

	function navigateToHome() {
		if (window.location.pathname !== '/') {
			window.location.href = '/';
		}
	}
</script>

<div class="pt-16">
	<header
		class="fixed top-0 left-0 right-0 z-70 mx-auto lg:w-2/3 xl:w-1/2 flex items-center gap-2 h-16 p-2"
	>
		<input
			bind:value={textToSearch}
			on:keydown={(e) => e.key === 'Enter' && research()}
			type="text"
			placeholder="Translate into Persian..."
			class="w-full h-full px-4 outline-none bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/70 shadow-md transition duration-200 ease-in-out focus:bg-white/20 focus:ring-1 focus:ring-white/30"
		/>
		<button on:click={navigateToHome} class="absolute right-4 hover:opacity-50">
			<Icon icon="mdi:home-outline" class="text-4xl" />
		</button>
	</header>

	<div id="spinner-modal" class="fixed inset-0 bg-black opacity-50 z-80 hidden">
		<div
			class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full h-32 w-32 border-8 border-t-secondary animate-spin"
		></div>
	</div>
	<slot />
</div>
