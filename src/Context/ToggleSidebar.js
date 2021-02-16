import { createContext, useState } from 'react';

export const ToggleSidebarContext = createContext({});

const ToggleSidebarContextProvider = ({ children }) => {
	const [width, setWidth] = useState(window.innerWidth);

	return (
		<ToggleSidebarContext.Provider value={{ width, setWidth }}>
			{children}
		</ToggleSidebarContext.Provider>
	);
};

export default ToggleSidebarContextProvider;
