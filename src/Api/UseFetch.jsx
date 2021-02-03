import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../Context/User';
import getToken from './GetToken';

function UseFetch(url) {
	const controller = new AbortController()
	const { setUser, user } = useContext(UserContext);
	const [result, setResult] = useState(null);
	const [isLoading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const tokenExpiry = JSON.parse(localStorage.getItem('tokenExpiry'));

	const fetchData = async () => {
		let token;
		if (Date.now() >= +tokenExpiry * 1000 || !user.token) {
			const getNewToken = async () => {
				const response = await getToken();
				if (response && response.success) {
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
				method: 'GET',
				signal: controller.signal,
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
			if(err.name === 'AbortError') return;
			setError(err);
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
		return () => controller.abort();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { result, error, isLoading, setLoading, setResult };
}

export default UseFetch;
