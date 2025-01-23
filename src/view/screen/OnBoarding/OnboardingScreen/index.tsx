import React, { useRef } from 'react';
import useOnboardingCtr from './onboardingCtr';
import useStatusBar from 'hooks/useStatusBar';
import View from 'widget/Native/View';
import Text from 'widget/Native/Text';
import TextHtml from 'widget/Native/TextHtml';
import { Dimensions, StatusBar } from 'react-native';
import Carousel from 'widget/Carousel/SnapCarousel/carousel/Carousel';

import onboardingScreenStyle from './styles';
import DotProgress from 'widget/Carousel/DotProgress';
import Button from 'widget/Native/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Image from 'widget/Native/Image';
import { images } from 'assets/images';
import { ImageBackground } from 'widget/Native';

const { width } = Dimensions.get('window');

const OnboardingScreen = () => {
  useStatusBar('dark-content');
  const { top: paddingTop, bottom } = useSafeAreaInsets();

  let _carousel = useRef<Carousel>(null);

  const {
    datas,
    buttons,
    lastStep,
    step,
    setStep,
    goToWelcome
  } = useOnboardingCtr();

  const _renderItem = ({
    item, index }: {
      item: any, index: number
    }) => (
    <ImageBackground paddingV={10} paddingH={40} ImageProps={index === 1 ? { source: images.auth.OnboardingBg } : undefined} flex color={index === 0 ? 'brown' : undefined} paddingT={paddingTop}>

      {index !== 1 && <View flex center iCenter>
        <Image
          source={images.LogoTransparent}
          native
          width={100}
          height={120}
          resizeMode='contain'
          tintColor={index === 0 ? 'white' : 'black'}
        />
      </View>}
      <View flex>
        <Text center rosha size={22} marginT={index == 1 ? 40 : undefined} marginB={20} color={index === 0 ? 'white' : undefined}>{item?.title}</Text>
        {!!item?.description && <TextHtml center color={index === 0 ? 'white' : undefined}>{item.description}</TextHtml>}
      </View>
    </ImageBackground>
  );

  const goToNext = () => {
    _carousel.current?.snapToNext();
  }

  return datas.length > 0? (
    <View
      style={onboardingScreenStyle.container}
    >
      <StatusBar barStyle={step === 0 ? 'light-content' : 'dark-content'} backgroundColor={'rgba(0,0,0,0)'} translucent />
      <Carousel
        ref={_carousel}
        vertical={false}
        data={datas}
        renderItem={_renderItem}
        itemWidth={width}
        sliderWidth={width}
        activeSlideOffset={10}
        onSnapToItem={(index: number) => setStep(index)}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        lockScrollWhileSnapping={true}
        enableMomentum={false}
        decelerationRate={0.25}
      />
      <View fullWidth absolute bottom={bottom || 20} left={0} right={0} paddingH={20}>
        <View center iCenter marginT={10} marginB={20}>
          <DotProgress active={step} count={lastStep} />
        </View>
        <Button
          text={buttons.next}
          onPress={lastStep === step + 1 ? goToWelcome : goToNext}
        />
      </View>
    </View>
  ) : null
};

export default OnboardingScreen;
