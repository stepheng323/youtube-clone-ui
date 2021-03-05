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
import { useHistory } from 'react-router-dom';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { REACT_APP_DEV_UPLOAD_URL } from '../../constant';
import { ToggleSidebarContext } from '../../Context/ToggleSidebar';
import { ProfileContext } from '../../Context/ProfileCard';
import CreateChannelModal from '../CreatChannelModal/create-channel-modal';
import Skeleton from '@material-ui/lab/Skeleton';

function Header() {
  const history = useHistory();
  const { user, userLoading } = useContext(UserContext);
  const [openChannelModal, setChannelModal] = useState(false);
  const { width, setWidth } = useContext(ToggleSidebarContext);
  const [search, setSearch] = useState('');
  const [openVideoUpload, setOpenVideoUpload] = useState(false);
  const { openProfile, setOpenProfile } = useContext(ProfileContext);
  const handleClick = () => {
    setOpenProfile((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpenProfile(false);
  };
  const userExist = Object.keys(user).length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search/${search}`);
  };

  const handleVideoModal = () => {
    if (!userExist) return history.push('/login');
    if (!user.channel?.owner) {
      return setChannelModal(true);
    }
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

  const breakPoint = 1336;

  const toggleSidebar = () => {
    if (width > breakPoint) {
      const handleResixe = () => setWidth(window.innerWidth < breakPoint);
      return window.addEventListener('resize', handleResixe);
    }
    if (!width > breakPoint) setWidth(window.innerWidth > 1336);
  };

  const handleChannelModal = () => {
    setChannelModal(!openChannelModal);
  };


  return (
    <div className="header">
      <CreateChannelModal
        handleClose={handleChannelModal}
        handleOpen={handleChannelModal}
        open={openChannelModal}
      />
      <div className="header-menu-logo">
        <MenuIcon className="menu-icon" onClick={toggleSidebar} />
        <Link to="/">
          <img className="logo" src={logo} alt="logo" />
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="header-input">
        <input
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          type="text"
          defaultValue={search || ''}
        />
        <Link to={`/search/${search}`}>
          <div className="search-btn">
            <SearchIcon className="header-button" />
          </div>
        </Link>
      </form>
      <div className="header-icons">
        {userLoading ? (
          <div style={{display:'flex'}}>
						<Skeleton style={{marginRight: '1em'}} variant="circle" width={30} height={30}/>
						<Skeleton variant="circle" width={30} height={30}/>
					</div>
        ) : (
          <>
            <VideoUploadModal
              handleClose={handleVideoModal}
              handleOpen={handleVideoModal}
              open={openVideoUpload}
            />
            {!userExist && (
              <Link to="/login">
                <Button
                  className="header-btn"
                  variant="outlined"
                  color="primary"
                >
                  <AccountIcon className="header-btn-icon" /> SIGN IN
                </Button>
              </Link>
            )}
            <ClickAwayListener
              mouseEvent="onMouseDown"
              touchEvent="onTouchStart"
              onClickAway={handleClickAway}
            >
              <div>
                {openProfile ? <Profile /> : null}
                {userExist && (
                  <Avatar
                    className={`${classes.small} profile`}
                    onClick={handleClick}
                    alt={capitalize(user.channel?.name || user.firstName)}
                    src={
                      user.channel?.channelAvatar
                        ? `${REACT_APP_DEV_UPLOAD_URL}/${user.channel.channelAvatar}`
                        : ' '
                    }
                  />
                )}
              </div>
            </ClickAwayListener>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
