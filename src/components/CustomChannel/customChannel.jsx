import React, { useContext, useState } from 'react';
import Card from '@material-ui/core/Card';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import Buttons from '../Button/Button';
import logo from '../../img/logo.png';
import { Avatar } from '@material-ui/core';
import UseForm from '../../Api/UseForm';
import { withStyles } from '@material-ui/core/styles';

import './custom-channel.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { UserContext } from '../../Context/User';
import { REACT_APP_DEV_BASE_URL } from '../../constant';
import { useHistory } from 'react-router-dom';
import { capitalize } from '@material-ui/core';
import { REACT_APP_DEV_UPLOAD_URL } from '../../constant';

function CustomChannel() {
	const history = useHistory();
	const { user } = useContext(UserContext);
	const [agree, setAgree] = useState(false);
	const createChannelUrl = `${REACT_APP_DEV_BASE_URL}/channel`;
	const { handleChange, values, handleSubmit, result, isSubmitting } = UseForm(
		{ channelName: '' },
		createChannelUrl
	);
	const userExist = Object.keys(user).length > 0;

	if (result && result.success) {
		history.push(`/channel/setup/${result.payload.name}`);
	}
	const BlackCheckbox = withStyles({
		root: {
			color: '#000',
			'&$checked': {
				color: '#000',
			},
		},
		checked: {},
	})((props) => <Checkbox color='default' {...props} />);

	const handleCheckbox = (event) => {
		setAgree(event.target.checked);
	};

	return (
		<>
			<div className='custom-channel-header'>
				<div className='custom-channel-logo'>
					<Link to='/'>
						<img className='custom-channel-logo' src={logo} alt='logo' />
					</Link>
				</div>
				<div className='header-icons'>
					{userExist && (
						<Avatar
							className='profile'
							alt={capitalize(user?.channel?.name || user?.firstName)}
							src={`${REACT_APP_DEV_UPLOAD_URL}/${user?.channel?.channelAvatar}`}
						/>
					)}
				</div>
			</div>
			<div className='custom-channel'>
				<img
					alt=''
					className='image-channel'
					src='https://www.gstatic.com/youtube/img/channels/madison_channel_illustration.svg'
				/>
				<Card variant='outlined'>
					<CardContent>
						<h2 className='custom-channel-heading'>Create your channel name</h2>
						<p className='custom-channel-info'>
							You can use your brand &rsquo;s name or another name. A good channel name
							represents you and your content. You can change your channel name
							at any time. Learn more
						</p>
						<TextField
							id='outlined-multiline-static'
							label='Channel name'
							multiline
							fullWidth
							value={values.channelName}
							onChange={handleChange}
							name='channelName'
							rows={3}
							placeholder='Add channel name'
							variant='outlined'
						/>
						<FormControlLabel
							className='custom-channel-form-control'
							control={
								<BlackCheckbox checked={agree} onChange={handleCheckbox} />
							}
							label='I understand that i am creating a new account with its own settings, include search and watch history'
						/>
					</CardContent>
					<div className='custom-channel-action'>
						<Link to='/'>
							<Buttons color='primary'>Cancel</Buttons>
						</Link>
						<Buttons
							handleClick={(e) =>
								handleSubmit(e, {
									method: 'POST',
									body: JSON.stringify(values),
								})
							}
							color='primary'
							variant='contained'
							disabled={!agree || !values.channelName}
						>
							Create
						</Buttons>
					</div>
				</Card>
				<div className='custom-channel-footer'>
					<p className='custom-channel-footer-info'>
						You can view and change your Google Account settings anytime at
						myaccount.google.com. Your channel name will be linked to a Brand
						Account managed by sgagnonpie@gmail.com. Learn more about channels
						and Brand Accounts. By selecting &rsquo;Create,&rsquo; you agree to YouTube’s
						Terms of Service.
					</p>
					<p className='custom-channel-copy'>&copy; 2021 Google</p>
				</div>
			</div>
		</>
	);
}

export default CustomChannel;
