import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Pressable, Alert } from 'react-native';

import { View, Text, TextInput } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useUserContext } from '@/contexts/userContext';
import * as api from '@/utils/api';

export default function Login() {
  const [textInputValue, setTextInputValue] = useState('');
  const { setCurrentUser } = useUserContext();

  // Allow only numbers and letters, and between 3-15 characters
  const isValidInput = (input: string) => {
    return /^[a-zA-Z0-9]{3,15}$/.test(input);
  };

  const onSubmit = async () => {
    if (!isValidInput(textInputValue)) {
      Alert.alert(
        'Invalid Input',
        'Please enter a valid username (3-15 characters, letters, and numbers only)'
      );
      return;
    }

    try {
      const response = await api.login(textInputValue);
      const { name, points, id } = response.data;
      setCurrentUser({
        name,
        points,
        id,
      });
      router.replace(`/user/${id}/redeem`);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Enter a username to get started</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={textInputValue}
          onChangeText={setTextInputValue}
          placeholder="Enter username"
        />
        <Pressable onPress={onSubmit} style={styles.button}>
          <Text>Submit</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#00b2ca',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.tint,
    borderRadius: 5,
    padding: 10,
    margin: 5,
    width: '80%',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});
