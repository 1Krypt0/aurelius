<script lang="ts">
	import type { PageServerData } from './$types';

	import * as Form from '$lib/components/ui/form';
	import * as Popover from '$lib/components/ui/popover';
	import * as Select from '$lib/components/ui/select';
	import { Separator } from '$lib/components/ui/separator';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Calendar } from '$lib/components/ui/calendar';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import { buttonVariants } from '$lib/components/ui/button';

	import { CalendarIcon, Clock } from 'lucide-svelte';

	import { DateFormatter, getLocalTimeZone, parseDate, today } from '@internationalized/date';
	import { superForm } from 'sveltekit-superforms';

	export let data: PageServerData;

	const form = superForm(data.form, {
		dataType: 'json'
	});
	const { form: formData, enhance } = form;

	const df = new DateFormatter('en-US', {
		dateStyle: 'medium'
	});

	$: startValue = $formData.startDate ? parseDate($formData.startDate.toString()) : undefined;
	$: endValue = $formData.endDate ? parseDate($formData.endDate.toString()) : undefined;

	let startPlaceholder = today(getLocalTimeZone());
	let endPlaceholder = today(getLocalTimeZone());
	let startHour: string, startMinute: string, endHour: string, endMinute: string;

	const updateStartMinutes = () => {
		if (startHour && startMinute) {
			$formData.startMinutes = `${startHour}:${startMinute}:00`;
		}
	};

	const updateEndMinutes = () => {
		if (endHour && endMinute) {
			$formData.endMinutes = `${endHour}:${endMinute}:00`;
		}
	};

	const hours = Array.from({ length: 23 }, (_, i) => (i + 1).toString().padStart(2, '0'));
	const minutes = Array.from({ length: 4 }, (_, i) => (i * 15).toString().padStart(2, '0'));
</script>

<section class="mx-auto w-full md:w-1/2">
	<h2 class="font-headers text-4xl">Create an Auction</h2>

	<Separator class="my-12" />

	<form method="post" enctype="multipart/form-data" use:enhance>
		<div class="grid gap-4">
			<Form.Field {form} name="name" class="grid gap-2">
				<Form.Control let:attrs>
					<Form.Label>Name</Form.Label>
					<Input {...attrs} placeholder="Auction Name" required bind:value={$formData.name} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="description" class="grid gap-2">
				<Form.Control let:attrs>
					<Form.Label>Description</Form.Label>
					<Textarea
						{...attrs}
						placeholder="Auction Description"
						required
						bind:value={$formData.description}
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="images" class="grid gap-2">
				<Form.Control let:attrs>
					<Form.Label>Images</Form.Label>
					<Input
						{...attrs}
						type="file"
						multiple
						name="images"
						required
						accept="image/png, image/jpeg"
						on:input={(e) => ($formData.images = Array.from(e.currentTarget.files ?? []))}
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="price" class="grid gap-2">
				<Form.Control let:attrs>
					<Form.Label>Starting Price</Form.Label>
					<Input {...attrs} type="number" required bind:value={$formData.price} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<div class="flex justify-between">
				<div class="grid gap-2">
					<Form.Field {form} name="startDate" class="grid gap-2">
						<Form.Control let:attrs>
							<Form.Label>Start Date and Time</Form.Label>
							<Popover.Root>
								<Popover.Trigger
									{...attrs}
									class={cn(
										buttonVariants({ variant: 'outline' }),
										'w-[280px] justify-start pl-4 text-left font-normal',
										!startValue && 'text-muted-foreground'
									)}
								>
									{startValue ? df.format(startValue.toDate(getLocalTimeZone())) : 'Pick a date'}
									<CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
								</Popover.Trigger>
								<Popover.Content class="w-auto p-0" side="top">
									<Calendar
										value={startValue}
										bind:placeholder={startPlaceholder}
										minValue={today(getLocalTimeZone()).add({ days: 1 })}
										maxValue={endValue ?? today(getLocalTimeZone()).add({ years: 1 })}
										calendarLabel="Auction Starting Date"
										initialFocus
										onValueChange={(v) => {
											if (v) {
												$formData.startDate = v.toString();
											} else {
												$formData.startDate = '';
											}
										}}
									/>
								</Popover.Content>
							</Popover.Root>
							<input hidden value={$formData.startDate} name={attrs.name} />
						</Form.Control>
					</Form.Field>

					{#if startValue}
						<Form.Field {form} name="startMinutes" class="grid gap-2">
							<Form.Control let:attrs>
								<Form.Label>Start Time</Form.Label>
								<Popover.Root>
									<Popover.Trigger asChild let:builder {...attrs}>
										<Button variant="outline" builders={[builder]}>
											<Clock class="mr-2 h-4 w-4" />
											{startHour ?? '12'}:{startMinute ?? '00'}
										</Button>
									</Popover.Trigger>
									<Popover.Content class="w-[240px] p-0">
										<div class="flex p-2">
											<Select.Root
												onSelectedChange={(v) => v && (startHour = v.value) && updateStartMinutes()}
											>
												<Select.Trigger>
													<Select.Value placeholder="Hour" />
												</Select.Trigger>
												<Select.Content>
													{#each hours as h}
														<Select.Item value={h}>{h}</Select.Item>
													{/each}
												</Select.Content>
											</Select.Root>
											<Select.Root
												onSelectedChange={(v) =>
													v && (startMinute = v.value) && updateStartMinutes()}
											>
												<Select.Trigger class="mx-2">
													<Select.Value placeholder="Minute" />
												</Select.Trigger>
												<Select.Content>
													{#each minutes as m}
														<Select.Item value={m}>{m}</Select.Item>
													{/each}
												</Select.Content>
											</Select.Root>
										</div>
									</Popover.Content>
								</Popover.Root>
								<input hidden value={$formData.startMinutes} name={attrs.name} />
							</Form.Control>
						</Form.Field>
					{/if}
				</div>

				<div class="grid gap-2">
					<Form.Field {form} name="endDate" class="grid gap-2">
						<Form.Control let:attrs>
							<Form.Label>End Date</Form.Label>
							<Popover.Root>
								<Popover.Trigger
									{...attrs}
									class={cn(
										buttonVariants({ variant: 'outline' }),
										'w-[280px] justify-start pl-4 text-left font-normal',
										!endValue && 'text-muted-foreground'
									)}
								>
									{endValue ? df.format(endValue.toDate(getLocalTimeZone())) : 'Pick a date'}
									<CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
								</Popover.Trigger>
								<Popover.Content class="w-auto p-0" side="top">
									<Calendar
										value={endValue}
										bind:placeholder={endPlaceholder}
										minValue={startValue ?? today(getLocalTimeZone())}
										maxValue={today(getLocalTimeZone()).add({ years: 1 })}
										calendarLabel="Auction Starting Date"
										initialFocus
										onValueChange={(v) => {
											if (v) {
												$formData.endDate = v.toString();
											} else {
												$formData.endDate = '';
											}
										}}
									/>
								</Popover.Content>
							</Popover.Root>
							<input hidden value={$formData.startMinutes} name={attrs.name} />
						</Form.Control>
					</Form.Field>

					{#if endValue}
						<Form.Field {form} name="endMinutes" class="grid gap-2">
							<Form.Control let:attrs>
								<Form.Label>End Time</Form.Label>
								<Popover.Root>
									<Popover.Trigger asChild let:builder {...attrs}>
										<Button variant="outline" builders={[builder]}>
											<Clock class="mr-2 h-4 w-4" />
											{endHour ?? '12'}:{endMinute ?? '00'}
										</Button>
									</Popover.Trigger>
									<Popover.Content class="w-[240px] p-0">
										<div class="flex p-2">
											<Select.Root
												onSelectedChange={(v) => v && (endHour = v.value) && updateEndMinutes()}
											>
												<Select.Trigger>
													<Select.Value placeholder="Hour" />
												</Select.Trigger>
												<Select.Content>
													{#each hours as h}
														<Select.Item value={h}>{h}</Select.Item>
													{/each}
												</Select.Content>
											</Select.Root>
											<Select.Root
												onSelectedChange={(v) => v && (endMinute = v.value) && updateEndMinutes()}
											>
												<Select.Trigger class="mx-2">
													<Select.Value placeholder="Minute" />
												</Select.Trigger>
												<Select.Content>
													{#each minutes as m}
														<Select.Item value={m}>{m}</Select.Item>
													{/each}
												</Select.Content>
											</Select.Root>
										</div>
									</Popover.Content>
								</Popover.Root>
								<input hidden value={$formData.endMinutes} name={attrs.name} />
							</Form.Control>
						</Form.Field>
					{/if}
				</div>
			</div>

			<Form.Button>Create Auction</Form.Button>
		</div>
	</form>
</section>
