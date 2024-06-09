<script lang="ts">
	import Icon from '@iconify/svelte';

	let textToSearch: string;

	function research() {
		window.location.href = `/${textToSearch}`;
	}
</script>

<header class="m-2">
	<div class="flex items-center gap-2">
		<input
			bind:value={textToSearch}
			type="text"
			placeholder="Translate into Persian..."
			class="bg-transparent border-white border-2 rounded-full w-full h-10 px-4 outline-none"
		/>
		<button on:click={research}><Icon icon="material-symbols:search" class="text-4xl" /> </button>
	</div>
</header>
