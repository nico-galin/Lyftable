import React, { useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
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
import changeNavigationBarColor from 'react-native-navigation-bar-color';

export const Signup = () => {
  changeNavigationBarColor(theme.SECONDARY_COLOR);
  const [eLoading, setELoading] = useState(false);
  const [gLoading, setGLoading] = useState(false);
  const [aLoading, setALoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');
  const auth = useAuth();
  const navigation = useNavigation();

  const signInWithEmail = async () => {
    if (
      String(password).trim() !== '' &&
      String(email).trim() !== '' &&
      String(firstName).trim() !== '' &&
      String(lastName).trim() !== ''
    ) {
      try {
        setELoading(true);
        await auth.signInWithEmail(email, password);
      } catch (e) {
        setELoading(false);
      }
    } else {
      // Mark field invalid
    }
  };

  const signInWithGoogle = async () => {
    try {
      setGLoading(true);
      await auth.signInWithGoogle();
    } catch (e) {
      setGLoading(false);
    }
  };

  const signInWithApple = async () => {
    try {
      setALoading(true);
      await auth.signInWithApple();
    } catch (e) {
      setALoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[theme.SECONDARY_COLOR_LIGHT, theme.SECONDARY_COLOR]}
      style={systemStyles.systemPageContainer}>
      <View style={loaderStyles.form}>
        <Text style={loaderStyles.header}>Sign Up</Text>
        <View style={systemStyles.formSpacer} />
        <View style={systemStyles.formSpacer} />
        <View style={systemStyles.formSpacer} />
        <View>
          <Text style={loaderStyles.subtext}>
            Sign up with one of the following options
          </Text>
          <View style={systemStyles.formSpacer} />
          <View style={systemStyles.row}>
            <ActionButton
              color={theme.BACKGROUND_COLOR}
              moreBR
              elevated
              icon={
                aLoading ? (
                  <ActivityIndicator
                    color={theme.SECONDARY_COLOR}
                    animating={true}
                    size="small"
                  />
                ) : (
                  <IonIcon
                    name={'ios-logo-apple'}
                    size={25}
                    color={theme.PRIMARY_COLOR}
                  />
                )
              }
            />
            <View style={systemStyles.buttonSpacer} />
            <ActionButton
              color={theme.BACKGROUND_COLOR}
              onPress={signInWithGoogle}
              moreBR
              elevated
              icon={
                gLoading ? (
                  <ActivityIndicator
                    color={theme.SECONDARY_COLOR}
                    animating={true}
                    size="small"
                  />
                ) : (
                  <IonIcon
                    name={'ios-logo-google'}
                    size={20}
                    color={theme.PRIMARY_COLOR}
                  />
                )
              }
            />
          </View>
          <View style={systemStyles.formSpacer} />
          <TextInput
            style={loaderStyles.input}
            placeholder={'First Name'}
            autoCompleteType="name"
            onChange={val => setFirstName(val)}
          />
          <TextInput
            style={loaderStyles.input}
            placeholder={'Last Name'}
            autoCompleteType="name"
            onChange={val => setLastName(val)}
          />
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
              text={eLoading ? null : 'Create Account'}
              icon={
                eLoading ? (
                  <ActivityIndicator
                    color={theme.SECONDARY_COLOR}
                    animating={true}
                    size="small"
                  />
                ) : null
              }
              height={'large'}
              onPress={signInWithEmail}
              moreBR
              elevated
              color={theme.BACKGROUND_COLOR}
              textColor={theme.SECONDARY_COLOR}
            />
          </View>
          <View style={systemStyles.formSpacer} />
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={loaderStyles.subtext}>
              Already have an account?{' '}
              <Text style={loaderStyles.subTextBtn}>Log In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};
