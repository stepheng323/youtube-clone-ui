import React, { useEffect, useState } from 'react';
import './recommendedVideo.css';
import Video from '../VideoCard/VideoCard';
import { REACT_APP_DEV_BASE_URL } from '../../constant';
import { RecommendedSkeleton } from '../Skeleton/Skeleton';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircularLoading } from '../../Utils/Loading';

function Recommended() {
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(1);
	const [videos, setVideos] = useState([]);
	const [initialLoading, setinitialLoading] = useState(true);
	const getRecommendedVideoUrl = `${REACT_APP_DEV_BASE_URL}/video/recommended?page=${page}&limit=8`;

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch(getRecommendedVideoUrl);
			const result = await res.json();
			setVideos(result.payload.data || []);
			if (!result.payload.next) {
				setHasMore(false);
			}
			setinitialLoading(false);
		};
		fetchData();
	}, []);

	const fetchNext = async () => {
		setPage((page) => page + 1);
		const getMoreVideos = async () => {
			const response = await fetch(
				`${REACT_APP_DEV_BASE_URL}/video/recommended?page=${page + 1}&limit=8`
			);
			const result = await response.json();
			if (result.success) {
				setVideos(videos.concat(...result.payload.data));
			}
			if (!result.payload.next) {
				setHasMore(false);
			}
		};
		getMoreVideos();
	};

	if (initialLoading) {
		return (
			<div className='recommended-video-skeleton'>
				{Array.from(Array(16)).map((item, index) => (
					<RecommendedSkeleton key={index} />
				))}
			</div>
		);
	}

	return (
		<InfiniteScroll style={{width: '100%'}}
			dataLength={videos.length}
			next={fetchNext}
			hasMore={hasMore}
			loader={
				<div className='recommended-loading-container'>
					<CircularLoading />
				</div>
			}
		>
			<div className='recommended-video'>
				{videos.length ?
					videos.map((video) => {
						const {
							_id: id,
							title,
							thumbnail,
							duration,
							channel: {
								name: channel,
								_id: channelId,
								channelAvatar: channelImage,
							},
							viewsCount,
							createdAt,
						} = video;
						return (
							<Video
								key={id}
								id={id}
								title={title}
								thumbnail={thumbnail}
								channel={channel}
								channelId={channelId}
								channelImage={channelImage || channel}
								views={viewsCount}
								duration={duration}
								date={createdAt}
							/>
						);
					}) : <p>No videos yet</p>}
			</div>
		</InfiniteScroll>
	);
}

export default Recommended;
