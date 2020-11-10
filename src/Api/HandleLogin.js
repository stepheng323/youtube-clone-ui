import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { UserContext } from '../Context/User';

const useLogin = (url, values) => {
	const { setUser } = useContext(UserContext);

	const history = useHistory();
	const [result, setResult] = useState(null);
	const [error, setError] = useState(null);
	const [isSubmitting, setSubmitting] = useState(false);

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			setSubmitting(true);
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify(values),
			});
			const data = await response.json();
			setSubmitting(false);
			if (response.status === 200) {
				const {
					payload,
					payload: { refreshToken, tokenExpiry },
				} = data;
				setUser(payload);
				const tokenData = { refreshToken, tokenExpiry };
				localStorage.setItem('tokenData', JSON.stringify(tokenData));
				setResult(data);
				return history.push('/');
			}
			return setResult(data);
		} catch (err) {
			return setError(err);
		}
	};

	return {
		handleSubmit,
		result,
		isSubmitting,
		error,
		setError,
	};
};

export default useLogin;
