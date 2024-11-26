import React from 'react';
import { images } from 'assets/images';
import ImageBackground from 'widget/Native/ImageBackground';
import View from 'widget/Native/View';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useSplash from './useSplash';
import Image from 'widget/Native/Image';
import TextHtml from 'widget/Native/TextHtml';
import AnimatedView from 'widget/Native/AnimatedView';
import { useSelector } from 'react-redux';
import { rootState } from 'store/reducer';
import { Button } from 'widget/Native';
import LinearGradient from 'react-native-linear-gradient';

const SplashScreen = () => {
  const { goToNextScreen } = useSplash();

  const {
    config: {
      loading
    },
    translation: {
      continue: btnNext
    }
  } = useSelector((state: rootState) => state.authReducer.noAuthDatas);

  return (
    <ImageBackground
      style={{ flex: 1 }}
      ImageProps={{
        source: images.Bg,
        resizeMode: 'cover'
      }}
    >
      {
        loading && (
          <AnimatedView animation={'fadeIn'} iCenter flex fullWidth>
            <View flex={2} paddingV={60} iCenter center paddingH={20} fullWidth>
              <TextHtml size={30} center rosha color='white'>{loading.introHtml}</TextHtml>
            </View>
            <View flex={2} row>
              <View absolute={10} width={1} height={150} bottom={'90%'} left={'50%'} color='white' />
              <Image
                source={{ uri: loading.mediaList[0]?.urlLq }}
                flex
                borderT={100}
              />
              <Image
                source={{ uri: loading.mediaList[1]?.urlLq }}
                flex
                borderT={100}
              />
              <Image
                source={{ uri: loading.mediaList[2]?.urlLq }}
                flex
                borderT={100}
              />
            </View>
            <View absolute bottom={0} left={0} right={0}>
              <LinearGradient colors={[
                'rgba(0,0,0,0)',
                'rgba(0,0,0,0.3)',
                'rgba(0,0,0,1)',
              ]} locations={[0, 0.3, 1]}>
                <Button marginH={20} marginB={40} marginT={40} onPress={goToNextScreen} text={btnNext} />
              </LinearGradient>
            </View>
          </AnimatedView>
        )
      }
    </ImageBackground >
  );
};

export default SplashScreen;
