import React, { useContext, useState } from 'react';
import { Avatar } from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { UserContext } from '../../Context/User';
import useLogout from '../../Utils/Logout';
import CreateChannelModal from '../CreatChannelModal/create-channel-modal';
import SidebarRow from '../SidebarRow/SidebarRow';

import './profile.css';
import { Link } from 'react-router-dom';
import UseFetch from '../../Api/UseFetch';
import { REACT_APP_DEV_BASE_URL } from '../../constant';
import { CircularLoading } from '../../Utils/Loading';

function Profile() {
	const { handleLogout } = useLogout();
	const { user } = useContext(UserContext);
	const [openChannelModal, setChannelModal] = useState(false);

	const channelInfoUrl = `${REACT_APP_DEV_BASE_URL}/channel`;
	const { result, isLoading } = UseFetch(channelInfoUrl);

	const handleChannelModal = () => {
		setChannelModal(!openChannelModal);
	};

	return (
		<div className='profile-card-container'>
			<CreateChannelModal
				handleClose={handleChannelModal}
				handleOpen={handleChannelModal}
				open={openChannelModal}
			/>
			{isLoading ? (
				<div className='profile-loading-container'>
					<CircularLoading />
				</div>
			) : (
				<div className='profile-card'>
					<div className='profile-card-info'>
						<Avatar
							className='profile-card-avatar'
							alt={user.firstName}
							src={user?.channel?.channelAvatar || user.firstName}
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
						{result.payload.length ? (
							<Link to={`/channel/${result.payload[0].name}`}>
								<SidebarRow Icon={AccountBoxIcon} title='Your channel' />
							</Link>
						): <div onClick={handleChannelModal}>
						<SidebarRow
							showCreateChannelModal={handleLogout}
							Icon={AccountBoxIcon}
							title='Create a channel'
						/>
					</div> }
							
						<SidebarRow
							className='pl-2'
							Icon={SettingsApplicationsIcon}
							title='YouTube Studio'
						/>
						<SidebarRow
							handleLogout={handleLogout}
							Icon={ExitToAppIcon}
							title='Sign out'
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default Profile;
