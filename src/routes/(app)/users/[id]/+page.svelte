<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import type { PageServerData } from './$types';
	import UpdateProfile from './update-profile.svelte';
	import ChangePassword from './change-password.svelte';

	export let data: PageServerData;

	$: updateUserForm = superForm(data.updateUserForm, {
		resetForm: true
	});
	$: changePasswordForm = superForm(data.changePasswordForm, {
		resetForm: true,
		dataType: 'json'
	});
</script>

<div class="flex flex-col gap-12">
	<UpdateProfile form={updateUserForm} />

	<ChangePassword form={changePasswordForm} />
</div>
