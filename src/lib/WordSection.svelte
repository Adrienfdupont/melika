<script lang="ts">
	import type { Word } from './types/Word';

	export let word: Word;
</script>

<section class="pb-4">
	<p>
		<span class="text-2xl">{word.match}</span>
		<span class="font-light ml-2">{word.pronunciation}</span>
	</p>
	<ol class="pl-4">
		{#each word.definitions as definition, i}
			<li><span>{i + 1}. </span>{definition}</li>
		{/each}
	</ol>
</section>
