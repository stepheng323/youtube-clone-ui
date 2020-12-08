import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import FormInput from '../../components/FormInput/FormInput';

import './login.css';
import UseForm from '../../Api/UseForm';
import UseLogin from '../../Api/HandleLogin';
import { LinearProgress } from '@material-ui/core';

function Login() {
	const url = 'http://localhost:4000/api/v1/auth/login';
	const initialValues = {
		email: '',
		password: '',
	};
	const {values, handleChange } = UseForm(initialValues, url);
	const {isSubmitting, handleSubmit, result } = UseLogin(url, values);

	return (
		<div className='login'>
		<LinearProgress color="primary" variant="indeterminate" />
			<div className='login-card'>
				<div className='login-form'>
					<h3>Sign in</h3>
					{result && !result.success && (
						<Alert severity='error' className='login-alert'>
							{result.message}
						</Alert>
					)}
					<form onSubmit={handleSubmit}>
						<FormInput
							className='login-input'
							required={true}
							type='email'
							name='email'
							value={values.email}
							handleChange={handleChange}
							placeholder={'Email'}
							Icon={EmailIcon}
						/>
						<FormInput
							className='login-input'
							required={true}
							value={values.password}
							type='password'
							name='password'
							handleChange={handleChange}
							placeholder={'Password'}
							Icon={LockIcon}
						/>
						<Link to='/forgot-password'>
							<p className='forgot-password'>Forgot password?</p>
						</Link>
						<div className='login-btn'>
							<Link to='/signup'>
								<p>Create account</p>
							</Link>
							<Button style={{width: '100px'}}
								type='submit'
								disableElevation
								variant='contained'
								color='secondary'
							>
								{isSubmitting ?  <p>Login...</p> : 'Login' }
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Login;
