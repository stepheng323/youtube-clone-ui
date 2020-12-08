import { useContext } from 'react';
import UserContext from '../Context/User'; 
import getToken from '../Api/GetToken';

const tokenExpiry = JSON.parse(localStorage.getItem('tokenExpiry'));

const FetchFunction = async (url, body, method) => {
	const { setUser, user } = useContext(UserContext);

	try {
		let token;
		if (Date.now() >= +tokenExpiry * 1000) {
			const getNewToken = async () => {
				const response = await getToken();
				if (response.success) {
					const { payload } = response;
					token = payload.token;
					localStorage.setItem('tokenExpiry', payload.tokenExpiry);
					setUser(() => payload);
				}
			};
			await getNewToken();
		}
		const response = await fetch(url, {
				method: method,
				headers: {
					Authorization: `Bearer ${token || user.token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			});
		const data = await response.json();
		return data;
	} catch (err) {
		return err;
	}
};

export default FetchFunction;
