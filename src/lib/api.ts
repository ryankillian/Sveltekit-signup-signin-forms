import type { Send } from '$lib/types';

export async function fetchData(form: HTMLFormElement) {
	const response = await fetch(form.action, {
		method: form.method,
		headers: { accept: 'application/json' },
		body: new FormData(form)
	});
	return await response.json();
}

export async function send(form: HTMLFormElement): Send {
	const response = await fetch(form.action, {
		method: form.method,
		body: new FormData(form),
		headers: { accept: 'application/json' }
	});
	return await response.json();
}

export async function sendBare(form: HTMLFormElement) {
	const response = await fetch(form.action, {
		method: form.method,
		body: new FormData(form),
		headers: { accept: 'application/json' }
	});
	console.log(response.ok);
	console.log(response.status);
	return await response.json();
}
