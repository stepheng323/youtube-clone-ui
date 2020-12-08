import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../Context/User';
import getToken from './GetToken';
import axios from 'axios';

function UseUpload(url, multipartFile) {
	const { setUser, user } = useContext(UserContext);
	const [uploadPercentage, setUploadPercentage] = useState(0);
	const [isVideoUploaded, setIsVideoUploaded] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState('');
	const tokenExpiry = JSON.parse(localStorage.getItem('tokenExpiry'));

	const uploadData = async () => {
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
			const response = await axios.put(url, multipartFile, {
				headers: {
					Authorization: `Bearer ${token || user.token}`,
					'Content-Type': 'multipart/form-data',
				},

				onUploadProgress: (progressEvent) => {
					const { loaded, total } = progressEvent;
					setUploadPercentage(Math.round(loaded * 100) / total);
				},
			});
			if (response && response.status === 200) {
        setIsVideoUploaded(true);
        setResult(response.data.payload)
			}
		} catch (err) {
			setError(err);
		}
	};

	useEffect(() => {
		uploadData();
	}, []);

	return { uploadPercentage, error, isVideoUploaded, result };
}

export default UseUpload;
