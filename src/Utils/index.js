export const getTokenExpiryAndRefreshToken = () => {
	const { tokenExpiry, refreshToken } = JSON.parse(
		localStorage.getItem('tokenData')
	);
	return { tokenExpiry, refreshToken };
};

export const removeSpecialCharacters = (string) => {
	return string.replace(/[^\w\s]/gi, ' ');
};
