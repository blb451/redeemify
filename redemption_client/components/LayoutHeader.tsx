import { StyleSheet } from 'react-native';

import { View, Text } from '@/components/Themed';

import { User } from '@/types';

interface LayoutHeaderProps {
  currentUser: User | null;
  title?: string;
}

export default function LayoutHeader({
  currentUser,
  title,
}: LayoutHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.pointsContainer}>
        <Text style={styles.points}>Available Points: </Text>
        <Text style={styles.pointValue}>{currentUser?.points}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    padding: 15,
    paddingTop: 50,
  },
  pointsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  points: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  pointValue: {
    fontSize: 16,
  },
  title: {
    fontSize: 20,
  },
});
