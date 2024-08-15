const getError = (err: unknown) =>
	(err as { response: { data: { message: string } } }).response?.data?.message
		? (err as { response: { data: { message: string } } }).response.data.message
		: (err as Error).message;

export { getError };
