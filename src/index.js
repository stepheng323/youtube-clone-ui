import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UserContextProvider from './Context/User';
import ProfileContextProvider from './Context/Profile';

ReactDOM.render(
	<React.StrictMode>
		<UserContextProvider>
			<ProfileContextProvider>
				<App />
			</ProfileContextProvider>
		</UserContextProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
