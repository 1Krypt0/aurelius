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
	<h1 class="pb-6 text-center font-headers text-3xl">Log in to your account</h1>
	<form method="post" use:enhance>
		<div class="grid gap-4">
			<Form.Field {form} name="email" class="grid gap-2">
				<Form.Control let:attrs>
					<Form.Label>Email</Form.Label>
					<Input
						{...attrs}
						type="email"
						placeholder="Your E-mail Address"
						required
						bind:value={$formData.email}
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="password" class="grid gap-2">
				<Form.Control let:attrs>
					<div class="flex items-center">
						<Form.Label>Password</Form.Label>
						<a href="/nowhere" class="ml-auto inline-block text-sm underline">
							Forgot your password?
						</a>
					</div>
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
			<Form.Button type="submit" class="w-full">Login</Form.Button>
		</div>
		<div class="mt-4 text-center text-sm">
			Don't have an account?
			<a href="/register" class="underline">Sign up</a>
		</div>
	</form>
</div>
