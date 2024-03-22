import { useState, useEffect } from 'react';

import { useUserContext } from '@/contexts/userContext';
import { useRewardRedemptionContext } from '@/contexts/rewardRedemptionContext';
import * as api from '@/utils/api';

const useFetchRewardRedemptionData = () => {
  const { setRewards, setRedemptions } = useRewardRedemptionContext();
  const { currentUser } = useUserContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRewardRedemptionData = async () => {
      try {
        // Fetch rewards
        const rewardsResponse = await api.fetchRewards();
        setRewards(rewardsResponse.data);

        // Fetch redemptions
        if (currentUser) {
          const redemptionsResponse = await api.fetchRedemptionsByUserId(
            currentUser.id
          );
          setRedemptions(redemptionsResponse.data);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching rewards and redemptions:', error);
        setLoading(false);
      }
    };

    fetchRewardRedemptionData();
  }, [currentUser?.points]);

  return loading;
};

export default useFetchRewardRedemptionData;
