import React from 'react';
import './recommendedVideo.css';
import Video from '../VideoCard/VideoCard';
import UseFetch from '../../Api/UseFetch';
import { REACT_APP_AWS_BASE_URL, REACT_APP_DEV_BASE_URL } from '../../constant';
import { CircularLoading } from '../../Utils/Loading';

function Recommended() {
	const getRecommendedVideoUrl = `${REACT_APP_DEV_BASE_URL}/video/recommended`;
	const { isLoading, result } = UseFetch(getRecommendedVideoUrl);

	if(isLoading) return <CircularLoading />
	const { payload: videos } = result;

	return (
		<div className='recommended-video'>
			{videos.map((video) => {
        const {_id: id, title, thumbnail, duration, channel: {name: channel, _id: channelId, channelAvatar: channelImage}, viewsCount, createdAt} = video;
        return (
				<Video
					key={id}
					id={id}
					title={title}
					thumbnail={`http://localhost:4000/${thumbnail}`}
					channel={channel}
					channelId={channelId}
          channelImage={channelImage || channel}
					views={viewsCount}
					duration={duration}
					date={createdAt}
				/>
			)})}
		</div>
	);
}

export default Recommended;
