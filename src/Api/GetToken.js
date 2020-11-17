
const FetchToken = async () => {
	const url = 'http://localhost:4000/api/v1/auth/token';
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
	};
	try {
		const res = await fetch(url, options);
		const { payload } = await res.json();
		return payload;
	} catch (err) {
		console.log(err.message)
	}
};
export default FetchToken;
