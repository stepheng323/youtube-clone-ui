import React, { createContext, useState } from 'react';

export const ProfileContext = createContext(false);

function ProfileContextProvider({ children }) {
	const [openProfile, setOpenProfile] = useState(false);

	return (
		<ProfileContext.Provider value={{ openProfile, setOpenProfile }}>
			{children}
		</ProfileContext.Provider>
	);
}

export default ProfileContextProvider;
