import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

function SkeletonAnimation() {
	return <Skeleton variant='circle' width={40} height={40} />;
}

export const rectangleAnimation = () => {
	return <Skeleton variant='rect' width={210} height={118} />;
};

export default SkeletonAnimation;
