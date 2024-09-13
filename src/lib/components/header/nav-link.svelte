<script lang="ts">
	export let link: string;
	export let icon;
	export let text: string;
</script>

{#if text === 'Logout'}
	<svelte:component this={icon} class="mr-2 size-4" />
	<form action={link} method="post">
		<button type="submit">{text}</button>
	</form>
{:else}
	<a href={link} class="flex items-center">
		<svelte:component this={icon} class="mr-2 size-4" />
		<span>{text}</span>
	</a>
{/if}
