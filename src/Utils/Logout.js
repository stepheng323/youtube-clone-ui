import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../Context/User';
import { REACT_APP_DEV_BASE_URL } from '../constant';
import { ProfileContext } from '../Context/ProfileCard';

const useLogout = () => {
	const history = useHistory();
	const { setUser } = useContext(UserContext);
	const { setOpenProfile } = useContext(ProfileContext);

	const handleLogout = async () => {
		try {
			const res = await fetch(`${REACT_APP_DEV_BASE_URL}/auth/logout`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			});
			if (res.status === 200) {
				setUser({});
				localStorage.removeItem('tokenExpiry')
				setOpenProfile(false)
				history.push('/');
			}
		} catch (err) {
			throw err;
		}
	};
	return { handleLogout };
};
export default useLogout;
