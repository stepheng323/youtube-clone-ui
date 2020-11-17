import { createContext, useState } from 'react';

export const ChannelContext = createContext({});

const ChannelContextProvider = ({ children }) => {
	const [channel, setChannel] = useState({});

	return (
		<ChannelContext.Provider value={{ channel, setChannel }}>
			{children}
		</ChannelContext.Provider>
	);
};

export default ChannelContextProvider;
