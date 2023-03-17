import React, {useEffect} from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';
import Todo from './src/components/Todo';
import User from './src/components/User';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/components/Home';
import useTheme from './src/Hooks/useTheme';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const colorScheme = useColorScheme();

  const setTheme = useTheme(state => state.setTheme);
  const theme = useTheme(state => state.theme);

  useEffect(() => {
    if (colorScheme && colorScheme !== theme) {
      setTheme(colorScheme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorScheme]);

  return (
    <SafeAreaView className="h-full">
      <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Todo" component={Todo} />
          <Stack.Screen name="User" component={User} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
