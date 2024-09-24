<script lang="ts">
	export let data;
</script>

{#if data.isSuccess}
	<p>
		Congratulations! The order has been complete. Please We will soon contact you for shipping
		details.
	</p>
{:else if data.isCancel}
	<p>
		Your payment has been cancelled. No money has been deducted from your account. Please try again.
	</p>{/if}
