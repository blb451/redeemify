import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router, Tabs } from 'expo-router';
import React, { useEffect } from 'react';

import LayoutHeader from '@/components/LayoutHeader';
import Loading from '@/components/Loading';
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
  const headerShown = useClientOnlyValue(false, true);

  useEffect(() => {
    if (!currentUser) {
      router.replace('/');
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown,
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
