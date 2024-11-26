import React from 'react';
import { Text } from 'widget/Native';
import useAppNavigator from 'hooks/useAppNavigator';
import PageContainer from 'widget/Container/PageContainer';
import { useSelector } from 'react-redux';
import { rootState } from 'store/reducer';

const ServiceCondition = () => {
  const appNavigator = useAppNavigator();
  const params: { title: string, terms: string } = appNavigator.getParams();

  const {
    termsAndConditions
  } = useSelector((state: rootState) => state.userReducer.serviceDatas.translation)

  return (
    <PageContainer title={params.title}>
      <Text bold size={20} color='onSecondary' marginT={20}>{termsAndConditions}</Text>
      <Text size={12} color='onSecondary' marginT={20}>{params.terms}</Text>
    </PageContainer>
  );
};

export default ServiceCondition;
