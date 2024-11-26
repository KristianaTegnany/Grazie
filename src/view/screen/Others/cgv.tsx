import React from 'react';
import { useSelector } from 'react-redux';
import { rootState } from 'store/reducer';
import { TextHtml } from 'widget/Native';
import PageContainer from 'widget/Container/PageContainer';

const CgvScreen = ({ isModal }: { isModal?: boolean }) => {
    const {
        title,
        textHtml
    } = useSelector((s: rootState) => s.appReducer.cgvDatas.config.cgu);

    return (
        <PageContainer isModal={isModal} title={title}>
            <TextHtml>{textHtml}</TextHtml>
        </PageContainer>
    );
};

export default CgvScreen;
