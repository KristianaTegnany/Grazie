import React from 'react';
import { useSelector } from 'react-redux';
import { rootState } from 'store/reducer';
import { TextHtml } from 'widget/Native';
import PageContainer from 'widget/Container/PageContainer';

const PrivacyScreen = () => {
    const {
        title,
        textHtml
    } = useSelector((s: rootState) => s.appReducer.privacyDatas.config.privacypolicy);

    return (
        <PageContainer title={title}>
            <TextHtml>{textHtml}</TextHtml>
        </PageContainer>
    );
};

export default PrivacyScreen;
