import React, { ReactNode } from 'react';
import { View } from 'widget/Native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Modal from '.';
import { Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get("window");

type IProps = {
  modal: boolean;
  notFullWidth?: boolean;
  noPaddingTop?: boolean;
  children: ReactNode;
};

const FullModal = ({ children, modal, notFullWidth, noPaddingTop }: IProps) => {
  const { top } = useSafeAreaInsets();

  return (
    <Modal
      isVisible={modal}
      animationType={notFullWidth ? "slideInLeft" : "slideInUp"} transparent={notFullWidth} fullscreen>
      <View flex iEnd={notFullWidth}>
        <View flex borderTL={notFullWidth ? 30 : 0} borderBL={notFullWidth ? 30 : 0} paddingT={noPaddingTop ? 0 : top} color='white' width={notFullWidth ? (screenWidth < 600 ? '80%' : '50%') : undefined} minWidth={notFullWidth ? 250 : undefined}>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default FullModal;
