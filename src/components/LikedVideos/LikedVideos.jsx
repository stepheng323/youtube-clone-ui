import React, { useContext } from 'react';
import useFetch from '../../Api/UseFetch';
import './liked-videos.css';
import { REACT_APP_DEV_BASE_URL } from '../../constant';

import { UserContext } from '../../Context/User';
import LikedVideo from '../LikedVideo/likeVideo';
import PlaylistInfo from '../PlaylistInfo/PlaylistInfo';

function LikedVideos() {
	const { user } = useContext(UserContext);
	const likedVideosUrl = `${REACT_APP_DEV_BASE_URL}/like`;
	const { result, isLoading } = useFetch(likedVideosUrl);

	if (isLoading) return <p>Loading</p>;
	const { payload } = result;
	return (
		<div className='liked-videos'>
			<PlaylistInfo
				user={user}
				videosCount={payload.length}
				lastThumnail={payload[payload.length - 1].video.thumbnail}
			/>
			<div className='liked-videos-right'>
				{payload.length &&
					payload.map((likedVideo, index) => {
						const {
							_id: id,
							video: {
								_id: videoId,
								title,
								duration,
								thumbnail,
								channel: { name: channelName },
							},
						} = likedVideo;
						return (
							<LikedVideo
								key={id}
								id={id}
								videoId={videoId}
								index={index}
								thumbnail={thumbnail}
								duration={duration}
								title={title}
								channelName={channelName}
							/>
						);
					})}
			</div>
		</div>
	);
}

export default LikedVideos;
