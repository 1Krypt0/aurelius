<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Separator } from '$lib/components/ui/separator';
	import { Input } from '$lib/components/ui/input';

	export let form;

	$: ({ form: formData, enhance } = form);
</script>

<section class="mx-auto w-1/2">
	<h2 class="font-headers text-4xl">My Profile</h2>

	<Separator class="my-12" />

	<form method="post" action="?/updateUser" use:enhance>
		<div class="grid gap-4">
			<Form.Field {form} name="name" class="grid gap-2">
				<Form.Control let:attrs>
					<Form.Label>Name</Form.Label>
					<Input {...attrs} required bind:value={$formData.name} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="email" class="grid gap-2">
				<Form.Control let:attrs>
					<Form.Label>Email</Form.Label>
					<Input {...attrs} type="email" required bind:value={$formData.email} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Button type="submit" class="w-full">Update Profile</Form.Button>
		</div>
	</form>
</section>
