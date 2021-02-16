import React, { useContext } from 'react';
import Layout from '../components/Layout/Layout';
import History from '../components/History/history';
import { UserContext } from '../Context/User';
import MustSignIn from '../components/MustSignIn/MustSignIn';
import HistoryIcon from '@material-ui/icons/History';

export default function ChannelPage() {
	const { user } = useContext(UserContext);
	const userExist = Object.keys(user).length > 0;
	return (
		<div>
			<Layout>
				{userExist ? (
					<History />
				) : (
					<MustSignIn
						Icon={HistoryIcon}
						heading='Keep track of what you watch'
						body="Watch history isn't viewable when signed out Learn more"
					/>
				)}
			</Layout>
		</div>
	);
}
