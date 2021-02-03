import React, { useContext } from 'react';
import Layout from '../components/Layout/Layout';
import Channel from '../components/Channel/channel';
import MyChannel from '../components/MyChannel/MyChannel';
import { UserContext } from '../Context/User';
import { useParams } from 'react-router-dom';

export default function ChannelPage() {
	const { user } = useContext(UserContext);
	const { channelName } = useParams();
	const userExist = Object.keys(user).length > 0;

	return (
		<div>
			<Layout>
				{userExist & (user?.channel?.name === channelName) ? (
					<MyChannel />
				) : (
					<Channel />
				)}
			</Layout>
		</div>
	);
}
