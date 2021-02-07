import React, { useContext, useState } from 'react';
import useFetch from '../../Api/UseFetch';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircularLoading } from '../../Utils/Loading';
import { REACT_APP_DEV_BASE_URL } from '../../constant';
import { UserContext } from '../../Context/User';
import WatchedVideo from '../LikedVideo/likeVideo';
import PlaylistInfo from '../PlaylistInfo/PlaylistInfo';

function LikedVideos() {
	const { user } = useContext(UserContext);
	const likedVideosUrl = `${REACT_APP_DEV_BASE_URL}/like?page=1&limit=8`;
	const { result, isLoading, setResult } = useFetch(likedVideosUrl);
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(1);

	const fetchNext = async () => {
		setPage((page) => page + 1);
		const getMoreVideos = async () => {
			const response = await fetch(
				`${REACT_APP_DEV_BASE_URL}/like?page=${page + 1}&limit=8`
			);
			const result = await response.json();
			if (result.success) {
				setResult({
					...result,
					payload: { data: data.concat(...result.payload.data) },
				});
			}
			if (!result.payload.next) {
				setHasMore(false);
			}
		};
		getMoreVideos();
	};

	if (isLoading) return <p>Loading</p>;
	const {
		payload: { data },
	} = result;

	return (
		<div className='liked-videos'>
			<InfiniteScroll
				dataLength={data.length}
				next={fetchNext}
				hasMore={hasMore}
				loader={
					<div className='recommended-loading-container'>
						<CircularLoading />
					</div>
				}
			>
				<PlaylistInfo
					playlistType={'Watch Later'}
					user={user}
					videosCount={data.length}
					lastThumnail={data[0].video.thumbnail}
				/>
				<div className='liked-videos-right'>
					{data.length &&
						data.map((likedVideo, index) => {
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
								<WatchedVideo
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
			</InfiniteScroll>
		</div>
	);
}

export default LikedVideos;
