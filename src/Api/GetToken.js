import { REACT_APP_DEV_BASE_URL } from "../constant";

const FetchToken = async () => {
	const url = `${REACT_APP_DEV_BASE_URL}/auth/token`;
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		// credentials: 'include',
	};
	try {
		const res = await fetch(url, options);
		const payload = await res.json();
		return payload;
	} catch (err) {
		console.log(err.message)
	}
};
export default FetchToken;
