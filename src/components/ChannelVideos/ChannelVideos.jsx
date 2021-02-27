/* eslint-disable react/prop-types */
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';
import UseFetch from '../../Api/UseFetch';
import { SmallCardSkeleton } from '../Skeleton/Skeleton';
import SmallVideoCard from '../SmallVideoCard/smallVideoCard';
import './channel-videos.css';

function ChannelVideos({title, url }) {

const {result, isLoading} = UseFetch(url)

if(isLoading) return <div style={{paddingTop: '2em'}} className="channel-uploads">
		{Array.from(Array(5)).map((item, index) => (
		<>
		<SmallCardSkeleton key={index} />
		</>
))}
</div>
	return (
		<>
			<p className="channel-video-title">{title}</p>
			<div className='channel-uploads'>
				{result &&
					result.payload.data.length &&
					result.payload.data.map((video) => {
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
