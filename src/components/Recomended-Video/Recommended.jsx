import React from 'react';
import './recommendedVideo.css';
import Video from '../VideoCard/VideoCard';
import { videos } from '../../data'

function Recommended() {	
	return (
		<div className='recommended-video'>
			{videos.map((video) => {
        const {id, title, thumbnail, channelImage, channel, views, date} = video;
        return (
				<Video
				key={id}
					title={title}
					thumbnail={thumbnail}
          channel={channel}
          channelImage={channelImage}
          views={views}
          date={date}
				/>
			)})}
		</div>
	);
}

export default Recommended;
