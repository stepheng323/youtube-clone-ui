import React, { useContext, useState } from 'react';
import useFetch from '../../Api/UseFetch';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircularLoading } from '../../Utils/Loading';
import './liked-videos.css';
import { REACT_APP_DEV_BASE_URL } from '../../constant';
import { UserContext } from '../../Context/User';
import LikedVideo from '../LikedVideo/likeVideo';
import PlaylistInfo from '../PlaylistInfo/PlaylistInfo';
import getToken from '../../Api/GetToken';


function LikedVideos() {
	const { user, setUser } = useContext(UserContext);
	const likedVideosUrl = `${REACT_APP_DEV_BASE_URL}/like?page=1&limit=8`;
	const { result, isLoading, setResult } = useFetch(likedVideosUrl);
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(1);
	const tokenExpiry = JSON.parse(localStorage.getItem('tokenExpiry'));
	let token;

	const getNewToken = async () => {
		const response = await getToken();
		if (response.success) {
			const { payload } = response;
			token = payload.token;
			localStorage.setItem('tokenExpiry', payload.tokenExpiry);
			setUser(() => payload);
		}
	};

	const fetchNext = async () => {
		if (Date.now() >= +tokenExpiry * 1000 || !user.token) {
			await getNewToken();
		}
		setPage((page) => page + 1);
		const getMoreVideos = async () => {
			const response = await fetch(`${REACT_APP_DEV_BASE_URL}/like?page=${page + 1}&limit=8`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token || user.token}`,
					'Content-Type': 'application/json',
				}});
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
		payload: { data = [] },
	} = result;

	return (
		<div className='liked-videos'>
			<InfiniteScroll
			 	style={{ overflowY: 'hidden' }}
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
					playlistType={'Liked Videos'}
					user={user}
					videosCount={data.length}
					lastThumbnail={data.length ? data[0].video.thumbnail : ''}
				/>
				<div className='liked-videos-right'>
					{data.length ? (
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
						})
					) : (
						<div className="no-liked-videos">
							<p>No videos in this playlist yet</p>
						</div>
					)}
				</div>
			</InfiniteScroll>
		</div>
	);
}

export default LikedVideos;
