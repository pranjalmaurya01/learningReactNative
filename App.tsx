import React from 'react';
import {SafeAreaView, useColorScheme, View} from 'react-native';
import Todo from './src/components/Todo';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView>
      {/* <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      /> */}
      <View
      //   style={{
      //     backgroundColor: isDarkMode ? Colors.black : Colors.white,
      // }}
      >
        <Todo />
      </View>
    </SafeAreaView>
  );
}

export default App;
