import { lazy, Suspense, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import { UserContext } from './Context/User';
import fetchToken from './Api/GetToken';
import { useEffect } from 'react';

import './App.css';
const Login = lazy(() => import('./Pages/Login/Login'));
const Signup = lazy(() => import('./Pages/Signup/signup'));
const Watch = lazy(() => import('./components/Watch/Watch'));
const SearchPage = lazy(() => import('./Pages/SearchPage'));
const ChannelPage = lazy(() => import('./Pages/Channel'));
const HistoryPage = lazy(() => import('./Pages/HistoryPage'));
const ChannelSetup = lazy(() =>
	import('./components/ChannelSetup/ChannelSetup')
);
const CustomChannel = lazy(() =>
	import('./components/CustomChannel/customChannel')
);
const WatchedVideosPage = lazy(() => import('./Pages/WatchedVideosPage'));
const LibraryPage = lazy(() => import('./Pages/LibraryPage'));
const SubscriptionsPage = lazy(() => import('./Pages/SubscriptionPage'));
const LikedVideoPage = lazy(() => import('./Pages/LikedVideoPage'));
const TrendingPage = lazy(() => import('./Pages/Trending'));
const MyChannel = lazy(() => import('./components/MyChannel/MyChannel'));

function App() {
	const { setUser } = useContext(UserContext);
	useEffect(() => {
		const fetchdata = async () => {
			const response = await fetchToken();
			if (response && response.success) {
				const { payload } = response;
				localStorage.setItem('tokenExpiry', payload.tokenExpiry);
				setUser(payload);
			}
		};
		fetchdata();
	}, [setUser]);

	return (
		<Router>
			<Switch>
				<Suspense fallback={<div>Loading...</div>}>
					<Route exact path='/' component={Home} />
					<Route exact path='/search/:query' component={SearchPage} />
					<Route exact path='/watch/:id' component={Watch} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/signup' component={Signup} />
					<Route exact path='/trending' component={TrendingPage} />
					<Route exact path='/library' component={LibraryPage} />
					<Route exact path='/history' component={HistoryPage} />
					<Route exact path='/create/channel' component={CustomChannel} />
					<Route exact path='/channel' component={MyChannel} />
					<Route
						exact
						path='/channel/setup/:channelName'
						component={ChannelSetup}
					/>
					<Route exact path='/channel/:channelName' component={ChannelPage} />
					<Route exact path='/liked-videos' component={LikedVideoPage} />
					<Route exact path='/playlist/watched' component={WatchedVideosPage} />
					<Route exact path='/subscriptions' component={SubscriptionsPage} />
				</Suspense>
			</Switch>
		</Router>
	);
}

export default App;
