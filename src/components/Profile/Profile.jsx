import React, { useContext } from 'react';
import { Avatar } from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { UserContext } from '../../Context/User';
import useLogout from '../../Utils/Logout';

import './profile.css';
import SidebarRow from '../SidebarRow/SidebarRow';

function Profile() {
	const { handleLogout } = useLogout();
	const { user } = useContext(UserContext);
	return (
		<div className='profile-card'>
			<div className='profile-card-info'>
				<Avatar
					className='profile-card-avatar'
					alt='profile'
					src='https://lh3.googleusercontent.com/a-/AOh14GjySH9J2YXSPskpwCZ_l5_LU_r6StEnduNarQ67mw=s88-c-k-c0x00ffffff-no-rj-mo'
				/>
				<div className=''>
					<p className='profile-name'>
						{user.firstName} {user.lastName}
					</p>
					<p className='profile-email'>{user.email}</p>
				</div>
			</div>
			<hr />
			<div>
				<SidebarRow Icon={AccountBoxIcon} title='Your channel' />
				<SidebarRow Icon={SettingsApplicationsIcon} title='YouTube Studio' />
				<SidebarRow
					handleLogout={handleLogout}
					Icon={ExitToAppIcon}
					title='Sign out'
				/>
			</div>
		</div>
	);
}

export default Profile;
