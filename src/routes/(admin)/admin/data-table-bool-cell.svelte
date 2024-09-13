<script lang="ts">
	import { CheckCircle, X } from 'lucide-svelte';

	export let value: boolean;
</script>

<div class="flex items-center justify-center">
	{#if value}
		<CheckCircle class="mr-2 size-4 text-muted-foreground" />
	{:else}
		<X class="mr-2 size-4 text-muted-foreground" />
	{/if}
</div>
