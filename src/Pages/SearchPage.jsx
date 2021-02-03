import React from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Layout from '../components/Layout/Layout';
import Search from '../components/Search/Search';

export default function SearchPage() {
	const location = useLocation();
	return (
		<div>
			<Layout>
				<Search key={location.pathname}/>
			</Layout>
		</div>
	);
}
