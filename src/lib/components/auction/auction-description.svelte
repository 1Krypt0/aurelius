<script lang="ts">
	import { Separator } from '../ui/separator';

	export let description: string;
</script>

<section class="flex flex-col pt-12">
	<section>
		<h2 class="pb-8 font-headers text-2xl">Description</h2>
		<p>{description}</p>
	</section>
	<Separator class="my-8" />
</section>
