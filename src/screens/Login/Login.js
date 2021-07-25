import React, {useState} from 'react';
import {ActivityIndicator, Button, Text, TextInput, View} from 'react-native';

import styles from './Login.style';
import {useAuth} from '../../contexts/AuthContext';

export const Login = () => {
  const [loading, isLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const auth = useAuth();

  const signInWithEmail = async () => {
    if (/^$|\s+/.test(password)) {
      try {
        isLoading(true);
        await auth.signInWithEmail(email, password);
      } catch (e) {
        isLoading(false);
      }
    } else {
      // Mark field invalid
    }
  };

  const signInWithGoogle = async () => {
    try {
      isLoading(true);
      await auth.signInWithGoogle();
    } catch (e) {
      isLoading(false);
    }
  };

  const signInWithApple = async () => {
    try {
      isLoading(true);
      await auth.signInWithApple();
    } catch (e) {
      isLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Sign In Screen</Text>
      {loading ? (
        <ActivityIndicator color={'#000'} animating={true} size="small" />
      ) : (
        <View>
          <TextInput placeholder="email" autoCompleteType="email" onChange={val => setEmail(val)}></TextInput>
          <TextInput placeholder="password" autoCompleteType="password" secureTextEntry={true} onChange={val => setPassWord(val)}></TextInput>
          <Button title="Sign In" onPress={signInWithEmail} />
          <Button title="Sign In w/ Google" onPress={signInWithGoogle} />
        </View>
      )}
    </View>
  );
};