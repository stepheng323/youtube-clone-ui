import React from 'react';
import Layout from '../components/Layout/Layout';
import Recommended from '../components/Recomended-Video/Recommended';

export default function Home() {
	return (
		<div>
			<Layout>
				<Recommended />
			</Layout>
		</div>
	);
}
