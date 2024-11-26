
import { images } from 'assets/images';
import React, { PropsWithChildren } from 'react';
import styles from './style';
import ImageBackground from 'widget/Native/ImageBackground';

type Props = PropsWithChildren<any>

const AuthBackground = (props: Props) => {
    return (
        <ImageBackground
            flex
            ImageProps={{
                source: images.auth.AuthBg,
                style: styles.authBg
            }}>
            {props?.children}
        </ImageBackground>
    );
};

export default AuthBackground;
