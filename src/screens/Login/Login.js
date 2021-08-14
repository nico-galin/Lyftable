import React, { useState } from 'react';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useAuth } from '../../contexts/AuthContext';
import theme from '../../assets/theme.style';
import { systemStyles, loaderStyles } from '../../assets/styles';
import ActionButton from '../../components/ActionButton/ActionButton';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export const Login = () => {
  const [loading, isLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');
  const auth = useAuth();
  const navigation = useNavigation();

  const signInWithEmail = async () => {
    if (password.trim() != '' && email.trim() != '') {
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
    <LinearGradient
      colors={[theme.SECONDARY_COLOR_LIGHT, theme.SECONDARY_COLOR]}
      style={systemStyles.systemPageContainer}>
      <View style={loaderStyles.form}>
        <Text style={loaderStyles.header}>Log In</Text>
        <View style={systemStyles.formSpacer} />
        <View style={systemStyles.formSpacer} />
        <View style={systemStyles.formSpacer} />
        <View>
          <Text style={loaderStyles.subtext}>
            Log in with one of the following options
          </Text>
          <View style={systemStyles.formSpacer} />
          <View style={systemStyles.row}>
            <ActionButton
              color={theme.BACKGROUND_COLOR}
              moreBR
              elevated
              icon={
                <IonIcon
                  name={'ios-logo-apple'}
                  size={25}
                  color={theme.PRIMARY_COLOR}
                  style={{ padding: 0, margin: 0 }}
                />
              }
            />
            <View style={systemStyles.buttonSpacer} />
            <ActionButton
              color={theme.BACKGROUND_COLOR}
              onPress={signInWithGoogle}
              moreBR
              elevated
              icon={
                <IonIcon
                  name={'ios-logo-google'}
                  size={20}
                  color={theme.PRIMARY_COLOR}
                />
              }
            />
          </View>
          <View style={systemStyles.formSpacer} />
          <TextInput
            style={loaderStyles.input}
            placeholder={'Email'}
            autoCompleteType="email"
            onChange={val => setEmail(val)}
          />
          <TextInput
            style={loaderStyles.input}
            placeholder={'Password'}
            autoCompleteType="password"
            secureTextEntry={true}
            onChange={val => setPassWord(val)}
          />
          <View style={systemStyles.row}>
            <ActionButton
              text={'Log In'}
              height={'large'}
              onPress={signInWithEmail}
              moreBR
              elevated
              color={theme.BACKGROUND_COLOR}
              textColor={theme.SECONDARY_COLOR}
            />
          </View>
          <View style={systemStyles.formSpacer} />
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={loaderStyles.subtext}>
              Don't have an account?{' '}
              <Text style={loaderStyles.subTextBtn}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
        {loading ? (
          <ActivityIndicator color={'#000'} animating={true} size="small" />
        ) : null}
      </View>
    </LinearGradient>
  );
};
