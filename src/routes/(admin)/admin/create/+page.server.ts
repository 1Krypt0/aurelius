import { createInsertSchema } from 'drizzle-zod';
import type { Actions, PageServerLoad } from './$types';
import { productTable } from '../../../../database/schema';
import { z } from 'zod';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

// NOTE: Maybe update the limit if not enough for good quality images
const IMAGE_SIZE_LIMIT = 6_000_000;

const createAuctionSchema = createInsertSchema(productTable, {
	startDate: z.string(),
	endDate: z.string(),
	price: z.coerce.number()
})
	.pick({
		name: true,
		description: true,
		price: true,
		startDate: true,
		endDate: true
	})
	.and(
		z.object({
			images: z
				.instanceof(File, { message: 'Please upload the auction images' })
				.refine((f) => f.size < IMAGE_SIZE_LIMIT, 'Max 6 MX upload size')
				.array(),
			startMinutes: z.string().time(),
			endMinutes: z.string().time()
		})
	);

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(createAuctionSchema));

	return {
		form
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(createAuctionSchema));

		console.log(form.data);

		if (!form.valid) {
			return fail(400, { form });
		}

		console.log('FORM WAS VALID');
	}
};
