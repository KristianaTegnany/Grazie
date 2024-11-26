import useStatusBar from 'hooks/useStatusBar';
import React, { useState } from 'react';
import { Switch } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from 'themes/colors';
import OnlyBackBtn from 'widget/Header/OnlyBackBtn';
import LineProgress from '../widget/LineProgress';
import ProBottomModal from './ProBottomModal';
import { rootState } from 'store/reducer';
import { useSelector } from 'react-redux';
import useRegisterInfoCtr from '../useRegisterInfoCtr';
import { useRoute } from '@react-navigation/native';
import { middleFadeIn } from 'services/utils/animations';
import Button from 'widget/Native/Button';
import AuthBackground from 'widget/Container/AuthBackground';
import View from 'widget/Native/View';
import Text from 'widget/Native/Text';
import AnimatedView from 'widget/Native/AnimatedView';
import Input from 'widget/Native/Input';
import { Container, Content, FormContainer, Title } from '../widget';
import { TouchableOpacity } from 'widget/Native';

export type IActivity = { label: string; id: string };

const SignUpPro = () => {
  const { bottom, top } = useSafeAreaInsets();
  useStatusBar('light-content');
  const ctr = useRegisterInfoCtr();
  const { params } = useRoute<any>();

  const [isPro, setIsPro] = useState(false);
  const [isProModal, setIsProModal] = useState(false);
  const [activity, setActivity] = useState<IActivity>();

  const {
    translation: {
      createMyAccount,
      imProfessional,
      chooseYourActivity,
      helpUsRecommandInfoRelatedActivity,
      next
    },
    taxonomy: {
      user: {
        proActivities
      }
    }
  } = useSelector((state: rootState) => state.authReducer.authDatas);

  const updateIsPro = () => setIsPro(c => !c);
  const disableIsProModal = () => setIsProModal(true);
  const goToStep2 = () =>
    ctr?.goToStep2({ ...params, isPro, activity: activity?.id })

  return (
    <AuthBackground>
      <OnlyBackBtn noBackground />
      <Container paddingT={top}>
        <Content>
          <Title>{createMyAccount}</Title>
          <LineProgress width={50} />
          <View flex marginT={25} fullWidth>
            <FormContainer>
              <View row between iCenter>
                <Text color='white'>
                  {imProfessional}
                </Text>
                <Switch
                  value={isPro}
                  onChange={updateIsPro}
                  ios_backgroundColor={colors.onTertiary}
                  thumbColor={isPro ? colors.white : colors.onPrimary}
                  trackColor={{ false: colors.onTertiary, true: colors?.primary }}
                />
              </View>
              {isPro && (
                <View marginV={50} height={50}>
                  <AnimatedView animation={middleFadeIn} marginB={10}>
                    <Text color='white'>
                      {chooseYourActivity}
                    </Text>
                  </AnimatedView>
                  <TouchableOpacity onPress={disableIsProModal} noPadding>
                    <Input activity value={activity?.label} semiTransparent readOnly />
                  </TouchableOpacity>
                </View>
              )}
            </FormContainer>
          </View>
          <View fullWidth marginB={bottom || 20}>
            <Button
              text={next}
              onPress={goToStep2}
              disabled={isPro && !activity}
              md />
          </View>
        </Content>
      </Container>
      <ProBottomModal
        activity={activity}
        text={helpUsRecommandInfoRelatedActivity}
        datas={proActivities}
        modal={isProModal}
        btn={next}
        setModal={setIsProModal}
        setActivity={setActivity}
      />
    </AuthBackground >
  );
};

export default SignUpPro;
