import React /*, { memo }*/ from 'react';
import {
    StyleSheet
} from 'react-native';
import {
    ImageBackground,
    Text,
    View
} from 'widget/Native';
import { AnimatedView } from 'widget/Native';
import LinearGradient from 'react-native-linear-gradient';
import { Source } from 'react-native-fast-image';
import { fadeZoomIn } from 'services/utils/animations';

type IProps = {
    image: Source;
    title?: string;
    titleLeft?: boolean;
    subtitle?: string;
    mini?: boolean
};

const TabImageBackground = ({ image, mini, title, titleLeft, subtitle }: IProps) => {
    const style: any = [styles.indexBg, styles.height, { alignItems: titleLeft ? 'flex-start' : 'center' }]
    const colors = mini ? [
        'rgba(0,0,0,0.3)',
        'rgba(0,0,0,0.5)',
        'rgba(0,0,0,0.7)',
        'rgba(0,0,0,1)',
    ] : [
        'rgba(0,0,0,0)',
        'rgba(0,0,0,0.1)',
        'rgba(0,0,0,0.6)',
        'rgba(0,0,0,0.9)',
    ]

    return (
        <ImageBackground
            ImageProps={{
                source: image,
                resizeMode: 'cover'
            }}
            color='onSecondaryDark' fullWidth aspectRatio={mini ? 0.9 : (titleLeft ? 0.75 : 1.2)}>
            <LinearGradient
                style={style}
                colors={colors}>
                {
                    !!title &&
                    <AnimatedView
                        animation={fadeZoomIn}
                        marginB={60} center={!titleLeft} iCenter paddingH={titleLeft ? 20 : 40}>
                        <Text size={mini ? 28 : (titleLeft ? 34 : 40)} center={!titleLeft} marginR={titleLeft ? 80 : 0} marginB={mini ? 10 : 0} rosha color='white'>{title}</Text>
                        {!!subtitle && (
                            <Text size={15} center light color='white'>{subtitle}</Text>
                        )}
                    </AnimatedView>
                }
            </LinearGradient>
            {!mini && <View marginT={-24} fullWidth height={25} borderT={25} color='white' />}
        </ImageBackground >
    );
} //, (prev, next) => JSON.stringify(prev.image) === JSON.stringify(next.image));

export default TabImageBackground;

const styles = StyleSheet.create({
    indexBg: {
        justifyContent: 'flex-end',
    },
    height: {
        height: '100%'
    },
});
