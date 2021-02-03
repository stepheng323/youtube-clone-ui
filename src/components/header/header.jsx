import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Avatar, capitalize } from '@material-ui/core';
import Profile from '../Profile/Profile';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountIcon from '@material-ui/icons/AccountCircle';
import { UserContext } from '../../Context/User';
import VideoUploadModal from '../FirstUploadModal/UploadModal';
import logo from '../../img/logo.png';
import '../header/header.css';
import { ProfileContext } from '../../Context/ProfileCard';
import { useHistory } from 'react-router-dom';

function Header() {
	const history = useHistory();
	const { user } = useContext(UserContext);
	const { openProfile, setOpenProfile } = useContext(ProfileContext);
	const [search, setSearch] = useState('');
	const [openVideoUpload, setOpenVideoUpload] = useState(false);
	const userExist = Object.keys(user).length > 0;

	const handleSubmit = (e) => {
		e.preventDefault();
		history.push(`/search/${search}`);
	};

	const handleVideoModal = () => {
		if (!userExist) return history.push('/login');
		setOpenVideoUpload(!openVideoUpload);
	};

	const useStyles = makeStyles((theme) => ({
		root: {
			display: 'flex',
			'& > *': {
				margin: theme.spacing(1),
			},
		},
		small: {
			width: theme.spacing(4),
			height: theme.spacing(4),
		},
		large: {
			width: theme.spacing(7),
			height: theme.spacing(7),
		},
	}));
	
  const classes = useStyles();

	return (
		<div className='header'>
			<div className='header-menu-logo'>
				<MenuIcon />
				<Link to='/'>
					<img className='logo' src={logo} alt='logo' />
				</Link>
			</div>
			<form onSubmit={handleSubmit} className='header-input'>
				<input
					onChange={(e) => setSearch(e.target.value)}
					placeholder='Search'
					type='text'
					defaultValue={search || ''}
				/>
				<Link to={`/search/${search}`}>
					<div className='search-btn'>
						<SearchIcon className='header-button' />
					</div>
				</Link>
			</form>
			<div className='header-icons'>
				<VideoUploadModal
					handleClose={handleVideoModal}
					handleOpen={handleVideoModal}
					open={openVideoUpload}
				/>
				{!userExist && (
					<Link to='/login'>
						<Button className='header-btn' variant='outlined' color='primary'>
							<AccountIcon className='header-btn-icon' /> SIGN IN
						</Button>
					</Link>
				)}
				{openProfile && <Profile />}
				{userExist && (
					<Avatar
					className={`${classes.small} profile`}
						onClick={() => setOpenProfile(!openProfile)}
						alt={capitalize(user.firstName) }
						src={user?.channel?.channelAvatar || user.firstName}
					/>
				)}
			</div>
		</div>
	);
}

export default Header;
