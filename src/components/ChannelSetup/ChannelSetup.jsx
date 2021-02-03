import React, { useContext, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Buttons from '../Button/Button';
import { Link, useHistory, useParams } from 'react-router-dom';
import logo from '../../img/logo.png';
import { UserContext } from '../../Context/User';

import './channel-setup.css';
import UseForm from '../../Api/UseForm';
import { REACT_APP_DEV_BASE_URL } from '../../constant';
import UseFetch from '../../Api/UseFetch';

function ChannelSetup() {
	const history = useHistory();
	const { channelName } = useParams();
	const { result, isLoading } = UseFetch(
		`${REACT_APP_DEV_BASE_URL}/channel/${channelName}`
	);
	const channelSetupUrl = `${REACT_APP_DEV_BASE_URL}/channel/setup`;
	const {
		values,
		handleChange,
		setValues,
		handleMultipart,
		multipartResult,
	} = UseForm({ description: '', profilePicture: '' }, channelSetupUrl);

	const useStyles = makeStyles((theme) => ({
		root: {
			display: 'flex',
			'& > *': {
				margin: theme.spacing(1),
			},
		},
		avatar: {
			width: theme.spacing(15),
			height: theme.spacing(15),
		},
	}));

	const classes = useStyles();
	const { user } = useContext(UserContext);
	const userExist = Object.keys(user).length > 0;
	const [profilePictureUlr, setProfilePictureUlr] = useState('');

	const handleProfile = (e) => {
		setProfilePictureUlr(URL.createObjectURL(e.target.files[0]));
		setValues({ ...values, profilePicture: e.target.files[0] });
	};

	const handleSubmit = () => {
		const data = new FormData();
		data.append('description', values.description);
		data.append('channelAvatar', values.profilePicture);
		handleMultipart(channelSetupUrl, data);
	};
	if (multipartResult && multipartResult._id) {
		history.push(`/channel/${multipartResult.name}`);
	}
	if (isLoading) return <p>Loading</p>;

	return (
		<>
			<div style={{ position: 'sticky' }} className='custom-channel-header2'>
				<div className='custom-channel-logo'>
					<Link to='/'>
						<img className='custom-channel-logo' src={logo} alt='logo' />
					</Link>
				</div>
				<div className='header-icons'>
					{userExist && (
						<Avatar
							className='profile'
							alt={channelName || user.firstName}
							src={user?.channel?.channelAvatar || channelName}
						/>
					)}
				</div>
			</div>
			<div className='channel-setup'>
				<>
					<h1 className='channel-setup-header'>
						Nice work! <br />
						Your channel "{result.payload.name}" has been created.
					</h1>
					<p className='channel-setup-header-text'>
						Next, follow the steps to complete your channel. You can do these
						steps now or come back to them later.
					</p>
					<img
						className='channel-setup-header-img'
						alt=''
						src='https://www.gstatic.com/youtube/img/creator/channel_setup/header_illustration.svg'
					/>
				</>

				<Card variant='outlined'>
					<CardContent>
						<h2 className='channel-setup-card-heading'>
							Upload a profile picture
						</h2>
						<p className='channel-setup-card-info'>
							Your profile picture appears next to your videos, comments, and
							other places. It's your signature <br /> image on YouTube. Learn
							more
						</p>
						<div className='channel-setup-card-profile-container'>
							<Avatar
								className={classes.avatar}
								alt={channelName || user.firstName}
								src={
									profilePictureUlr ||
									user?.channel?.channelAvatar ||
									channelName
								}
							/>
							<div className='channel-setup-card-upload-button'>
								<input
									onChange={(e) => handleProfile(e)}
									name='profilePicture'
									type='file'
									id='actual-btn'
									hidden
								/>
								<label
									className='channel-setup-card-label'
									htmlFor='actual-btn'
								>
									Upload picture
								</label>{' '}
							</div>
						</div>
						<p className='channel-setup-card-footer'>
							Your profile picture is linked to your Google Account. Any changes
							will show on your account and channel, and may take a few minutes
							to apply. We recommend a square or round picture that’s 800 x 800
							pixels. Use a PNG, GIF (no animations), BMP, or JPEG file (4MB or
							less). Make sure your picture follows Community guidelines.
						</p>
					</CardContent>
				</Card>

				<Card style={{ marginTop: '1.5em' }} variant='outlined'>
					<CardContent>
						<h2 className='channel-setup-card-heading'>
							Tell viewers about your channel
						</h2>
						<p className='channel-setup-card-info'>
							Let viewers know what or whom your videos are about. Your
							description can show up in search results and other places.
						</p>
						<TextField
							id='outlined-multiline-static'
							label='Channel name'
							multiline
							fullWidth
							value={values.description}
							onChange={handleChange}
							name='description'
							rows={10}
							placeholder='Add channel description'
							variant='outlined'
						/>
						<div className='channel-setup-card-action'>
							<Link to='/'>
								<Buttons color='primary'>Set up later</Buttons>
							</Link>
							<Buttons
								handleClick={(e) => handleSubmit(e)}
								color='primary'
								variant='contained'
								disabled={!values.description && !values.profilePicture.name}
							>
								Save and Continue
							</Buttons>
						</div>
					</CardContent>
				</Card>
			</div>
		</>
	);
}

export default ChannelSetup;
