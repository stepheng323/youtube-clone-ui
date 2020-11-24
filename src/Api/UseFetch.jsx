import { useState, useContext } from 'react';
import { UserContext } from '../Context/User';
import getToken from './GetToken';

function UseFetch(url, body) {
	const {setUser, user } = useContext(UserContext);

	const [result, setResult] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const tokenExpiry = JSON.parse(
		localStorage.getItem('tokenExpiry')
	);

	const fetchData = async () => {
		let token;
		setLoading(true);
		if (Date.now() >= +tokenExpiry * 1000) {
			const getNewToken = async() => {
			const payload	= await getToken();
			token = payload.token;
				localStorage.setItem('tokenExpiry', payload?.tokenExpiry )
				setUser(() => payload);
			}
			await getNewToken()
		}
		try {
			const res = await fetch(url, {
				headers:{
					'Authorization': `Bearer ${token ||user.token}` ,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)
				
			});
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
