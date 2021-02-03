import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

import './skeleton.css';

export const RecommendedSkeleton = () => {
	return (
		<div className='video-card'>
			<Skeleton variant='rect' width={248} height={150} />
			<div className='recommended-sekeleton-infos'>
				<Skeleton variant='circle' width={40} height={40} />
				<div className=''>
					<Skeleton variant='text' width={200} height={30} />
					<Skeleton variant='text' width={150} height={30} />
				</div>
			</div>
		</div>
		
	);
};


export const TrendingSkeleton = () => {
	return (
		<div className='trending-video'>
			<Skeleton style={{marginRight: '1em'}} variant='rect' width={248} height={150} />
			<div className='trending-video-info'>
					<Skeleton variant='text' width={500} height={20} />
					<Skeleton style={{marginTop: '.5em'}} variant='text' width={200} height={10} />
					<Skeleton style={{marginTop: '1em'}} variant='text' width={550} height={30} />
			</div>
		</div>
		
	);
};

