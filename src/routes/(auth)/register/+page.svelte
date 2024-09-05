<script lang="ts">
	import * as Form from '$lib/components/ui/form/index';
	import { Input } from '$lib/components/ui/input/index';

	import { superForm } from 'sveltekit-superforms';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const form = superForm(data.form);
	const { form: formData, enhance } = form;
</script>

<div class="mx-auto flex w-1/3 flex-col justify-center">
	<h1 class="pb-6 text-center font-headers text-3xl">Create an account</h1>

	<form method="post" use:enhance>
		<div class="grid gap-4">
			<Form.Field {form} name="name" class="grid gap-2">
				<Form.Control let:attrs>
					<Form.Label>Name</Form.Label>
					<Input {...attrs} placeholder="Your Name" required bind:value={$formData.name} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="email" class="grid gap-2">
				<Form.Control let:attrs>
					<Form.Label>Email</Form.Label>
					<Input
						{...attrs}
						placeholder="Your E-mail Address"
						type="email"
						required
						bind:value={$formData.email}
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="password" class="grid gap-2">
				<Form.Control let:attrs>
					<Form.Label>Password</Form.Label>
					<Input
						{...attrs}
						type="password"
						placeholder="Your Password"
						required
						bind:value={$formData.password}
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Button>Create an Account</Form.Button>
		</div>
		<div class="mt-4 text-center text-sm">
			Already have an account?
			<a href="/login" class="underline"> Sign in </a>
		</div>
	</form>
</div>
