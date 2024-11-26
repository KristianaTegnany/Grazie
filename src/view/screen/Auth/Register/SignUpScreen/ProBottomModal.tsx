import React, { useState } from 'react';
import { CheckBox, ScrollView, Text, View } from 'widget/Native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from 'themes/colors';
import defaultStyle from 'themes/defaultStyle';
import BottomModal from 'widget/Modal/PositionnedModal';
import { IActivity } from './SignUpPro';
import Button from 'widget/Native/Button';
import { ILabelItem } from 'store/slice/auth/type';

type IProps = {
  activity: IActivity | undefined;
  datas: ILabelItem[];
  modal: boolean;
  text: string;
  btn: string;
  setActivity: (activity: IActivity) => void;
  setModal: (data: boolean) => void;
};

const ProBottomModal = (props: IProps) => {
  const { bottom } = useSafeAreaInsets();
  const [value, setValue] = useState<IActivity | undefined>(props.activity);

  const onBtnClicked = () => {
    props?.setModal(false);
    if (value) {
      props.setActivity(value);
    }
  }

  return (
    <BottomModal modal={props?.modal} setModal={props?.setModal} background={colors.white}>
      <View style={defaultStyle.flex}>
        <ScrollView padding={20}>
          <Text color='onSecondary'>{props.text}</Text>
          <View paddingT={20}>
            {props.datas.map(item => (
              <CheckBox
                key={item.id}
                text={item.label}
                radio
                dark
                value={value ? item.label === value.label : false}
                onChecked={() => {
                  setValue({
                    label: item.label,
                    id: item.id,
                  });
                }}
              />
            ))}
          </View>
        </ScrollView>
        <View paddingH={20} marginB={bottom || 20}>
          <Button
            text={props.btn}
            onPress={onBtnClicked}
            md
          />
        </View>
      </View>
    </BottomModal>
  );
};

export default ProBottomModal;