import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Profile from '../Profile/Profile';
import MenuIcon from '@material-ui/icons/Menu';
import ViewIcon from '@material-ui/icons/ViewModule';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import AccountIcon from '@material-ui/icons/AccountCircle';
import { UserContext } from '../../Context/User';
import VideoUploadModal from '../FirstUploadModal/UploadModal';
import logo from '../../img/logo.png';
import '../header/header.css';
import {ProfileContext} from '../../Context/ProfileCard';


function Header() {
	const { user } = useContext(UserContext);
	const {openProfile, setOpenProfile } = useContext(ProfileContext);
	const [search, setSearch] = useState('');
	const [openVideoUpload, setOpenVideoUpload] = useState(false);

	const handleVideoModal = () => {
		setOpenVideoUpload(!openVideoUpload);
	};

	const userExist = Object.keys(user).length > 0;
	return (
		<div className='header'>
			<div className='header-menu-logo'>
				<MenuIcon />
				<Link to='/'>
					<img className='logo' src={logo} alt='logo' />
				</Link>
			</div>
			<form className='header-input'>
				<input
					onChange={(e) => setSearch(e.target.value)}
					placeholder='Search'
					type='text'
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
				<ViewIcon className='header-icon' />
				{userExist && <NotificationsIcon className='header-icon' />}
				{!userExist && (
					<Link to='/login'>
						<Button className='header-btn' variant='outlined' color='primary'>
							<AccountIcon className='header-btn-icon' /> SIGN IN
						</Button>
					</Link>
				)}
				{openProfile && <Profile />}
				{userExist && (
					<img
						onClick={() => setOpenProfile(!openProfile)}
						className='profile'
						alt='profile'
						src='https://lh3.googleusercontent.com/a-/AOh14GjySH9J2YXSPskpwCZ_l5_LU_r6StEnduNarQ67mw=s88-c-k-c0x00ffffff-no-rj-mo'
					/>
				)}
			</div>
		</div>
	);
}

export default Header;
