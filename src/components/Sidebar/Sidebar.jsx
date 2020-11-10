import React from 'react'
import SidebarRow from '../SidebarRow/SidebarRow';
import './sidebar.css';
import HomeIcon from '@material-ui/icons/Home';
import TrendingIcon from '@material-ui/icons/Whatshot';
import SubscriptionIcon from '@material-ui/icons/Subscriptions';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import HistoryIcon from '@material-ui/icons/History';
import OndemandIcon from '@material-ui/icons/OndemandVideo';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';

function Sidebar() {
  return (
    <div className=" sidebar">
      <SidebarRow selected Icon={HomeIcon} title="Home"/>
      <SidebarRow Icon={TrendingIcon} title="Trending" />
      <SidebarRow Icon={SubscriptionIcon} title="Subscriptions" />
      <hr/>
      <SidebarRow Icon={VideoLibraryIcon} title="Library" />
      <SidebarRow Icon={HistoryIcon} title="History" />
      <SidebarRow Icon={OndemandIcon} title="Your Videos" />
      <SidebarRow Icon={WatchLaterIcon} title="Watch Later" />
      <SidebarRow Icon={ThumbUpAltOutlinedIcon} title="Liked Videos" />
      <SidebarRow Icon={ExpandMoreOutlinedIcon} title="Show More" />
      <SidebarRow Icon={ExpandMoreOutlinedIcon} title="Show More" />
      <SidebarRow Icon={ExpandMoreOutlinedIcon} title="Show More" />
      <SidebarRow Icon={ExpandMoreOutlinedIcon} title="Show More" />
      <SidebarRow Icon={ExpandMoreOutlinedIcon} title="Show More" />
      <SidebarRow Icon={ExpandMoreOutlinedIcon} title="Show More" />
      <hr />
    </div>
  )
}

export default Sidebar
