import React from 'react';
import useAppNavigator from 'hooks/useAppNavigator';
import routeName from 'routes/routeName';
import { Image, Text, TouchableOpacity, View } from 'widget/Native';

type IProps = {
  price: string;
  summary: string;
  title: string;
  type: string;
  uri: string;
  startingAt?: string;
};

const ServiceItem = (props: IProps) => {
  const appNavigator = useAppNavigator();

  const { uri } = props;
  const onPress = async () => {
    appNavigator.navigateScreen(routeName.user.service.item, {
      type: props.type,
    })
  }

  return (
    <TouchableOpacity
      noPadding
      border={16}
      marginT={20}
      overflow='hidden'
      onPress={onPress}>
      <Image source={{ uri }} poster height={150} width={'100%'} borderT={16} />
      <View paddingV={20} paddingH={10} color='tertiary' borderB={16}>
        <View flex between row marginB={15} iCenter>
          <Text bold size={20} color='onSecondaryDark'>{props?.title}</Text>
          <View>
            {!!props?.startingAt && (
              <Text size={10} color='onSecondary'>{props.startingAt}</Text>
            )}
            <Text size={15} color='onSecondary'>{props?.price}</Text>
          </View>
        </View>
        <Text size={14} color='onSecondary'>{props?.summary}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ServiceItem;
