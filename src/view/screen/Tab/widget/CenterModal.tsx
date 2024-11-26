import React, { ReactNode } from 'react';
import { Image, ImageBackground, ScrollView, Text, TextHtml, TouchableOpacity, View } from 'widget/Native';
import Icon from 'react-native-vector-icons/Feather';
import normalize from 'services/utils/normalize';
import { Source } from 'react-native-fast-image';
import { images } from 'assets/images';
import Modal from 'widget/Modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type IProps = {
  header?: ReactNode;
  bottom?: ReactNode;
  blur?: boolean;
  description?: string;
  headerBG?: Source;
  modal: boolean;
  notDismissibled?: boolean;
  poster?: boolean;
  title?: string;
  titleMarginT?: number;
  type?: 'fato' | 'green' | 'delete';

  closeModal?: () => void;
};

const CenterModal = ({ bottom, blur, description, header, headerBG, modal, notDismissibled = false, poster, title, titleMarginT, type, closeModal }: IProps) => {
  const isFato = type === 'fato',
    isDelete = type === 'delete'
  const { bottom: marginB, top } = useSafeAreaInsets()

  return (
    <Modal
      isVisible={modal} center callback={closeModal} blurAmount={blur ? 5 : 1} /*transparent={blur}*/
    >
      <ScrollView center border={13} color='white' marginT={top} marginB={marginB || 20}>
        {
          headerBG &&
          <ImageBackground blur={!!header} ImageProps={{
            source: headerBG,
          }} width={'100%'} center height={!header ? 187 : 136} borderT={13} poster={poster}>
            {header}
          </ImageBackground>
        }
        {
          !headerBG && type &&
          <View marginT={50} iCenter center>
            <Image source={isFato ? images.tab.mag.Fato : (isDelete ? images.tab.favorite.FavoriteDelete : images.tab.mag.Green)} height={isDelete ? 73 : 45} width={isDelete ? 73 : 45} resizeMode='cover' marginB={10} />
            {!isDelete && <Text size={25} bold color={isFato ? 'primaryDark' : 'green'}>{isFato ? 'FATTO A MANO' : 'GIGI GREEN'}</Text>}
          </View>
        }
        {!notDismissibled && <TouchableOpacity onPress={closeModal} style={{ backgroundColor: headerBG ? 'rgba(0,0,0, 0.1)' : undefined, borderRadius: normalize(20), position: 'absolute', zIndex: 1, top: normalize(20), right: normalize(20) }}>
          <Icon
            name={'x'}
            color={headerBG ? 'white' : 'black'}
            size={normalize(25)}
          />
        </TouchableOpacity>}
        <View padding={20} iCenter marginT={titleMarginT !== undefined ? titleMarginT : (isDelete ? 0 : ((type || !!header) ? 20 : 35))}>
          {!header && <>
            <Text size={20} center rosha marginB={20}>{title}</Text>
            {!!description && <TextHtml center size={headerBG ? 17 : 12} color='onSecondary'>{description}</TextHtml>}
          </>}
          <View fullWidth>{bottom}</View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default CenterModal;
