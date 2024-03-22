import { router } from 'expo-router';
import { Alert } from 'react-native';

import RewardCard from '@/components/RewardCard';
import RewardList from '@/components/RewardList';
import { useUserContext } from '@/contexts/userContext';
import { useRewardRedemptionContext } from '@/contexts/rewardRedemptionContext';
import useRewardsByRedemptionStatus from '@/hooks/useRewardsByRedemptionStatus';
import * as api from '@/utils/api';

import type { Reward, User } from '@/types';

const displayRewardsCards = (
  reward: Reward,
  currentUser: User | null,
  redeem: (id: string, userId: string, points: number) => void
) => <RewardCard currentUser={currentUser} reward={reward} redeem={redeem} />;

export default function RedeemScreen() {
  const { currentUser, setCurrentUser } = useUserContext();
  const rewards = useRewardsByRedemptionStatus(false);
  const { redemptions, setRedemptions } = useRewardRedemptionContext();

  const redeem = async (id: string, userId: string, points: number) => {
    const response = await api.redeemReward(userId, id);

    if (response?.data?.redemption && currentUser) {
      setRedemptions([...redemptions, response.data.redemption]);
      // Optimistically update user points
      setCurrentUser({ ...currentUser, points: currentUser.points - points });
      Alert.alert(
        'Success',
        'Redeemed Reward',
        [
          {
            text: 'View Reward',
            onPress: () => router.replace(`/user/${id}/rewards`),
          },
        ],
        { cancelable: true }
      );
    } else {
      Alert.alert('Failure', 'Unable to Redeem Reward', [], {
        cancelable: true,
      });
    }
  };

  return (
    <RewardList
      emptyText="No rewards available."
      rewards={rewards}
      displayRewardCards={(item: Reward) =>
        displayRewardsCards(item, currentUser, redeem)
      }
    />
  );
}
