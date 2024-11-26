import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { rootState } from 'store/reducer';
import BottomModal from 'widget/Modal/PositionnedModal';
import { Text, TouchableOpacity, View } from 'widget/Native';

type IProps = {
  modal: boolean;
  setModal: (data: boolean) => void;
  onGalerie: Function;
  onCamera: Function;
};

const BottomProfilModalEdit = (props: IProps) => {
  const { bottom } = useSafeAreaInsets()

  const {
    translation: {
      changeProfilePicture,
      fromGallery,
      takeAPicture,
    }
  } = useSelector((state: rootState) => state?.userReducer?.persoInfosDatas);

  return (
    <BottomModal wrapContent modal={props?.modal} setModal={props?.setModal}>
      <View padding={15} paddingB={bottom + 40}>
        <Text marginB={25} color='onSecondary'>{changeProfilePicture}</Text>
        <TouchableOpacity onPress={props?.onGalerie as any}>
          <Text medium color='onSecondaryDark'>{fromGallery}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={props?.onCamera as any}
          marginT={10}>
          <Text medium color='onSecondaryDark'>{takeAPicture}</Text>
        </TouchableOpacity>
      </View>
    </BottomModal>
  );
};

export default BottomProfilModalEdit;
