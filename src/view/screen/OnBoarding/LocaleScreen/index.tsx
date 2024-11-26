import React from 'react';
import { localeScreenStyle } from './styles';
import { images } from 'assets/images';
import Checkbox from 'widget/Native/Checkbox';
import useStatusBar from 'hooks/useStatusBar';
import { BlurView } from '@react-native-community/blur';
import useLocaleCtr from './useLocalCtr';
import Button from 'widget/Native/Button';
import ImageBackground from 'widget/Native/ImageBackground';
import { Image, Text, View } from 'widget/Native';


const LocaleScreen = () => {
  useStatusBar('light-content');
  const { lang, loading, textWithLocale, setLangFr, setLangIt, onValidate } = useLocaleCtr();

  return (
    <ImageBackground
      ImageProps={{
        source: images.Bg,
        style: localeScreenStyle.image,
        resizeMode: 'cover'
      }}
      flex
    >
      <View flex end iCenter>
        <Image
          source={images.LogoText}
          resizeMode='contain'
          width={200}
          height={200}
          marginB={20}
        />
        <View width={1} height={90} color='white' />
      </View>
      <View flex center overflow='hidden' borderT={20}>
        <BlurView
          blurType="dark"
          blurAmount={1}
          style={localeScreenStyle.blurBg}
        />
        <View flex sCenter absolute={1} bottom={'90%'} color='white' width={1} height={150} />
        <View paddingH={25}>
          <Text bold size={22} color='white'>{textWithLocale.title}</Text>
          <View fullWidth marginT={15}>
            <View row center iCenter fullWidth paddingV={5}>
              <View flex>
                <Checkbox
                  text={textWithLocale.it}
                  value={lang === 'it'}
                  radio
                  onChecked={setLangIt}
                />
              </View>
              <Image source={images.flag.IT} marginR={5} width={20} height={15} />
            </View>
            <View row center iCenter fullWidth paddingV={5}>
              <View flex>
                <Checkbox
                  text={textWithLocale.fr}
                  value={lang === 'fr'}
                  radio
                  onChecked={setLangFr}
                />
              </View>
              <Image source={images.flag.FR} marginR={5} width={20} height={15} />
            </View>
          </View>
          <View marginT={30}>
            <Button
              text={textWithLocale.validate}
              onPress={onValidate}
              disabled={!lang}
              loading={loading}
              md
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LocaleScreen;
