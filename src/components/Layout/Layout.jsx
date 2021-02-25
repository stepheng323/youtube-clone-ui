/* eslint-disable react/prop-types */
import React, { useEffect, useContext } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../header/header';
import SidebarMini from '../SideBarMini/SidebarMini';
import { ToggleSidebarContext } from '../../Context/ToggleSidebar';

const Layout = ({ children }) => {
	const { width, setWidth } = useContext(ToggleSidebarContext);
	const breakPoint = 1336;


	useEffect(() => {
		const handleResixe = () => setWidth(window.innerWidth);
		window.addEventListener('resize', handleResixe)
		return () => window.removeEventListener('resize', handleResixe);
	}, [width]);

	return (
		<div>
			<Header />
			<div className='app-page'>
				{width >= breakPoint ? <Sidebar /> : <SidebarMini />}
				{children}
			</div>
		</div>
	);
};

export default Layout;
