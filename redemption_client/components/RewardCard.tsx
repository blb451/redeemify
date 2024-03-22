import { StyleSheet, View, Text, Pressable, Image } from 'react-native';

import { User, Reward } from '@/types';
import { formatDate } from '@/utils/formatDate';

interface RewardCardProps {
  currentUser: User | null;
  disabled?: Boolean;
  reward: Reward;
  redeem?: (rewardId: string, currentUserId: string, points: number) => void;
  redeemedAt?: string;
}

export default function RewardCard({
  currentUser,
  disabled,
  reward,
  redeem,
  redeemedAt,
}: RewardCardProps) {
  const rewardTooExpensive =
    currentUser?.points && reward.points_required > currentUser.points;
  const isDisabled = Boolean(redeemedAt || disabled || rewardTooExpensive);

  return (
    <View style={styles.cardContainer} key={reward.id}>
      <Image source={{ uri: reward.image_url }} style={styles.rewardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.rewardName}>{reward.name}</Text>
        <Text style={styles.pointsText}>
          {redeemedAt ? 'Points Spent: ' : 'Points Required: '}
          {reward.points_required}
        </Text>
        {redeem && currentUser && (
          <Pressable
            disabled={isDisabled}
            onPress={() =>
              redeem(reward.id, currentUser.id, reward.points_required)
            }
            style={
              isDisabled
                ? [styles.button, styles.disabledButton]
                : [styles.button]
            }
          >
            <Text style={styles.buttonText}>
              {rewardTooExpensive ? 'Not Enough Points' : 'Redeem'}
            </Text>
          </Pressable>
        )}
        {redeemedAt && (
          <Text style={styles.pointsText}>
            Redeemed: {formatDate(redeemedAt)}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    minWidth: 380,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  cardContent: {
    padding: 15,
  },
  rewardImage: {
    width: '100%',
    height: 200,
  },
  rewardName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pointsText: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
});
