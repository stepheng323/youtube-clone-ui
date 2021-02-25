/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import './must-sign-in.css';
import AccountIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';

function MustSignIn({ Icon, heading, body }) {
	return (
		<div className='must-sign-in'>
			<Icon className="must-sign-in-icon" />
			<h1>{heading}</h1>
			<p>{body}</p>
			<Link to='/login'>
				<Button className='header-btn' variant='outlined' color='primary'>
					<AccountIcon className='header-btn-icon' /> SIGN IN
				</Button>
			</Link>
		</div>
	);
}

export default MustSignIn;
