import useRegisterInfoCtr from '../useRegisterInfoCtr';
import useStatusBar from 'hooks/useStatusBar';
import React from 'react';
import { AnimatedView, CheckBox, ScrollView, View } from 'widget/Native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { rootState } from 'store/reducer';
import OnlyBackBtn from 'widget/Header/OnlyBackBtn';
import InputControl from 'widget/Form/InputControl';
import LineProgress from '../widget/LineProgress';
import AuthBackground from 'widget/Container/AuthBackground';
import { middleFadeIn } from 'services/utils/animations';
import KeyboardAvoiding from 'widget/Form/KeyboardAvoidingView';
import Button from 'widget/Native/Button';
import { Container, Content, FormContainer, Label, Title } from '../widget';

const SignUpName = () => {
  const { bottom, top } = useSafeAreaInsets();
  useStatusBar('light-content');
  const ctr = useRegisterInfoCtr();

  const {
    createMyAccount,
    civility,
    name,
    firstname,
    nickname,
    godfatherLabel,
    godfatherPlaceholder,
    next
  } = useSelector((state: rootState) => state.authReducer.authDatas.translation);

  const civilities = useSelector((state: rootState) => state.authReducer.authDatas.taxonomy.civilities);

  return (
    <AuthBackground>
      <OnlyBackBtn noBackground goBack={ctr?.goBack} />
      <Container paddingT={top}>
        <Content>
          <Title>{createMyAccount}</Title>
          <LineProgress width={20} />
          <ScrollView
            fullWidth marginT={25}
          >
            <KeyboardAvoiding>
              <FormContainer>
                <AnimatedView animation={middleFadeIn}>
                  <Label>{civility}</Label>
                </AnimatedView>
                <View row marginB={20}>
                  {civilities.map(item => (
                    <CheckBox
                      key={item.id}
                      text={item.label}
                      radio
                      value={ctr?.civility === item.id}
                      onChecked={() => ctr?.setCivility(item.id)}
                    />))}
                </View>
                <AnimatedView animation={middleFadeIn} delay={200}>
                  <Label>{name}</Label>
                </AnimatedView>
                <InputControl
                  placeholder={name}
                  name="family"
                  control={ctr?.control}
                  semiTransparent
                />
                <AnimatedView animation={middleFadeIn} delay={400}>
                  <Label>{firstname}</Label>
                </AnimatedView>
                <InputControl
                  placeholder={firstname}
                  name="first"
                  control={ctr?.control}
                  semiTransparent
                />
                <AnimatedView animation={middleFadeIn} delay={600}>
                  <Label>{nickname}</Label>
                </AnimatedView>
                <InputControl
                  placeholder={nickname}
                  name="surname"
                  control={ctr?.control}
                  semiTransparent
                />
                <AnimatedView animation={middleFadeIn} delay={800}>
                  <Label>{godfatherLabel}</Label>
                </AnimatedView>
                <InputControl
                  placeholder={godfatherPlaceholder}
                  name="godfather"
                  control={ctr?.control}
                  semiTransparent
                />
              </FormContainer>
            </KeyboardAvoiding>
          </ScrollView>
          <View
            fullWidth
            marginB={bottom || 20}
          >
            <Button
              text={next}
              loading={ctr?.loading}
              onPress={ctr?.handleSubmit(ctr?.onSubmit)}
              disabled={!ctr?.civility || !ctr.watch('family') || !ctr.watch('first') || !ctr.watch('surname')}
              md
            />
          </View>
        </Content>
      </Container>
    </AuthBackground>
  );
};

export default SignUpName;
