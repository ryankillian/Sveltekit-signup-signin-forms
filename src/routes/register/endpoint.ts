import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async ({ request }) => {
	return {
		status: 200,
		body: {
			user: { username: 'mike' }
		}
	};
};

// export const post: RequestHandler = async ({ request }) => {
// 	return {
// 		status: 400,
// 		body: {
// 			error: [
// 				{ field: 'email', message: 'Dodgy email alert!' },
// 				{ field: 'password', message: 'Dodgy password' }
// 			],
// 			user: { username: 'big bri' }
// 		}
// 	};
// };
