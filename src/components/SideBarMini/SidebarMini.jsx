import React from 'react';
import './sidebarmini.css';

import HomeIcon from '@material-ui/icons/Home';
import TrendingIcon from '@material-ui/icons/Whatshot';
import SubscriptionIcon from '@material-ui/icons/Subscriptions';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import SidebarRowMini from '../SidebarRowMini/SideBarRowMini';

function SidebarMini() {
	return (
		<div className='sidebar-mini'>
			<SidebarRowMini selected={true} Icon={HomeIcon} title='Home' url='/' />
			<SidebarRowMini Icon={TrendingIcon} title='Trending' url='/trending' />
			<SidebarRowMini
				Icon={SubscriptionIcon}
				title='Subscriptions'
				url='/subscriptions'
			/>
			<SidebarRowMini Icon={VideoLibraryIcon} title='Library' url='/library' />
		</div>
	);
}

export default SidebarMini;
