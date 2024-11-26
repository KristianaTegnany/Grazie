import React from 'react';
import { Image, Text, TouchableOpacity } from 'widget/Native';
import { Platform } from 'react-native';
import { images } from 'assets/images';
import { openURL } from 'screen/Others/whoGigi';

type IProps = {
    size?: 'md' | 'lg';
    text?: string;
    linking?: string;
    type: 'map' | 'phone' | 'mail' | 'web' | 'room' | 'hotel' | 'fb' | 'insta';
};

const ContactIcon = (props: IProps) => {
    const { linking, size, text, type } = props;

    let paddingV: number | undefined = 5,
        paddingT = undefined,
        link = '',
        image = images.tab.HotelContact

    switch (size) {
        case 'md':
            paddingV = 10;
            break
        case 'lg':
            paddingV = undefined;
            paddingT = 15;
            break
    }

    switch (type) {
        case 'map':
            link = Platform.OS === 'ios' ? 'http://maps.apple.com/?q=' : 'geo:0,0?q='
            image = images.tab.MapContact
            break
        case 'phone':
            link = 'tel:'
            image = images.tab.PhoneContact
            break
        case 'mail':
            link = 'mailto:'
            image = images.tab.MailContact
            break
        case 'web':
            link = text?.includes('http') ? '' : 'http://'
            image = images.tab.WebContact
            break
        case 'room':
            image = images.tab.RoomContact
            break
        case 'fb':
            image = images.tab.FBContact
            break
        case 'insta':
            image = images.tab.InstaContact
            break
    }

    const onPress = () => {
        if (!!(linking || link || text)) {
            openURL(linking || `${link}${['email', 'phone'].includes(type) ? text?.split('\n')[0].trim() : text}`)
        }
    }

    return (
        <TouchableOpacity onPress={onPress}
            paddingV={paddingV}
            paddingT={paddingT}
            row iCenter>
            <Image
                source={image}
                resizeMode='contain'
                width={size === 'lg' ? 41 : 31}
                height={size === 'lg' ? 41 : 31}
                marginR={size !== 'lg' ? 10 : 15}
            />
            {!!text &&
                <Text flex size={15} color='onSecondaryDark'>{text}</Text>}
        </TouchableOpacity>
    );
};

export default ContactIcon;
