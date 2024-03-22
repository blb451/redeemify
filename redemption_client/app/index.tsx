import { StyleSheet } from 'react-native';

import Login from '@/components/Login';
import { Text, View } from '@/components/Themed';

export default function IndexScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>redeemify</Text>
      <Login />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
