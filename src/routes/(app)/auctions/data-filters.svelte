<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { Label } from '$lib/components/ui/label';
	import { Slider } from '$lib/components/ui/slider';

	export let amount: number;
</script>

<div class="flex flex-col gap-4 pr-12">
	<p>Showing {amount} results</p>
	<Separator />

	<div class="">
		<h2 class="pb-4 font-headers text-xl">Sort by</h2>

		<RadioGroup.Root>
			<div class="flex items-center space-x-2">
				<RadioGroup.Item value="ascending" id="ascending" />
				<Label for="option-one">End Date - Ascending</Label>
			</div>
			<div class="flex items-center space-x-2">
				<RadioGroup.Item value="descending" id="descending" />
				<Label for="option-two">End Date - Descending</Label>
			</div>
		</RadioGroup.Root>
	</div>
	<Separator />

	<div class="">
		<h2 class="pb-4 font-headers text-xl">Current Price</h2>

		<Slider value={[33]} max={100} step={1} />
	</div>
	<Separator />
</div>
