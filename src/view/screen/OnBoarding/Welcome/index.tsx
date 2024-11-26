import React from 'react';
import Button from 'widget/Native/Button';
import useStatusBar from 'hooks/useStatusBar';
import AuthBackground from 'widget/Container/AuthBackground';
import OnlyBackBtn from 'widget/Header/OnlyBackBtn';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import View from 'widget/Native/View';
import TextHtml from 'widget/Native/TextHtml';
import ScrollView from 'widget/Native/ScrollView';
import Text from 'widget/Native/Text';
import useWelcome from './useWelcome';
import { useSelector } from 'react-redux';
import { rootState } from 'store/reducer';
import { TouchableOpacity } from 'widget/Native';

const Welcome = () => {
  const { top, bottom } = useSafeAreaInsets();
  useStatusBar('light-content');
  const { goToCgv, goToRegisterOrSignin, goToPrivacy } = useWelcome();

  const {
    config: {
      gdpr: {
        title,
        textHtml
      },
    },
    translation: {
      cookiesAccept,
      privacyPolicy,
      //cookiesManage,
      termsConditionsAbbr
    }
  } = useSelector((state: rootState) => state.authReducer.noAuthDatas);

  return (
    <AuthBackground>
      {
        title && <View borderT={30} color='secondary' padding={20} flex marginT={top + 40} paddingB={bottom || 20}>
          <View color='tertiary' height={5} border={5} width={50} marginB={10} sCenter />
          <ScrollView marginB={20}>
            <View marginB={20}>
              <Text rosha size={34} marginV={20}>{title}</Text>
              <TextHtml>{textHtml}</TextHtml>
            </View>
          </ScrollView>
          <Button
            text={cookiesAccept}
            onPress={goToRegisterOrSignin}
            md
          />
          <TouchableOpacity marginT={10} onPress={goToPrivacy}><Text color='black' bold size={15} underlined center>{privacyPolicy}</Text></TouchableOpacity>
          {/*<Text color='black' bold size={15} underlined center marginT={10}>{cookiesManage}</Text>*/}
          <TouchableOpacity onPress={goToCgv}><Text color='black' bold size={15} underlined center>{termsConditionsAbbr}</Text></TouchableOpacity>
        </View>
      }
    </AuthBackground >
  );
};

export default Welcome;
