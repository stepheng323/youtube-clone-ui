import { useState } from 'react';

function UseForm(initialValues, url, method = 'POST') {
	const [values, setValues] = useState(initialValues);
	const [result, setResult] = useState(null);
	const [isSubmitting, setSubmitting] = useState(false);
	const [error, setError] = useState(null);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setSubmitting(true);
		try {
			const res = await fetch(url, {
				method: method,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			});
			const data = await res.json();
			setResult(data);
			setSubmitting(false);
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
	return {
		result,
		error,
		isSubmitting,
		handleChange,
		handleSubmit,
		values,
		setValues
	};
}

export default UseForm;
