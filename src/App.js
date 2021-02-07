import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import SearchPage from './Pages/SearchPage';
import Watch from './components/Watch/Watch';
import Login from './Pages/Login/Login';
import ChannelPage from './Pages/Channel';
import HistoryPage from './Pages/HistoryPage';
import Signup from './Pages/Signup/signup';
import { UserContext } from './Context/User';
import fetchToken from './Api/GetToken';
import CustomChannel from './components/CustomChannel/customChannel';
import ChannelSetup from './components/ChannelSetup/ChannelSetup';
import MyChannel from './components/MyChannel/MyChannel';
import { useContext } from 'react';
import { useEffect } from 'react';
import TrendingPage from './Pages/Trending';
import LikedVideoPage from './Pages/LikedVideoPage';
import LibraryPage from './Pages/LibraryPage';


import './App.css';
import WatchedVideosPage from './Pages/WatchedVideosPage';

function App() {
	const { setUser } = useContext(UserContext);
	useEffect(() => {
		const fetchdata = async () => {
			const response = await fetchToken();
			if (response && response.success){
				const {payload} = response;
				localStorage.setItem('tokenExpiry', payload.tokenExpiry )
				setUser(payload);
			}
		};
		fetchdata();
	}, [setUser]);
	return (
		<Router>
			<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/search/:query' component={SearchPage} />
					<Route exact path='/watch/:id' component={Watch}  />
					<Route exact path='/login' component={Login} />
					<Route exact path='/signup' component={Signup} />
					<Route exact path='/trending' component={TrendingPage} />
					<Route exact path='/library' component={LibraryPage} />
					<Route exact path='/history' component={HistoryPage} />
					<Route exact path='/channel' component={MyChannel} />
					<Route exact path='/channel/create' component={CustomChannel} />
					<Route exact path='/channel/setup/:channelName' component={ChannelSetup} />
					<Route exact path='/channel/:channelName' component={ChannelPage} />
					<Route exact path='/liked-videos' component={LikedVideoPage} />
					<Route exact path='/playlist/watched' component={WatchedVideosPage} />
			</Switch>
				</Router>

	);
}

export default App;
