import React, { createContext, useState } from 'react';

export const UserContext = createContext({});

function UserContextProvider({ children }) {
	const [user, setUser] = useState({});

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
}

export default UserContextProvider;
