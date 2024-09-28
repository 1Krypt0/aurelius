<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { buttonVariants } from '$lib/components/ui/button';

	export let form;
	export let priceIncrease: number;

	$: formattedPriceIncrease = new Intl.NumberFormat('pt-PT', {
		style: 'currency',
		currency: 'EUR'
	}).format(priceIncrease);

	const { form: formData, enhance } = form;
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'default' })}>Place Bid</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[450px]">
		<form method="post" use:enhance>
			<Dialog.Header>
				<Dialog.Title>Place your Bid</Dialog.Title>
				<Dialog.Description>
					By making a Bid, you are commited to buy this item if you are the winning bidder. Bids can
					only be made in EUR, and cents will be cut from the bid.
				</Dialog.Description>
			</Dialog.Header>
			<Form.Field {form} name="value">
				<Form.Control let:attrs>
					<div class="flex items-center gap-4 py-4">
						<Form.Label>Amount</Form.Label>
						<Input {...attrs} placeholder="0" required bind:value={$formData.value} />
						<Form.Button type="submit" class="w-28">Bid</Form.Button>
					</div>
				</Form.Control>
				<Form.FieldErrors />
				<Form.Description>
					Enter {formattedPriceIncrease} or more
				</Form.Description>
			</Form.Field>
		</form>
	</Dialog.Content>
</Dialog.Root>
