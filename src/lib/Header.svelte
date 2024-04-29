<script lang="ts">
	let textToSearch: string;

	function research() {
		window.location.href = `/${textToSearch}`;
	}
</script>

<div>
	<input bind:value={textToSearch} type="text" />
	<button on:click={research}>Search</button>
</div>
