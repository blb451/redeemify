import RewardCard from '@/components/RewardCard';
import RewardList from '@/components/RewardList';
import { useUserContext } from '@/contexts/userContext';
import useRewardsByRedemptionStatus from '@/hooks/useRewardsByRedemptionStatus';
import { useRewardRedemptionContext } from '@/contexts/rewardRedemptionContext';

import { Redemption, Reward, User } from '@/types';

const displayRewardsCards = (
  reward: Reward,
  currentUser: User | null,
  redemptions: Redemption[]
) => {
  const redemption = redemptions.find(
    (redemption) => redemption.reward_id === reward.id
  );
  return (
    <RewardCard
      currentUser={currentUser}
      reward={reward}
      redeemedAt={redemption?.created_at}
    />
  );
};

export default function RewardsScreen() {
  const { currentUser } = useUserContext();
  const { redemptions } = useRewardRedemptionContext();
  const rewards = useRewardsByRedemptionStatus(true);

  return (
    <RewardList
      emptyText="No rewards redeemed (yet)."
      rewards={rewards}
      displayRewardCards={(item: Reward) =>
        displayRewardsCards(item, currentUser, redemptions)
      }
    />
  );
}
