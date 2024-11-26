import { images } from "assets/images"
import useStatusBar from "hooks/useStatusBar";
import { PropsWithChildren, ReactNode } from "react";
import { ScrollView as RNScrollView } from "react-native";
import InnerShadow from "widget/Header/InnerShadow";
import TitleBackBtn from "widget/Header/TitleBackBtn"
import { ScrollView, View } from "widget/Native"

type IProps = PropsWithChildren & {
    isModal?: boolean;
    hasBackground?: boolean;
    hasShadow?: boolean;
    noHeader?: boolean;
    noPaddingB?: boolean;
    noPaddingH?: boolean;
    title: string;
    bottomContent?: ReactNode;
    forwardRef?: React.RefObject<RNScrollView>;
}

const PageContainer = ({ bottomContent, children, forwardRef, hasBackground, hasShadow, isModal, noHeader = false, noPaddingH = false, noPaddingB = false, title }: IProps) => {
    useStatusBar('dark-content')
    return (
        <View flex color="tertiary">
            {!noHeader && !!title && !isModal &&
                <TitleBackBtn bottomRadiusReverse={hasBackground} image={hasBackground ? images.Pattern : undefined} title={title} />
            }
            <View flex color='white'>
                {hasShadow && <InnerShadow fullWidth height={15} />}
                <View flex paddingH={noPaddingH ? 0 : 20}>
                    <ScrollView forwardRef={forwardRef} paddingB={noPaddingB ? 0 : 20}>
                        {children}
                    </ScrollView>
                    {bottomContent}
                </View>
            </View>
        </View>
    )
}

export default PageContainer;