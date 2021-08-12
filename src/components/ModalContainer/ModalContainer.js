import React from 'react';
import Modal from 'react-native-modal';
import { View, TouchableWithoutFeedback, ScrollView, StatusBar } from 'react-native';
import styles from './ModalContainer.style'
import Header from '../Header/Header';
import { useAppContext } from '../../contexts/AppContext';

export default ({isVisible, setVisibility, children, header}) => {
  const context = useAppContext();
  const closeModal = () => {
    setVisibility(false);
    context.resetModal();
  }
  return (
    <Modal
      statusBarTranslucent
      isVisible={isVisible}
      onBackdropPress={closeModal}
      onBackButtonPress={closeModal}
      swipeDirection={'down'}
      onSwipeComplete={closeModal}
      propagateSwipe={true}
      style={styles.container}
      >
      <View style={styles.contentContainer} >
        <View style={styles.dragBar}/>
        <Header title={header} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{width: '100%'}}
          keyboardShouldPersistTaps='always'
          onScroll={e => e.stopPropagation()}
        >
          <TouchableWithoutFeedback>
            <View>{children}</View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </View>
    </Modal>
  )
}