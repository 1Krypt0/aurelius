<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Separator } from '$lib/components/ui/separator';
	import { Input } from '$lib/components/ui/input';

	export let form;

	$: ({ form: formData, enhance } = form);
</script>

<section class="mx-auto w-full md:w-1/2">
	<h2 class="font-headers text-4xl">Change your Password</h2>

	<Separator class="my-12" />

	<form method="post" action="?/changePassword" use:enhance>
		<div class="grid gap-4">
			<Form.Field {form} name="oldPassword" class="grid gap-2">
				<Form.Control let:attrs>
					<Form.Label>Old Password</Form.Label>
					<Input {...attrs} type="password" required bind:value={$formData.oldPassword} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="password" class="grid gap-2">
				<Form.Control let:attrs>
					<Form.Label>New Password</Form.Label>
					<Input {...attrs} type="password" required bind:value={$formData.password} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="passwordConfirmation" class="grid gap-2">
				<Form.Control let:attrs>
					<Form.Label>Confirm New Password</Form.Label>
					<Input {...attrs} type="password" required bind:value={$formData.passwordConfirmation} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Button type="submit" class="w-full">Update your Password</Form.Button>
		</div>
	</form>
</section>
