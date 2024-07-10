<script lang="ts">
	import Icon from '@iconify/svelte';
</script>

<nav class="fixed bottom-0 left-0 right-0 w-full bg-secondary container mx-auto lg:w-2/3 xl:w-1/2">
	<div class="flex h-12 text-3xl p-2">
		<div class="w-1/2 flex justify-center">
			<a href="/">
				<Icon icon="mdi:history" />
			</a>
		</div>

		<div class="w-1/2 flex justify-center">
			<a href="/favourites">
				<Icon icon="mdi:star-outline" />
			</a>
		</div>
	</div>
</nav>
