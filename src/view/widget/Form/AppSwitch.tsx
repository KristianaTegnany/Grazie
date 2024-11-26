import React, { useState } from 'react';
import { Switch } from 'react-native';
import {
  Text,
  View
} from 'widget/Native';
import colors from 'themes/colors';

type IProps = {
  title: string;
  value: boolean;
  onChange: Function;
  id?: string;
};

const AppSwitch = (props: IProps) => {
  const [defaultValue, setDefaultValue] = useState<boolean>(
    props?.value || false,
  );

  const onChange = (value: boolean) => {
    setDefaultValue(value);
    props?.onChange(value, props?.id || null);
  };

  return (
    <View row between paddingV={10} borderBW={1} borderC='onTertiary'>
      <Text flex size={13} light color='onSecondary'>{props?.title}</Text>
      <Switch
        value={defaultValue}
        onValueChange={value => onChange(value)}
        ios_backgroundColor={colors.onTertiary}
        thumbColor={colors.white}
        style={{ transform: [{ scaleX: .7 }, { scaleY: .7 }] }}
        trackColor={{ false: colors.onTertiary, true: colors?.primary }}
      />
    </View>
  );
};

export default AppSwitch;