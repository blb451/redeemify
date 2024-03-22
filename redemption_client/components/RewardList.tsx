import { FlatList, SafeAreaView, StyleSheet } from 'react-native';

import { View, Text } from '@/components/Themed';

import type { Reward } from '@/types';

interface RewardListProps {
  emptyText: string;
  rewards: Reward[];
  displayRewardCards: (item: Reward) => React.JSX.Element;
}

export default function RewardList({
  emptyText,
  rewards,
  displayRewardCards,
}: RewardListProps) {
  if (!rewards.length) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>{emptyText}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={rewards}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>{displayRewardCards(item)}</View>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  cardContainer: {
    maxWidth: 380,
    marginBottom: 20,
    alignSelf: 'center',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 20,
  },
});
