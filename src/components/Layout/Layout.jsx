import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../header/header';
import SidebarMini from '../SideBarMini/SidebarMini';

const Layout = ({children}) => {
	return (
		<>
		<Header />
		<div className='app-page'>
			<Sidebar />
			<SidebarMini />
			{children}
		</div>
		</>
	);
}

export default Layout;
