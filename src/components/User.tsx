import {Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import request from '../utils/request';
import {Linking} from 'react-native';
import {useTheme} from '@react-navigation/native';

const url = 'https://jsonplaceholder.typicode.com/users';

interface UserI {
  users: any;
}

function handlePress() {
  Linking.canOpenURL(url).then(() => {
    return Linking.openURL(url);
  });
}

export default function User() {
  const [state, setState] = useState<UserI>({users: null});
  const {colors} = useTheme();

  useEffect(() => {
    (async () => {
      const {status, data, HttpStatusCode} = await request('GET', 'users');
      if (status === HttpStatusCode.OK) {
        setState(prev => ({...prev, users: data}));
      }
    })();
  }, []);

  return (
    <View className="mx-2">
      <Text
        style={{color: colors.text}}
        className="text-2xl font-medium text-center py-4 underline text-blue-200 hover:text-blue-800 visited:text-purple-600"
        onPress={handlePress}>
        User List from JSON Placeholder
      </Text>
      {state.users ? (
        state.users.map((e: any) => (
          <Text key={e.id} style={{color: colors.text}}>
            {e.id}) {e.name} ({e.username})
          </Text>
        ))
      ) : (
        <Text>Loading</Text>
      )}
    </View>
  );
}
