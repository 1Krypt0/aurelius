import { checkAuctions } from '$lib/server/auction';

export const handler = async () => {
	await checkAuctions();
};
