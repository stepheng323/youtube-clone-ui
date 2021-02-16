import React, { useContext, useState } from 'react';
import useFetch from '../../Api/UseFetch';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircularLoading } from '../../Utils/Loading';
import { REACT_APP_DEV_BASE_URL } from '../../constant';
import { UserContext } from '../../Context/User';
import WatchedVideo from '../LikedVideo/likeVideo';
import PlaylistInfo from '../PlaylistInfo/PlaylistInfo';
import './watched-playlist.css'
import { LikedVideoSkeleton } from '../Skeleton/Skeleton';


function LikedVideos() {
	const { user } = useContext(UserContext);
	const likedVideosUrl = `${REACT_APP_DEV_BASE_URL}/like/watch-later?page=1&limit=8`;
	const { result, isLoading, setResult } = useFetch(likedVideosUrl);
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(1);


	const fetchNext = async () => {
		setPage((page) => page + 1);
		const getMoreVideos = async () => {
			const response = await fetch(
				`${REACT_APP_DEV_BASE_URL}/like/watch-later?page=${page + 1}&limit=8`
			);
			const result = await response.json();
			// if (result.success) {
				setResult({
					...result,
					payload: { data: result.payload.data.concat(...result.payload.data) || []},
				});
			// }
			if (!result.payload.next) {
				setHasMore(false);
			}
		};
		getMoreVideos();
	};

	const InfiniteScrollStyle = {
		backgroundColor: '#f1f1f1',
		padding: '1em 2em 0 0.5em',
		// overflowY: 'hidden',
	};

	return (
		<div className='watched-videos'>
			{!isLoading ? (
				<PlaylistInfo
					playlistType={'Watched Videos'}
					user={user}
					videosCount={result.payload.data?.length || 0}
					lastThumbnail={
						result.payload.data?.length
							? result.payload.data[0].video.thumbnail
							: ''
					}
				/>
			) : (
				<p>loading...</p>
			)}
			<div className='watched-videos-right'>
			{isLoading ? (
					Array.from(new Array(8)).map((i) => (
						<LikedVideoSkeleton />
					))
			) : 
				<>
					{result.payload.data?.length ? (
					<InfiniteScroll
						style={InfiniteScrollStyle}
						dataLength={result.payload.data.length}
						next={fetchNext}
						hasMore={hasMore}
						loader={
							<div className='recommended-loading-container'>
								<CircularLoading />
							</div>
						}
					>
						{result.payload.data.map((likedVideo, index) => {
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
					</InfiniteScroll>
					) : (
					<div className='no-watched-videos'>
						<p>
							No videos in this playlist
						</p>
					</div>
					)}
				</>
			}
			</div>
		</div>
	);
}

export default LikedVideos;
