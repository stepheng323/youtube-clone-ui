import React, { useContext } from 'react';
import HistoryIcon from '@material-ui/icons/History';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import SmallVideoCard from '../SmallVideoCard/smallVideoCard';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import UseFetch from '../../Api/UseFetch';
import Avatar from '../Avatar/Avatar';
import { capitalize } from '@material-ui/core';
import { REACT_APP_DEV_UPLOAD_URL } from '../../constant';
import './library.css';
import { REACT_APP_DEV_BASE_URL } from '../../constant';
import { UserContext } from '../../Context/User';
import { SmallCardSkeleton } from '../Skeleton/Skeleton';

function Library() {
	const { user } = useContext(UserContext);
	const { firstName, lastName, channel } = user;
	const historyUrl = `${REACT_APP_DEV_BASE_URL}/history?page=1&limit=8`;
	const likedVideosUrl = `${REACT_APP_DEV_BASE_URL}/like?page=1&limit=4`;
	const watchLaterUrl = `${REACT_APP_DEV_BASE_URL}/like/watch-later?page=1&limit=4`;
	const likeCountUrl = `${REACT_APP_DEV_BASE_URL}/like/count`;
	const subscriptionCountUrl = `${REACT_APP_DEV_BASE_URL}/subscriber/count`;
	const uploadCountUrl = `${REACT_APP_DEV_BASE_URL}/video/count`;

	const { result: historyResult, isLoading: isLoadingHistory } = UseFetch(
		historyUrl
	);
	const { result: watchLaterResult, isLoading: isLoadingWatchLater } = UseFetch(
		watchLaterUrl
	);
	const { result: likedVideoResult, isLoading: isLoadingLikedVidoes } = UseFetch(
		likedVideosUrl
	);
	const { result: likeCountResult, isLoading: isLoadingLikeCount } = UseFetch(
		likeCountUrl
	);
	const { result: subCountResult, isLoading: isLoadingSubCount } = UseFetch(
		subscriptionCountUrl
	);
	const {
		result: uploadCountResult,
		isLoading: isLoadingUploadCount,
	} = UseFetch(uploadCountUrl);

	return (
		<div className='library'>
			<div className='library-main'>
				<div className='library-history'>
					<div className='library-history-header'>
						<div className='library-header-icon-container'>
							<HistoryIcon className='library-header-icon' />
							<p className='library-header'>History</p>
						</div>
						<Link to='/history'>
							<p className='see-all-btn'>See All</p>
						</Link>
					</div>
					{isLoadingHistory ? (
						<div className='library-history-body'>
							{Array.from(new Array(8)).map((i) => (
								<SmallCardSkeleton />
							))}
						</div>
					) : historyResult.payload.data?.length ? (
						<div className='library-history-body'>
							{historyResult.payload.data.map((history) => {
								const {
									_id: id,
									video: {
										_id: videoId,
										title,
										thumbnail,
										viewsCount,
										createdAt,
										duration,
										channel: { name: channelName },
									},
								} = history;
								return (
									<SmallVideoCard
										key={id}
										id={videoId}
										title={title}
										channel={channelName}
										thumbnail={thumbnail}
										views={viewsCount}
										date={createdAt}
										duration={duration}
									/>
								);
							})}
						</div>
					) : (
						<div>
							<p className='library-no-content'>
								Videos you watch will show up here. Browse videos
							</p>
						</div>
					)}
				</div>
				<div style={{ marginBottom: '1.5em' }}>
					<Divider />
				</div>
				<div className='library-history'>
					<div className='library-history-header'>
						<div className='library-header-icon-container'>
							<WatchLaterIcon className='library-header-icon' />
							<p className='library-header'>Watch Later</p>
						</div>
						<Link to='/playlist/watched'>
							<p className='see-all-btn'>See All</p>
						</Link>{' '}
					</div>
						{isLoadingWatchLater ? (
							<div className='library-history-body'>
								{Array.from(new Array(4)).map((i) => (
									<SmallCardSkeleton />
								))}
							 </div>
						) : watchLaterResult.payload.data?.length ? (
							<div className="library-history-body">
								{watchLaterResult.payload.data.map((video) => {
								const {
									_id: id,
									video: {
										_id: videoId,
										title,
										thumbnail,
										viewsCount,
										createdAt,
										duration,
									},
								} = video;
								return (
									<SmallVideoCard
										style={{ marginBottom: 0 }}
										key={id}
										id={videoId}
										title={title}
										thumbnail={thumbnail}
										views={viewsCount}
										date={createdAt}
										duration={duration}
									/>
								);
							})} </div>
						) : (
							<p className='library-no-content'>
								Add a video to watch later. Your list shows up right
								here.
							</p>
						)}
				</div>
				<div style={{ marginBottom: '1.5em' }}>
					<Divider />
				</div>
				<div className='library-history'>
					<div className='library-history-header'>
						<div className='library-header-icon-container'>
							<ThumbUpIcon className='library-header-icon' />
							<p className='library-header'>Liked Videos</p>
						</div>
						<Link to='/liked-videos'>
							<p className='see-all-btn'>See All</p>
						</Link>{' '}
					</div>
					{isLoadingLikedVidoes ? (
							<div className='library-history-body'>
								{Array.from(new Array(4)).map((i) => (
									<SmallCardSkeleton />
								))}
							 </div>
						):
					  likedVideoResult.payload.data?.length ? (
						<div className='library-history-body'>
							{likedVideoResult.payload.data.map((video) => {
								const {
									_id: id,
									video: {
										_id: videoId,
										title,
										thumbnail,
										viewsCount,
										createdAt,
										duration,
										channel: { name: channelName },
									},
								} = video;
								return (
									<SmallVideoCard
										style={{ marginBottom: 0 }}
										key={id}
										id={videoId}
										title={title}
										channel={channelName}
										thumbnail={thumbnail}
										views={viewsCount}
										date={createdAt}
										duration={duration}
									/>
								);
							})}
						</div>
					) : (
						<div className="library-history-body">
							<p className="library-no-content">
							Use the thumbs up icon to like videos. Your list shows up right
							here.
						</p>
						</div>
					)}
				</div>
			</div>

			<div className='libray-profile'>
				<div className='libray-profile-display'>
					<Avatar
						size='medium'
						alt={capitalize(user?.channel?.name || user?.firstName)}
						src={`${REACT_APP_DEV_UPLOAD_URL}/${user?.channel?.channelAvatar}`}
					/>
					<p className='libray-profile-channelName'>
						{channel ? channel.name : `${firstName} ${lastName}`}
					</p>
				</div>
				<div className='channel-profile-info'>
					<Divider />
					<div className='channel-profile-stats'>
						<p channel-profile-stats>Subscriptions</p>
						<p channel-profile-stats>{subCountResult?.payload}</p>
					</div>
					<Divider />
					<div className='channel-profile-stats'>
						<p channel-profile-stats>Uploads</p>
						<p channel-profile-stats>
							{user.channel ? uploadCountResult?.payload : 0}
						</p>
					</div>
					<Divider />
					<div className='channel-profile-stats'>
						<p channel-profile-stats>Likes</p>
						<p channel-profile-stats>{likeCountResult?.payload}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Library;
