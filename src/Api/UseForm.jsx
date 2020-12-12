import {useContext} from 'react'
import { useState } from 'react';
import getToken from './GetToken';
import { UserContext } from '../Context/User';
import axios from 'axios';

function UseForm(initialValues, url, options) {
	const { setUser, user } = useContext(UserContext);
	const [values, setValues] = useState(initialValues);
	const [result, setResult] = useState(null);
	const [multipartResult, setMultipartResult] = useState('');

	const [isSubmitting, setSubmitting] = useState(false);
	const [error, setError] = useState(null);
	const tokenExpiry = JSON.parse(localStorage.getItem('tokenExpiry'));

	const handleSubmit = async (event, body=undefined) => {
		event.preventDefault();
		let token;
		setSubmitting(true);
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
		try {
			const userOptions = body ? body: options
			const res = await fetch(url, {
				...userOptions,
				headers: {
					Authorization: `Bearer ${token ||user.token}`,
					'Content-Type': 'application/json',
				},
			});
			const data = await res.json();
			setResult(data);
			setSubmitting(false);
			return data;
		} catch (err) {
			setError(err);
		}
	};

	const handleMultipart = async (url, multipartFile) => {
		let token;
		setSubmitting(true);
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
		try {
			const response = await axios.patch(url, multipartFile, {
				headers: {
					Authorization: `Bearer ${token || user.token}`,
					'Content-Type': 'multipart/form-data',
				},
			});
			 if (response && response.status === 201) {
				 setMultipartResult(response.data.payload)
			 }

		} catch (err) {
			setError(err);
		}
	};


	const handleFetch = async () => {
		let token;
		setSubmitting(true);
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
		try {
			const res = await fetch(url, {
				...options,
				headers: {
					Authorization: `Bearer ${token ||user.token}`,
					'Content-Type': 'application/json',
				},
			});
			const data = await res.json();
			setResult(data);
			setSubmitting(false);
			return data;
		} catch (err) {
			setError(err);
		}
	};


	const handleChange = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
	};

	const handleFile = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.files[0],
		});
	};

	return {
		result,
		error,
		isSubmitting,
		handleChange,
		handleFile,
		handleSubmit,
		values,
		setValues,
		handleFetch,
		handleMultipart,
		multipartResult
	};
}

export default UseForm;
