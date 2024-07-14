<script lang="ts">
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	let pageIsHome: boolean;

	onMount(() => {
		pageIsHome = window.location.pathname === '/';
	});
</script>

<nav class="fixed bottom-0 left-0 right-0 w-full bg-secondary container mx-auto lg:w-2/3 xl:w-1/2">
	<div class="flex h-12 text-3xl p-2">
		<div class="w-1/2 flex justify-center">
			<a href="/">
				<Icon icon="mdi:history" class={pageIsHome ? 'text-white' : 'text-gray-700'}/>
			</a>
		</div>

		<div class="w-1/2 flex justify-center">
			<a href="/favourites">
				<Icon icon="mdi:star-outline" class={pageIsHome ? 'text-gray-700' : 'text-white'}/>
			</a>
		</div>
	</div>
</nav>
