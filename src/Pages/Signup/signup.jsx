import Button from '@material-ui/core/Button';
import React from 'react';
import FormInput from '../../components/FormInput/FormInput';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import { Link } from 'react-router-dom';
import useLogin from '../../Api/HandleLogin';
import UseForm from '../../Api/UseForm';
import { REACT_APP_DEV_BASE_URL } from '../../constant';


import './sign-up.css';
import Alert from '@material-ui/lab/Alert';

function Signup() {
	const url = `${REACT_APP_DEV_BASE_URL}/auth/signup`;
	const initialValues = {
		email: '',
		password: '',
		confirmPassword: '',
		firstName: '',
		lastName: '',
	};
	const { values, handleChange } = UseForm(initialValues, url);
	const { isSubmitting, handleSubmit, result, error, setError } = useLogin(
		url,
		values
	);
	const checkSubmit = (e) => {
		e.preventDefault();
		const { password, confirmPassword } = values;
		if (password === confirmPassword) return handleSubmit(e);
		setError('Password mismatch');
	};
	return (
		<div className='login'>
			<div className='login-card'>
				<h3>Sign Up</h3>
				<div className='login-form'>
				{(error || (result && !result.success)) && (
					<Alert severity='error' className='login-alert'>
						{error || result.message}
					</Alert>
				)}
					<form onSubmit={checkSubmit}>
						<FormInput
							className='login-input'
							required={true}
							type='text'
							name='firstName'
							handleChange={handleChange}
							placeholder={'Firstname'}
							Icon={EmailIcon}
						/>
						<FormInput
							className='login-input'
							required={true}
							type='text'
							name='lastName'
							handleChange={handleChange}
							placeholder={'Lastname'}
							Icon={EmailIcon}
						/>
						<FormInput
							className='login-input'
							required={true}
							type='email'
							name='email'
							handleChange={handleChange}
							placeholder={'Email'}
							Icon={EmailIcon}
						/>
						<FormInput
							className='login-input'
							required={true}
							type='password'
							name='password'
							handleChange={handleChange}
							placeholder={'Password'}
							Icon={LockIcon}
						/>
						<FormInput
							className='login-input'
							required={true}
							type='password'
							name='confirmPassword'
							handleChange={handleChange}
							placeholder={'Confirm Password'}
							Icon={LockIcon}
						/>
						<Link to='/forgot-password'>
							<p className='forgot-password'>Forgot password?</p>
						</Link>
						<div className='login-btn'>
							<Link to='/login'>
								<p>Already have an account? login</p>
							</Link>
							<Button
								type='submit'
								disableElevation
								variant='contained'
								color='secondary'
							>
								{!isSubmitting ? 'Signup' : 'signup...'}
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Signup;
