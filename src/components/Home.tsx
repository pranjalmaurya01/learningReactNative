import {NavigationProp} from '@react-navigation/native';
import {Button, View} from 'react-native';
import React from 'react';
import useTheme from '../Hooks/useTheme';

export default function Home({
  navigation,
}: {
  navigation: NavigationProp<any, any>;
}): JSX.Element {
  const toggleTheme = useTheme(state => state.toggleTheme);

  return (
    <>
      <View className="mt-10 flex flex-row justify-evenly">
        <Button
          title="Todo"
          onPress={() => {
            navigation.navigate('Todo');
          }}
        />
        <Button
          title="User"
          onPress={() => {
            navigation.navigate('User');
          }}
        />
        <Button
          title="Toggle Theme"
          onPress={() => {
            toggleTheme();
          }}
        />
      </View>
    </>
  );
}

// className="h-full flex flex-row justify-evenly items-center ">
