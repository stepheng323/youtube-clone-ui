import React from 'react';
import Layout from '../components/Layout/Layout';
import LibraryFeed from '../components/LibraryFeed/Library';

export default function LibraryPage() {
	return (
		<div>
			<Layout>
				<LibraryFeed />
			</Layout>
		</div>
	);
}
