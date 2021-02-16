import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import UserContextProvider from './Context/User';
import ProfileContextProvider from './Context/ProfileCard';
import ChannelContextProvider from './Context/Channel';
import SubscriptionContextProvider from './Context/Subsription';
import ToggleSidebarContextProvider from './Context/ToggleSidebar';

ReactDOM.render(
	<React.StrictMode>
		<UserContextProvider>
			<ChannelContextProvider>
				<SubscriptionContextProvider>
					<ProfileContextProvider>
						<ToggleSidebarContextProvider>
						<App />
						</ToggleSidebarContextProvider>
					</ProfileContextProvider>
				</SubscriptionContextProvider>
			</ChannelContextProvider>
		</UserContextProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
