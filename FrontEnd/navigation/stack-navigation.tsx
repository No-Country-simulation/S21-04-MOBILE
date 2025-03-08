import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import { DetailProfileScreen } from '../screens';
import BottomTabs from "./tabs-navigation";

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs" component={BottomTabs} />
          <Stack.Screen name="Detail" component={DetailProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  activeIcon: {
    backgroundColor: '#d7044e',
    padding: 6,
    borderRadius: 75,
  },
});
