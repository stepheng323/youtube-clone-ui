import React from 'react';
import SmallVideoCard from '../SmallVideoCard/smallVideoCard';
import './channel-videos.css';

function ChannelVideos({ videos }) {
	return (
		<>
			<p>Uploads</p>
			<div className='channel-uploads'>
				{videos &&
					videos.payload.length &&
					videos.payload.map((video) => {
						const {
							_id: id,
							title,
							thumbnail,
							duration,
							viewsCount,
							createdAt,
						} = video;
						return (
							<SmallVideoCard
								key={id}
								id={id}
								title={title}
								thumbnail={thumbnail}
								views={viewsCount}
								date={createdAt}
								duration={duration}
							/>
						);
					})}
			</div>
		</>
	);
}

export default ChannelVideos;