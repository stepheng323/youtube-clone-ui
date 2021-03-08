import React, { useContext } from 'react';
import ImageAvatars from '../Avatar/Avatar';
import StudioSidebarRow from '../StudioSidebarRow/StudioSidebarRow';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import BrushIcon from '@material-ui/icons/Brush';
import SettingsIcon from '@material-ui/icons/Settings';
import FeedbackIcon from '@material-ui/icons/Feedback';
import DashboardIcon from '@material-ui/icons/Dashboard';

import './studio-sidebar.css';
import Divider from '@material-ui/core/Divider';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../../Context/User';
import { REACT_APP_DEV_UPLOAD_URL } from '../../constant';

function StudioSidebar() {
  const { user } = useContext(UserContext);
  const { pathname } = useLocation();
  const dashboardSelected = pathname.includes('/dashboard') ? true : false;
  const contentSelected = pathname.includes('/content') ? true : false;
  const playlistSelected = pathname.includes('/playlist') ? true : false;
  const customisationSelected = pathname.includes('/customise') ? true : false;

  return (
    <div className="studio-sidebar">
      <div className="studio-sidebar-profile">
        <ImageAvatars
          alt="channel-image"
          size="larger"
          src={`${REACT_APP_DEV_UPLOAD_URL}/${user.channel?.channelAvatar}`}
        />
        <p className="studio-sidebar-profile-desc">Your channel</p>
        <p className="studio-sidebar-profile-name">{user.channel?.name}</p>
      </div>
      <div className="studio-sidebar-menu">
        <Link className="link" to="/studio/dashboard">
          <StudioSidebarRow
            title="Dashboard"
            selected={dashboardSelected}
            Icon={DashboardIcon}
          />
        </Link>
        <Link className="link" to="/studio/content">
          <StudioSidebarRow
            title="Content"
            selected={contentSelected}
            Icon={VideoLibraryIcon}
          />
        </Link>
        <Link className="link" to="/studio/playlist">
          <StudioSidebarRow
            title="Playlist"
            selected={playlistSelected}
            Icon={PlaylistPlayIcon}
          />
        </Link>
        <Link className="link" to="/studio/customise">
          <StudioSidebarRow
            title="Customisation"
            selected={customisationSelected}
            Icon={BrushIcon}
          />
        </Link>
      </div>
      <Divider />
      <div className="studio-sidebar-footer">
        <StudioSidebarRow title="Setting" Icon={SettingsIcon} />
        <StudioSidebarRow title="Feedback" Icon={FeedbackIcon} />
      </div>
    </div>
  );
}

export default StudioSidebar;
