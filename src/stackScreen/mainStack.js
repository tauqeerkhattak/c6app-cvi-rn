import * as React from 'react';
import * as RN from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeTabScreen from '../screen/homeTabScreen'
import SettingTabScreen from '../screen/settingTabScreen'

import { theme } from '../common/csTheme'

const Tab = createBottomTabNavigator();


function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

  switch (routeName) {
    case 'Home':
      return 'Home';
    case 'Setting':
      return 'Settings';
    case 'Profile':
      return 'Profile';
  }
}

function MainStackScreen({ navigation, route }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  }, [navigation, route]);

  return (
    <Tab.Navigator screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                      let iconName;

                      switch (route.name) {
                        case 'Home':
                          iconName = focused ? 'home' : 'home-outline';
                          break;
                        case 'Profile':
                          iconName = focused ? 'person': 'person-outline';
                          break;
            
                        default:
                          break;
                      }

                      // You can return any component that you like here!
                      return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: theme.colors.csPrimary[600],
                    tabBarInactiveTintColor: theme.colors.gray2,
                    headerShown: false,
                   })}
                    >
      <Tab.Screen
        name='Home'
        component={HomeTabScreen}
        options={{ title: 'Home' }}
        initialParams={ {itemId: 50}}
      />
      <Tab.Screen
        name='Profile'
        component={SettingTabScreen}
        options={{ title: 'Profile' }}
        initialParams={ {itemId: 50}}
      />
    </Tab.Navigator>
  )
}

export default MainStackScreen;