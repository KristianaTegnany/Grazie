import React from 'react';
import { TouchableOpacity, View } from 'widget/Native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from 'themes/colors';
import useAppNavigator from 'hooks/useAppNavigator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import normalize from 'services/utils/normalize';
import useBackBtnCtr from './backBtnCtr';

type IProps = {
  absolute?: boolean;
  noBackground?: boolean;
  color?: string;
  goBack?: () => void;
};

const OnlyBackBtn = (props: IProps) => {
  const { top } = useSafeAreaInsets();

  const { canGoBack, goBack } = useBackBtnCtr();

  return (
    <View absolute={20} left={20} paddingT={top}>
      <TouchableOpacity onPress={canGoBack ? goBack : props.goBack} width={40}>
        {props?.noBackground ? (
          <AntDesign
            name={'arrowleft'}
            color={props?.color || 'white'}
            size={normalize(25)}
          />
        ) : (
          <AntDesign
            name="leftcircle"
            size={normalize(25)}
            color={colors.primaryDark}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default OnlyBackBtn;
