<script lang="ts">
	import type { Word } from './types/Word';

	export let word: Word;
</script>

<tr>
	<td class="align-top">
		<p>
			<span class="text-xl">{word.match}</span>
			<span class="font-light ml-2">({word.pronunciation})</span>
		</p>
	</td>
	<td class="p-2">
		<ol class="pl-4">
			{#each word.definitions as definition, i}
				<li><span>{i + 1}. </span>{definition}</li>
			{/each}
		</ol>
	</td>
</tr>
