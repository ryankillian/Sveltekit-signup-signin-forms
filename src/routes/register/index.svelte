<script lang="ts">
	import { goto } from '$app/navigation';
	import { toErrorMap, type FieldError, type ResponseData } from '$lib/types';

	let errors: Record<string, string>; //used to display server-side errors
	let submitting = false;

	let toggleButton: HTMLButtonElement;
	let passwordInput: HTMLInputElement;

	/*
	 * Three types of validation
	 * 1. client-side HTML validation
	 * 2. client-side JS validation
	 * 3. server-side validation
	 */

	function toggle() {
		if (passwordInput.type === 'password') {
			passwordInput.type = 'text';
			toggleButton.textContent = 'Hide password';
			toggleButton.setAttribute('aria-label', 'Hide password');
		} else {
			passwordInput.type = 'password';
			toggleButton.textContent = 'Show password';
			toggleButton.setAttribute(
				'aria-label',
				'Show password as plain text. ' + 'Warning: this will display your password on the screen.'
			);
		}
	}

	function validatePassword() {
		let message = '';
		if (!/.{8,}/.test(passwordInput.value)) {
			message = 'At least eight characters. ';
		}
		if (!/.*[A-Z].*/.test(passwordInput.value)) {
			message += 'At least one uppercase letter. ';
		}
		if (!/.*[a-z].*/.test(passwordInput.value)) {
			message += 'At least one lowercase letter.';
		}
		passwordInput.setCustomValidity(message);
	}

	async function fetchData(form: HTMLFormElement) {
		const response = await fetch(form.action, {
			method: form.method,
			headers: { accept: 'application/json' },
			body: new FormData(form)
		});
		return await response.json();
	}

	async function signUp(event: SubmitEvent) {
		submitting = true; // disable the submit button

		const form = event.target as HTMLFormElement;

		//client-side js validation
		validatePassword();

		if (form.reportValidity()) {
			//endpoint call
			const response = await fetch(form.action, {
				method: form.method,
				body: new FormData(form),
				headers: { accept: 'application/json' }
			});
			const body: ResponseData = await response.json();
			if (response.ok) {
				console.log(body.user);
				goto('/register/success');
			} else {
				//server-side validation and errors
				errors = toErrorMap(body.error as FieldError[]);
			}
		}
		submitting = false;
	}
</script>

<svelte:head>
	<title>Sign Up</title>
</svelte:head>
<main>
	<form on:submit|preventDefault={signUp} action="register/endpoint" method="post">
		<h1>Sign up</h1>

		<section>
			<label for="email">Email</label>
			<input id="email" name="email" type="email" autocomplete="username" required />
			{#if errors && errors.email}
				<small>{errors.email}</small>
			{/if}
		</section>

		<section>
			<label for="password">Password</label>
			<button
				bind:this={toggleButton}
				on:click={toggle}
				id="toggle-password"
				type="button"
				aria-label="Show password as plain text. 
      Warning: this will display your password on the screen."
			>
				Show Password
			</button>
			<input
				bind:this={passwordInput}
				on:input={() => passwordInput.setCustomValidity('')}
				id="password"
				name="password"
				type="password"
				minlength="8"
				autocomplete="new-password"
				aria-describedby="password-constraint"
				required
			/>
			<div id="password-constraint">
				Eight or more characters, with at least one lowercase and one uppercase letter.
			</div>
			{#if errors && errors.password}
				<small>{errors.password}</small>
			{/if}
		</section>

		<button id="sign-up" disabled={submitting}>Sign up</button>
	</form>
</main>

<style>
	:root {
		--desktop-font-size: 16px;
		--mobile-font-size: 22px;
	}

	:global(body) {
		font-family: sans-serif;
		font-weight: 500;
		margin: 10px 20px;
	}

	button {
		background-color: #eee;
		border: 1px solid #ccc;
		border-radius: 2px;
		color: #444;
		cursor: pointer;
		display: block;
		font-size: 22px; /* fallback */
		font-size: var(--mobile-font-size);
		font-weight: 500;
		margin: 3px 0 0 0;
		padding: 10px;
	}

	button:hover {
		background-color: #ccc;
		color: black;
	}

	form {
		margin: 0 auto;
		max-width: 500px;
	}

	h1 {
		border-bottom: 1px solid #ccc;
		font-size: 28px;
		font-weight: 600;
		margin: 0 0 20px 0;
		padding: 0 0 5px 0;
	}

	input {
		border: 1px solid #ccc;
		font-size: 22px; /* fallback */
		font-size: var(--mobile-font-size);
		padding: 15px;
		width: 90%; /* fallback */
		width: calc(100% - 30px); /* full width minus padding */
	}

	input[type='email']:not(:focus):invalid,
	input[type='password']:not(:focus):invalid {
		color: red;
		outline-color: red;
	}

	label {
		display: block;
		font-size: 20px;
		font-size: var(--mobile-font-size);
		font-weight: 500;
		margin: 0 0 3px 0;
	}

	button#toggle-password {
		background: none;
		border: none;
		cursor: pointer;
		font-weight: 300;
		padding: 0;
		position: absolute;
		top: -4px;
		right: -2px;
	}

	form section {
		margin: 0 0 20px 0;
		position: relative; /* for password toggle positioning */
	}

	small {
		display: block;
		font-size: 12px;
		color: red;
		margin-top: 10px;
	}

	@media (min-width: 450px) {
		:global(body) {
			margin: 50px;
		}
		button {
			font-size: 14px; /* fallback */
			font-size: var(--desktop-font-size);
		}
		h1 {
			font-size: 28px;
			font-size: calc(2 * var(--desktop-font-size));
			font-weight: 500;
			margin: 0 0 80px 0;
		}
		input {
			font-size: 14px; /* fallback */
			font-size: var(--desktop-font-size);
		}
		label {
			font-size: 14px; /* fallback */
			font-size: var(--desktop-font-size);
		}
	}
</style>
