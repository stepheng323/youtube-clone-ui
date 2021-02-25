/* eslint-disable react/prop-types */
import React from 'react';
import './sidebarRow.css';

function SidebarRow({ selected, title, Icon, handleClick }) {
	return (
		<div
			onClick={handleClick}
			className={`sidebar-row ${selected && 'selected'}`}
		>
			<Icon className='sidebar-row-icon' />
			<p className='sidebar-row-title'>{title}</p>
		</div>
	);
}

export default SidebarRow;
