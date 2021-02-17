import React, { useContext } from 'react';
import Layout from '../components/Layout/Layout';
import LibraryFeed from '../components/LibraryFeed/Library';
import { UserContext } from '../Context/User';
import MustSignIn from '../components/MustSignIn/MustSignIn';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';

export default function LibraryPage() {
	const { user } = useContext(UserContext);
	const userExist = Object.keys(user).length > 0;
	return (
		<div>
			<Layout>
				{userExist ? (
					<LibraryFeed />
				) : (
						<MustSignIn
							Icon={VideoLibraryIcon}
							heading='Enjoy your favorite videos'
							body='Sign in to access videos that you’ve liked or saved'
						/>
				)}
			</Layout>
		</div>
	);
}
