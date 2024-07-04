<script lang="ts">
	import type { Word } from './types/Word';

	export let word: Word;
</script>

<tr>
	<td class="align-top p-2">
		<p>
			<span class="text-xl">{word.match}</span>
			<span class="font-light ml-2">({word.pronunciation})</span>
		</p>
	</td>
	<td class="p-2">
		<p>{word.definitions}</p>
	</td>
</tr>
