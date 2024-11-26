import React, { ReactElement, ReactNode } from 'react';
import { TouchableOpacity, View } from 'widget/Native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'themes/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import normalize from 'services/utils/normalize';
import Modal from '.';

type IProps = {
  center?: boolean;
  modal: boolean;
  setModal: (value: boolean) => void;
  children: ReactNode;
  headerItem?: ReactElement;
  height?: number;
  wrapContent?: boolean;
  background?: string;
  nonDismissible?: boolean;
  noHeader?: boolean;
};

const BottomModal = ({ background, center, children, headerItem, height, modal, nonDismissible, noHeader, wrapContent, setModal }: IProps) => {

  const { top } = useSafeAreaInsets();
  const onPress = () => setModal(false);

  return (<Modal animationType={center ? 'fadeIn' : 'slideInUp'} isVisible={modal} center={center} nonDismissible={nonDismissible} callback={onPress}>
    <View paddingT={center ? undefined : top}>
      <View borderT={center ? undefined : 13} border={center ? 13 : undefined} color='white' overflow='hidden'
        style={[
          {
            height: wrapContent ? undefined : (normalize(height || 0) || '100%'),
            backgroundColor: background || colors.white
          },
        ]}>
        {!noHeader && <View center iCenter paddingT={center ? undefined : 20} marginB={center ? 0 : 10}>
          {!center && <View width={'20%'} height={5} border={5} color='tertiary' />}
          {center && <View rowR iCenter paddingH={center ? 10 : 20} paddingT={15} fullWidth borderBW={headerItem ? 1 : 0} borderC='quartenary'>
            <TouchableOpacity
              onPress={onPress}>
              <MaterialCommunityIcons
                name={'close'}
                color={colors.onSecondaryDark}
                size={normalize(25)}
              />
            </TouchableOpacity>
            {headerItem}
          </View>}
        </View>}
        {children}
      </View>
    </View>
  </Modal>);
};

export default BottomModal;
