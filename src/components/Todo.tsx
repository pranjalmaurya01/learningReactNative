import React, {useEffect, useState} from 'react';
import {Button, FlatList, Text, TextInput, View} from 'react-native';
import 'react-native-get-random-values';
import {v4} from 'uuid';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppState} from '@react-native-community/hooks';
import {useTheme} from '@react-navigation/native';

interface EachTodoI {
  text: string;
  isCancelled: boolean;
  addedOn: string;
  id: string;
}

interface TodoI {
  text: string;
  todoList: EachTodoI[];
}

const createTodo = (text: string): EachTodoI => ({
  text,
  isCancelled: false,
  id: v4(),
  addedOn: new Date().toLocaleString(),
});

function Todo() {
  const [state, setState] = useState<TodoI>({text: '', todoList: []});
  const currentAppState = useAppState();
  const {colors} = useTheme();

  useEffect(() => {
    if (currentAppState !== 'active') {
      saveDataToAsyncStorage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAppState]);

  useEffect(() => {
    (async () => {
      try {
        const jsonValue = (await AsyncStorage.getItem(
          '@storage_Key',
        )) as unknown as undefined | string | null;
        if (jsonValue) {
          const storedData = JSON.parse(jsonValue) as EachTodoI[];
          setState(prev => ({...prev, todoList: storedData}));
        }
      } catch (e) {
        console.log(e);
        // error reading value
      }
    })();
  }, []);

  const saveDataToAsyncStorage = () => {
    try {
      const jsonValue = JSON.stringify(state.todoList);
      AsyncStorage.setItem('@storage_Key', jsonValue);
    } catch (e) {
      console.log(e);
      // saving error
    }
  };

  const onAdd = () => {
    setState(prev => ({
      ...prev,
      text: '',
      todoList: [createTodo(prev.text), ...prev.todoList],
    }));
  };

  const onCancel = (id: string) => {
    const cancelByID = (todoList: EachTodoI[]) => {
      todoList.forEach(e => {
        if (e.id === id) {
          e.isCancelled = !e.isCancelled;
        }
      });
      return todoList;
    };

    setState(prev => ({
      ...prev,
      todoList: cancelByID(prev.todoList),
    }));
  };

  const onDelete = (id: string) => {
    setState(prev => ({
      ...prev,
      todoList: prev.todoList.filter(e => e.id !== id),
    }));
  };

  return (
    <View className="mx-2">
      <Text
        style={{color: colors.text}}
        className="text-center font-bold text-4xl py-4">
        Todo App
      </Text>
      <TextInput
        style={{color: colors.text}}
        placeholderTextColor={colors.text}
        className="p-4 text-sm border-gray-600 border rounded-md mb-2"
        placeholder="Enter Todo To Save ..."
        onChangeText={e => {
          setState(prev => ({...prev, text: e}));
        }}
        value={state.text}
      />
      <Button title="Add" onPress={onAdd} disabled={state.text.length === 0} />
      {/* <Text>{JSON.stringify(state.todoList)}</Text> */}
      {state.todoList.length === 0 ? (
        <View className="flex flex-row justify-center items-center h-[40%]">
          <Text className="text-red-500 font-black text-xl">
            Please Add A Todo
          </Text>
        </View>
      ) : (
        <FlatList
          className="m-5"
          initialNumToRender={4}
          renderItem={({item, index}) => (
            <View className="flex flex-row justify-between">
              <Text
                style={{color: colors.text}}
                className={`text-lg my-1 ${item.isCancelled && 'line-through'}`}
                onPress={() => {
                  onCancel(item.id);
                }}>
                {index + 1}. <Text className="font-black">{item.text}</Text>
              </Text>
              <MaterialCommunityIcons.Button
                onPress={() => {
                  onDelete(item.id);
                }}
                backgroundColor="transparent"
                name="delete"
                size={20}
                color="#AA0000"
              />
            </View>
          )}
          data={state.todoList}
        />
      )}
    </View>
  );
}

export default Todo;
