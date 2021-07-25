import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './AddFriends.style'
import { systemStyles } from '../../assets/styles';
import Header from '../../components/Header/Header';
import InputWrapper from '../../components/InputWrapper/InputWrapper';
import ModalContainer from '../../components/ModalContainer/ModalContainer';
import SearchBar from '../../components/SearchBar/SearchBar';
import theme from '../../assets/theme.style';
import ActionButton from '../../components/ActionButton/ActionButton';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MatIcon from 'react-native-vector-icons/MaterialIcons';

export const AddFriends = ({isVisible, setVisibility}) => {
  const [friendCodeText, setFriendCodeText] = useState("");
  const [userSearchText, setUserSearchText] = useState("");
  const handleSubmitFriendCode = () => {

  }
  const handleSubmitUserSearch = () => {

  }
  const suggestedUsers = [{
    id: "12131231231232131231",
    name: "John Doe",
    profile_photo: "https://picsum.photos/300"
  }, {
    id: "12131231231232131231",
    name: "Jane Doe",
    profile_photo: "https://picsum.photos/300"
  }];

  const userCard = (user) => (
    <View style={styles.userCardContainer}>
      <View style={styles.userInfo}>
        <Image style={styles.profilePhoto} source={{uri: user.profile_photo}} />
        <Text style={styles.userName}>{user.name}</Text>
      </View>
      <TouchableOpacity style={styles.addFriendButton}>
        <MatIcon name={'person-add-alt-1'} size={25} color={theme.BACKGROUND_COLOR}/>
      </TouchableOpacity>
    </View>
  );

  return (
    <ModalContainer isVisible={isVisible} setVisibility={setVisibility} header={"Add Friends"}>
        <InputWrapper label={'Friend Code'}>
          <SearchBar value={friendCodeText} placeholder={'Enter Friend Code...'} onChangeText={setFriendCodeText} onBlur={() => setFriendCodeText("")} onButtonPress={handleSubmitFriendCode} buttonContent={'Go'} buttonColor={theme.SPECIAL_FOREGROUND_COLOR_DARK}/>
          <ActionButton text={'Scan Friend QR Code'} color={theme.SECONDARY_COLOR} icon={
            <AntIcon name={'qrcode'} size={25} color={theme.BACKGROUND_COLOR}/>
          }/>
        </InputWrapper>
        <InputWrapper label={'Search Users'}>
          <SearchBar value={userSearchText} placeholder={'Search Users...'} onChangeText={setUserSearchText} onBlur={() => setUserSearchText("")} onButtonPress={handleSubmitUserSearch} buttonContent={'Go'} buttonColor={theme.SPECIAL_FOREGROUND_COLOR_DARK}/>
          {suggestedUsers.map((user, ind) => (
            <View key={ind}>
              {userCard(user)}
              {ind != suggestedUsers.length - 1 && <View style={styles.border}/>}
            </View>
          ))}
        </InputWrapper>
    </ModalContainer>
  )
}