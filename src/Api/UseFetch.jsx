import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../Context/User';
import getToken from './GetToken';

function UseFetch(url, method = 'GET') {
	const { setUser, user } = useContext(UserContext);
	const [result, setResult] = useState(null);
	const [isLoading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const tokenExpiry = JSON.parse(localStorage.getItem('tokenExpiry'));

	const fetchData = async () => {
		let token;
		if (Date.now() >= +tokenExpiry * 1000) {
			const getNewToken = async () => {
				const response = await getToken();
				if (response?.success) {
					const { payload } = response;
					token = payload.token;
					localStorage.setItem('tokenExpiry', payload.tokenExpiry);
					setUser(() => payload);
				}
			};
			await getNewToken();
		}
		try {
			const res = await fetch(url, {
				method: method,
				headers: {
					Authorization: `Bearer ${token || user.token}`,
					'Content-Type': 'application/json',
				},
			});
			const data = await res.json();
			setResult(data);
			setLoading(false);
			return data;
		} catch (err) {
			setError(err);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return { result, error, isLoading };
}

export default UseFetch;
