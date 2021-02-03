import React, { useState, useEffect } from 'react';
import TrendingVideo from '../TrendingVideo/TrendingVideo';
import InfiniteScroll from 'react-infinite-scroll-component';
import './trending.css';
import { REACT_APP_DEV_BASE_URL } from '../../constant';
import { CircularLoading } from '../../Utils/Loading';
import { TrendingSkeleton } from '../../components/Skeleton/Skeleton';

function Trending() {
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [videos, setVideos] = useState([]);
	const [initialLoading, setinitialLoading] = useState(true);
	const trendingVideosUrl = `${REACT_APP_DEV_BASE_URL}/video/trending?page=${page}&limit=8`;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(trendingVideosUrl);
				const result = await res.json();
				setVideos(result.payload.data);
				setinitialLoading(false);
				if (!result.payload.next) {
					setHasMore(false);
				}
			} catch (error) {}
		};
		fetchData();
	}, []);

	const fetchNext = async () => {
		setPage((page) => page + 1);
		const getMoreVideos = async () => {
			const response = await fetch(
				`${REACT_APP_DEV_BASE_URL}/video/trending?page=${page + 1}&limit=8`
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
			<div className='trending-videos-container'>
				{Array.from(Array(16)).map((item) => (
					<TrendingSkeleton key={item} />
				))}
			</div>
		);
	}

	return (
		<div className='trending-videos-container'>
		<InfiniteScroll
			style={{ overflowY: 'hidden' }}
			dataLength={videos.length}
			next={fetchNext}
			hasMore={hasMore}
			loader={
				<div className=''>
					<CircularLoading />
				</div>
			}
		>
				{videos.length ? (
					videos.map((videoInfo) => {
						const {
							_id,
							title,
							description,
							duration,
							thumbnail,
							createdAt,
							viewsCount,
							channel: { name: channelName },
						} = videoInfo;
						return (
							<TrendingVideo
								key={_id}
								id={_id}
								title={title}
								description={description}
								thumbnail={thumbnail}
								duration={duration}
								views={viewsCount}
								date={createdAt}
								channelName={channelName}
							/>
						);
					})
				) : (
					<p>There are no trending videos at this time please tyr again</p>
				)}
		 </InfiniteScroll>
			</div>
	);
}
export default Trending;
