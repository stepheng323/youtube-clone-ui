import React, { useContext } from 'react';
import SidebarRow from '../SidebarRow/SidebarRow';
import './sidebar.css';
import HomeIcon from '@material-ui/icons/Home';
import TrendingIcon from '@material-ui/icons/Whatshot';
import SubscriptionIcon from '@material-ui/icons/Subscriptions';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import HistoryIcon from '@material-ui/icons/History';
import OndemandIcon from '@material-ui/icons/OndemandVideo';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUp';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import { Link, useLocation } from 'react-router-dom';
import useFetch from '../../Api/UseFetch';
import { REACT_APP_DEV_BASE_URL } from '../../constant';
import SubscribedChannel from '../SubscribedChannel/subscribedChannel';
import { UserContext } from '../../Context/User';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import AccountIcon from '@material-ui/icons/AccountCircle';

function Sidebar() {
	const { user } = useContext(UserContext);
	const userExist = Object.keys(user).length > 0;
	const [open, setOpen] = React.useState(false);

	const handleClick = () => {
		setOpen(!open);
	};

	const { pathname } = useLocation();
	const subscriptionUrl = `${REACT_APP_DEV_BASE_URL}/subscriber/subscription?page=1&limit=7`;
	const { result } = useFetch(subscriptionUrl);
	const homeSelected = pathname === '/' ? true : false;
	const trendingSelected = pathname.startsWith('/trending') ? true : false;
	const subscriptionSelected = pathname.startsWith('/subscription')
		? true
		: false;
	const librarySelected = pathname.startsWith('/library') ? true : false;
	const historySelected = pathname.startsWith('/history') ? true : false;
	const videosSelected = pathname.startsWith('/videos') ? true : false;
	const likedVideosSelected = pathname.startsWith('/liked-videos')
		? true
		: false;
	const watchedVideosSelected = pathname.startsWith('/playlist/watched') ? true : false

	return (
		<div className=' sidebar'>
			<Link to='/'>
				<SidebarRow selected={homeSelected} Icon={HomeIcon} title='Home' />
			</Link>
			<Link to='/trending'>
				<SidebarRow
					selected={trendingSelected}
					Icon={TrendingIcon}
					title='Trending'
				/>
			</Link>
			<Link to='/subscriptions'>
				<SidebarRow
					selected={subscriptionSelected}
					Icon={SubscriptionIcon}
					title='Subscriptions'
				/>
			</Link>
			<hr />
			<Link to="/library">
			<SidebarRow
				selected={librarySelected}
				Icon={VideoLibraryIcon}
				title='Library'
			/>
			</Link>
			<Link to='/history'>
				<SidebarRow
					selected={historySelected}
					Icon={HistoryIcon}
					title='History'
				/>
			</Link>
			{userExist ? (
				<>
					<Link to='videos'>
						<SidebarRow
							selected={videosSelected}
							Icon={OndemandIcon}
							title='Your Videos'
						/>
					</Link>
					<Link to='/playlist/watched'>
						<SidebarRow
							selected={watchedVideosSelected}
							Icon={WatchLaterIcon}
							title='Watch Later'
						/>
					</Link>
					<Link to='/liked-videos'>
						<SidebarRow
							selected={likedVideosSelected}
							Icon={ThumbUpAltOutlinedIcon}
							title='Liked Videos'
						/>
					</Link>
					<SidebarRow Icon={ExpandMoreOutlinedIcon} title='Show More' />
				</>
			) : (
				<>
					<Divider />
					<div className='sidebar-signin'>
						<p>
							Sign in to like videos,
							<br /> comment, and subscribe.
						</p>
						<Link to='/login'>
							<Button className='header-btn' variant='outlined' color='primary'>
								<AccountIcon className='header-btn-icon' /> SIGN IN
							</Button>
						</Link>
					</div>
				</>
			)}
			<hr />
			{userExist && (
				<>
					<p className='sidebar-title'>SUBSCRIPTIONS</p>
					{result &&
						result?.payload?.data?.length &&
						result?.payload?.data?.map((channel) => {
							const {
								channel: { name },
								channelAvatar,
							} = channel;
							return (
								<SubscribedChannel
									key={name}
									channelName={name}
									channelAvatar={channelAvatar || name}
								/>
							);
						})}
					<Collapse in={open} timeout='auto' unmountOnExit>
						<p>the begin</p>
					</Collapse>
					<div onClick={handleClick}>
						<SidebarRow
							Icon={!open ? ExpandMoreOutlinedIcon : ExpandLessOutlinedIcon}
							title={`${!open ? 'Show More' : 'Show Fewer'}`}
						/>
					</div>
					<hr />
				</>
			)}
			<SidebarRow Icon={WatchLaterIcon} title='Help' />
			<SidebarRow Icon={WatchLaterIcon} title='Send Feedback' />
			<SidebarRow Icon={WatchLaterIcon} title='Send Feedback' />
			<SidebarRow Icon={WatchLaterIcon} title='Send Feedback' />
			<hr />
			<div> © 2021 Googlo LLC </div>
		</div>
	);
}

export default Sidebar;
