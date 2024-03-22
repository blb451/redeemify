import { useUserContext } from '@/contexts/userContext';
import { useRewardRedemptionContext } from '@/contexts/rewardRedemptionContext';

import type { Redemption, Reward } from '@/types';

const useRewardsByRedemptionStatus = (redeemed: boolean) => {
  const { currentUser } = useUserContext();
  const { rewards, redemptions } = useRewardRedemptionContext();

  if (!currentUser || !rewards || !redemptions) {
    throw new Error('Contexts not provided');
  }

  let rewardsList: Reward[] = [];

  if (redeemed) {
    // Compute the list of redeemed rewards
    rewardsList = rewards.filter((reward: Reward) =>
      redemptions.some(
        (redemption: Redemption) =>
          redemption.user_id === currentUser.id &&
          redemption.reward_id === reward.id
      )
    );
  } else {
    // Compute the list of unredeemed rewards
    rewardsList = rewards.filter(
      (reward) =>
        !redemptions.some(
          (redemption) =>
            redemption.user_id === currentUser.id &&
            redemption.reward_id === reward.id
        )
    );
  }

  return rewardsList;
};

export default useRewardsByRedemptionStatus;
