export type Send = Promise<{
	error?: string;
	success?: string;
	user?: { username: string };
}>;

export type ResponseData = {
	error?: FieldError[];
	success?: string;
	user?: { username: string };
};

export type FieldError = {
	field: string;
	message: string;
};

export const toErrorMap = (errors: FieldError[]) => {
	const errorMap: Record<string, string> = {};
	errors.forEach(({ field, message }) => {
		errorMap[field] = message;
	});
	return errorMap;
};
