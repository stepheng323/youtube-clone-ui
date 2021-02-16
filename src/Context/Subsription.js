import React, { createContext, useState } from 'react';

export const SubscriptionContext = createContext({});

function SubscriptionContextProvider({ children }) {
	const [subscriptions, setSubscriptions] = useState([]);

	return (
		<SubscriptionContext.Provider value={{ subscriptions, setSubscriptions }}>
			{children}
		</SubscriptionContext.Provider>
	);
}

export default SubscriptionContextProvider;
