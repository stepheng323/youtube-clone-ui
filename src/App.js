import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import SearchPage from './Pages/SearchPage';
import Watch from './components/Watch/Watch';
import Login from './Pages/Login/Login';
import ChannelPage from './Pages/Channel';
import Signup from './Pages/Signup/signup';
import { UserContext } from './Context/User';
import fetchToken from './Api/GetToken';

import './App.css';
import { useContext } from 'react';
import { useEffect } from 'react';

function App() {
	const {setUser } = useContext(UserContext);
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
					<Route exact path='/watch/:id' component={Watch} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/signup' component={Signup} />
					<Route exact path='/channel/:channelName' component={ChannelPage} />
			</Switch>
		</Router>
	);
}

export default App;
