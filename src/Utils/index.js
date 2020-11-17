export const getTokenExpiryAndRefreshToken = () => {
	const { tokenExpiry, refreshToken } = JSON.parse(
		localStorage.getItem('tokenData')
	);
	return { tokenExpiry, refreshToken };
};
