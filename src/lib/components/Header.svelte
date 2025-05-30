<script lang="ts">
	import Icon from '@iconify/svelte';

	let textToSearch: string;

	function research() {
		if (textToSearch.length > 0) {
			window.location.href = `/search?text=${encodeURIComponent(textToSearch)}`;
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

<header class="sticky top-0 z-10 bg-secondary container mx-auto lg:w-2/3 xl:w-1/2">
	<div class="flex items-center gap-2 h-16 p-2">
		<input
			bind:value={textToSearch}
			on:keydown={(e) => e.key === 'Enter' && research()}
			type="text"
			placeholder="Translate into Persian..."
			class="bg-secondary-bis w-full h-full px-4 outline-none relative"
		/>
		<button on:click={navigateToHome} class="absolute right-4 hover:opacity-50">
			<Icon icon="mdi:home-outline" class="text-4xl"/>
		</button>
	</div>
</header>

<div id="spinner-modal" class="fixed inset-0 bg-black opacity-50 z-20 hidden">
	<div
		class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full h-32 w-32 border-8 border-t-secondary animate-spin"
	>
	</div>
</div>
