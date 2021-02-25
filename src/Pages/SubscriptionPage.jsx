import React, { useContext } from 'react';
import Layout from '../components/Layout/Layout';
import Subscriptions from '../components/Subscriptions/subscription';
import { UserContext } from '../Context/User';
import MustSignIn from '../components/MustSignIn/MustSignIn';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import UseFetch from '../Api/UseFetch';
import { REACT_APP_DEV_BASE_URL } from '../constant';
import { SubscriptionContext } from '../Context/Subsription';
import MySubscription from '../components/MySubscription/MySubscription';
import { SmallCardSkeleton } from '../components/Skeleton/Skeleton';

export default function SubscriptionPage() {
  const { user } = useContext(UserContext);
  const { subscriptions } = useContext(SubscriptionContext);

  const userExist = Object.keys(user).length > 0;
  const subscriptionCountUrl = `${REACT_APP_DEV_BASE_URL}/subscriber/count`;
  const {
    result: subscriptionCountResult,
    isLoading: subscriptionCountLoading,
  } = UseFetch(subscriptionCountUrl);

  if (!subscriptions || !subscriptionCountResult)
    return (
      <div>
        <Layout>
          <div className="my-subscriptions">
          <div style={{paddingTop: '2em'}} className="my-subscription-content">
            {Array.from(Array(16)).map((item, index) => (
              <SmallCardSkeleton key={index} />
            ))}
          </div>
          </div>
        </Layout>
      </div>
    );
  const { payload: subscriptionCount } = subscriptionCountResult;
  return (
    <div>
      <Layout>
        {!userExist ? (
          <MustSignIn
            Icon={SubscriptionsIcon}
            heading="Don’t miss new videos"
            body="Sign in to see updates from your favorite YouTube channels"
          />
        ) : null}
        {userExist && subscriptionCount === 0 ? (
          <Subscriptions />
        ) : (
          <MySubscription />
        )}
      </Layout>
    </div>
  );
}
