import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const isSuccess = url.searchParams.get('success');
	const isCancel = url.searchParams.get('canceled');

	return {
		isSuccess,
		isCancel
	};
};
