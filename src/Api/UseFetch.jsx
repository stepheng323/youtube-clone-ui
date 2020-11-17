import { useState } from 'react';
import getToken from './GetToken';
import axios from 'axios';

function UseFetch(url, options = {}) {
	const [result, setResult] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const { tokenExpiry, refreshToken } = JSON.parse(
		localStorage.getItem('tokenData')
	);
	if (Date.now() >= +tokenExpiry * 1000) {
		getToken(refreshToken);
	}
	const fetchData = async () => {
		setLoading(true);
		try {
			const res = await fetch(url, options);
			const data = await res.json();
			setResult(data);
			setLoading(false);
		} catch (err) {
			setError(err);
		}
	};

	return { result, error, isLoading, fetchData };
}

export default UseFetch;
