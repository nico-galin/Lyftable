import React from 'react';
import Modal from 'react-native-modal';
import { View, TouchableWithoutFeedback, ScrollView } from 'react-native';
import styles from './ModalContainer.style';
import Header from '../Header/Header';
import { useAppContext } from '../../contexts/AppContext';
import { systemStyles } from '../../assets/styles';

export default ({ isVisible, setVisibility, children, header }) => {
  const context = useAppContext();
  const closeModal = () => {
    context.resetModal();
    setVisibility(false);
  };
  return (
    <Modal
      statusBarTranslucent
      isVisible={isVisible}
      onBackdropPress={closeModal}
      onBackButtonPress={closeModal}
      swipeDirection={'down'}
      onSwipeComplete={closeModal}
      propagateSwipe={true}
      style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.dragBar} />
        {header ? <Header title={header} modal={true} /> : null}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={systemStyles.fullWidth}
          keyboardShouldPersistTaps="always"
          onScroll={e => e.stopPropagation()}>
          <TouchableWithoutFeedback>
            <View>{children}</View>
          </TouchableWithoutFeedback>
          <View style={systemStyles.formSpacer} />
        </ScrollView>
      </View>
    </Modal>
  );
};
