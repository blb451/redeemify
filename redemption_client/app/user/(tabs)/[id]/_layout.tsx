import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router, Tabs } from 'expo-router';
import React, { useEffect } from 'react';
// import { ActivityIndicator } from 'react-native';

import LayoutHeader from '@/components/LayoutHeader';
import Colors from '@/constants/Colors';
import { useUserContext } from '@/contexts/userContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useClientOnlyValue } from '@/hooks/useClientOnlyValue';
import useFetchRewardRedemptionData from '@/hooks/useFetchRewardRedemptionData';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { currentUser } = useUserContext();
  const loading = useFetchRewardRedemptionData();

  useEffect(() => {
    if (!currentUser) {
      router.replace('/');
    }
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="redeem"
        options={{
          header: (props) => (
            <LayoutHeader
              currentUser={currentUser}
              title={props.options.title}
            />
          ),
          title: 'Redeem Points',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="shopping-cart" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          header: (props) => (
            <LayoutHeader
              currentUser={currentUser}
              title={props.options.title}
            />
          ),
          title: 'My Rewards',
          tabBarIcon: ({ color }) => <TabBarIcon name="trophy" color={color} />,
        }}
      />
    </Tabs>
  );
}
