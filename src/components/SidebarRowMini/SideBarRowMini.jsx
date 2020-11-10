import React from 'react';
import { Link } from 'react-router-dom';

import './sidebar-row-mini.css';

function SideBarRowMini({ title, selected, Icon, url }) {
	return (
		<Link to={`${url}`}>
			<div className={`sidebar-row-mini ${selected && 'selected'}`}>
				<Icon className='sidebar-row-mini-icon' />
				<p>{title}</p>
			</div>
		</Link>
	);
}

export default SideBarRowMini;
