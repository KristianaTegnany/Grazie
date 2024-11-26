import { images } from 'assets/images';
import React from 'react';
import { useSelector } from 'react-redux';
import { rootState } from 'store/reducer';
import TabContainer from 'screen/Tab/widget/TabContainer';
import { Image, Text, TextHtml, TouchableOpacity, View } from 'widget/Native';
import { Linking } from 'react-native';

export const openURL = async (url: string) => {
    try {
        Linking.openURL(url)
    } catch (_) { }
}

const WhoGigiScreen = () => {
    const {
        introTitle,
        casaGigiTitle,
        gigiGreenTitle,
        fattoManoTextHtml,
        iconFattoMano,
        contactTitle,
        customerServiceLabel,
        customerServiceMail,
        headerBg,
        iconGigiGreen,
        iconLaCasaGigi,
        imageGigiGreen,
        imageLaCasaGigi,
        pressMagLabel,
        pressMagMail,
        partnersLabel,
        partnersMail,
        website,
        facebookLink,
        instagramLink,
        introTextHtml,
        casaGigiTextHtml,
        gigiGreenTextHtml,
    } = useSelector((s: rootState) => s.appReducer.whoGigiDatas.config.whoisgigi);

    const {
        fattoMano
    } = useSelector((s: rootState) => s.magReducer.magDatas.translation);

    return (
        <TabContainer title={introTitle} image={{ uri: headerBg?.urlLq }} backBtn showTitle>
            <View paddingH={20}>
                <TextHtml>{introTextHtml}</TextHtml>
            </View>
            <Image source={images.Pattern} width={'100%'} height={70} marginT={30} />
            <Image
                source={{ uri: imageLaCasaGigi?.urlLq }}
                width={'100%'} aspectRatio={1.4}
            />
            <View paddingH={20} paddingT={30}>
                <View flex center iCenter>
                    <Image
                        source={{ uri: iconLaCasaGigi?.urlLq }}
                        width={100} height={100}
                    />
                    <Text rosha size={34} marginB={20} color='onSecondary'>
                        {casaGigiTitle}
                    </Text>
                    <TextHtml>{casaGigiTextHtml}</TextHtml>
                </View>
            </View>
            <Image
                source={{ uri: imageGigiGreen?.urlLq }}
                width={'100%'} aspectRatio={1.4} marginT={20}
            />
            <View paddingH={20} paddingT={30}>
                <View flex center iCenter>
                    <Image source={{ uri: iconGigiGreen?.urlLq }} width={30} height={30} marginB={20} />
                    <Text rosha size={34} marginB={10} color='onSecondary'>
                        {gigiGreenTitle}
                    </Text>
                    <Text size={14} bold color='green' marginB={20} >
                        {gigiGreenTitle.toUpperCase()}
                    </Text>
                    <TextHtml>{gigiGreenTextHtml}</TextHtml>
                </View>
            </View>
            <View paddingH={20} paddingT={30}>
                <View flex center iCenter>
                    <Image source={{ uri: iconFattoMano?.urlLq }} width={30} height={30} marginB={20} />
                    <Text rosha size={34} marginB={10} color='onSecondary'>
                        {fattoMano}
                    </Text>
                    <Text size={14} bold color='primaryDark' marginB={20} >
                        {fattoMano.toUpperCase()}
                    </Text>
                    <TextHtml>{fattoManoTextHtml}</TextHtml>
                </View>
            </View>
            <View paddingH={20}>
                <View paddingV={20} marginV={30} border={10} overflow='hidden' color='tertiary'>
                    <View flex row between iCenter paddingL={20} paddingB={30}>
                        <Text flex rosha size={25} color='onSecondary'>
                            {contactTitle}
                        </Text>
                        <Image
                            source={images.contact.MoonRight}
                            width={63} height={100} resizeMode='contain'
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => openURL(`mailto:${customerServiceMail}`)} noPadding>
                        <View flex row iCenter marginB={10} paddingH={20}>
                            <Image source={images.contact.Enveloppe} width={20} height={20} />
                            <Text marginL={10} light size={12} color='onSecondary'>
                                <Text bold>
                                    {customerServiceLabel}:{' '}
                                </Text>
                                {customerServiceMail}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => openURL(`mailto:${pressMagMail}`)} noPadding>
                        <View flex row iCenter marginB={10} paddingH={20}>
                            <Image source={images.contact.Enveloppe} width={20} height={20} />
                            <Text marginL={10} light size={12} color='onSecondary'>
                                <Text bold>
                                    {pressMagLabel}:{' '}
                                </Text>
                                {pressMagMail}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => openURL(`mailto:${partnersMail}`)} noPadding>
                        <View flex row iCenter marginB={10} paddingH={20}>
                            <Image source={images.contact.Enveloppe} width={20} height={20} />
                            <Text marginL={10} light size={12} color='onSecondary'>
                                <Text bold>
                                    {partnersLabel}:{' '}
                                </Text>
                                {partnersMail}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => openURL(website)} noPadding>
                        <View flex row iCenter marginB={10} paddingH={20}>
                            <Image source={images.contact.Website} width={20} height={20} />
                            <Text marginL={10} light size={12} color='onSecondary'>
                                {website}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <View flex row iCenter marginB={10} paddingH={20}>
                        {facebookLink && <TouchableOpacity
                            onPress={() => openURL(facebookLink)}>
                            <Image source={images.contact.Facebook} width={38} height={38} marginR={10} />
                        </TouchableOpacity>}
                        {instagramLink && <TouchableOpacity
                            onPress={() => openURL(instagramLink)}>
                            <Image source={images.contact.Instagram} width={38} height={38} />
                        </TouchableOpacity>}
                    </View>
                </View>
            </View>
        </TabContainer>
    );
};

export default WhoGigiScreen;
