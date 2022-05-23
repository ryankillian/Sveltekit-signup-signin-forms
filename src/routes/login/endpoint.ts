import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async ({ request }) => {
	return {
		status: 200,
		body: {
			user: 'big bri'
		}
	};
};
