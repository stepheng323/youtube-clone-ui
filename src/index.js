import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import UserContextProvider from './Context/User';
import ProfileContextProvider from './Context/ProfileCard';
import ChannelContextProvider from './Context/Channel';

ReactDOM.render(
	<React.StrictMode>
		<UserContextProvider>
			<ChannelContextProvider>
			<ProfileContextProvider>
				<App />
			</ProfileContextProvider>
			</ChannelContextProvider>
		</UserContextProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
