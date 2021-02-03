import React from 'react';
import { Avatar } from '@material-ui/core';
import './subscribedChannel.css'
import { Link } from 'react-router-dom';

function subscribedChannel({channelName, channelAvatar}) {
  return (
    <Link to={`/channel/${channelName}`}>
    <div className="subscribedChannel">
      <Avatar className='channelAvatar' alt={channelName} src={channelAvatar} />
      <p>{channelName}</p>
    </div>
    </Link>
  )
}

export default subscribedChannel
