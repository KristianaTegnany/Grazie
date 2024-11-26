import { images } from 'assets/images';
import React, { useMemo, useState } from 'react';
import {
    Dimensions,
    Platform,
    StyleSheet,
} from 'react-native';
import {
    AnimatedView,
    Image,
    ImageBackground,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'widget/Native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import routeName from 'routes/routeName';
import { rootState } from 'store/reducer';
import { logout } from 'store/slice/user/userSlice';
import colors from 'themes/colors';
import { Button } from 'widget/Native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { updateMenuShown } from 'store/slice/app/appSlice';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Source } from 'react-native-fast-image';
import { getBuildNumber, getVersion } from 'react-native-device-info';
import { openURL } from 'screen/Others/whoGigi';
import TouchableView from 'widget/Native/TouchableView';
import { useUser } from 'hooks/useUser';
import { IS_PROD, VERSION } from '../../../../../env';
import SubscribeItem from 'screen/User/Membership/widget/subscribeItem';
import SubscribeModal from 'screen/User/Membership/SubscribeModal';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

const CategoryItem = ({ disabled, image, text, onPress }: { disabled?: boolean, image: Source, text: string, onPress?: () => void }) => {
    return (
        <TouchableView padding={5} opacity={disabled ? 0.5 : 1} iCenter disabled={disabled} onPress={onPress} marginV={15} row between>
            <View iCenter row>
                <Image
                    source={image}
                    width={20}
                    height={20}
                    resizeMode='contain'
                />
                <Text size={20} bold marginL={10} color='onSecondaryDark'>{text}</Text>
            </View>
            {onPress && <Icon name='chevron-right' color={colors.textFieldGrey} size={15} />}
        </TouchableView>
    )
}

const Item = ({ disabled, isLast, text, onPress }: { disabled?: boolean, isLast?: boolean, text: string, onPress?: () => void }) => {
    return (
        <TouchableOpacity opacity={disabled ? 0.5 : 1} disabled={disabled} onPress={onPress}>
            <View borderBW={1} marginT={10} paddingB={10} iCenter borderC={isLast? 'transparent' : 'grey'} row between>
                <Text size={15} color='textFieldGrey'>{text}</Text>
                <Icon name='chevron-right' color={colors.textFieldGrey} size={15} />
            </View>
        </TouchableOpacity>
    )
}

const MenuModal = () => {
    const navigation = useNavigation();
    const { top } = useSafeAreaInsets()
    const { isPro } = useUser();

    const dispatch = useDispatch();

    const {
        accountInformation,
        personnalInformation,
        myCurrentSubscriptionsPlans,
        notifications,
        contactGigi,
        proMessaging,
        myProfileKeywords,
        myTrips,
        gigissimoServices,
        gigiSubscriptionsPlans,
        whoIsGigi,
        legal,
        privacyPolicy,
        termsConditionsAbbr,
        getSecretsGigiTitle,
        logout: logoutBtn,
        ggCopyright

    } = useSelector((s: rootState) => s.appReducer.burgerMenuDatas.translation);

    const menuShown = useSelector((s: rootState) => s.appReducer.appDatas.menuShown);
    const profilePicture = useSelector((state: rootState) => state?.userReducer.userInfo.profilePicture);

    const [subscribeModal, setSubscribeModal] = useState(false)

    const closeSubscribeModal = () => setSubscribeModal(false);

    const navigate = (routeBase: string, screen?: string) => {
        dispatch(updateMenuShown(1))
        setTimeout(() => {
            // @ts-ignore
            navigation.navigate(routeBase, { screen: screen });
        }, 100);
    };

    const onClose = () => {
        dispatch(updateMenuShown(false))
    }

    const logOut = () => {
        dispatch(logout(true));
        dispatch(updateMenuShown(false))
    };

    const fadeIn = {
        from: {
            transform: [{ scale: 0 }],
            opacity: 0,
        },
        to: {
            transform: [{ scale: 1 }],
            opacity: 1,
        },
    };

    const width = screenWidth < 600 ? '90%' : '60%'
    const appVersion = useMemo(() => getVersion(), [])
    const onPressProfilePicture = () => navigate(routeName.user.base, routeName.user.profile.home)
    const profileImage = profilePicture?.urlLq ? { uri: profilePicture?.urlLq } : images.Logo
    const onPressPersonalInfo = () => navigate(routeName.user.base, routeName.user.profile.info)
    const onPressMembership = () => navigate(routeName.user.base, routeName.user.membership)
    const onPressSecret = () => navigate(routeName.user.base, routeName.user.secret)
    const onPressNotifications = () => navigate(routeName.user.base, routeName.user.notification)
    const onPressMessaging = () => navigate(routeName.user.chat)
    const onPressFormules = () => setSubscribeModal(true)
    const onPressKeywords = () => navigate(routeName.user.base, routeName.user.profile.home)
    const onPressTrips = () => navigate(routeName.user.base, routeName.user.travel.home)
    const onPressWhoGigi = () => navigate(routeName.others.whoGigi)
    const onPressCgv = () => navigate(routeName.others.cgv)
    const onPressPrivacy = () => navigate(routeName.others.privacy)
    const onPressContactGigi = () => openURL('mailto:contact@graziegigi.com')
    const onPressService = () => navigate(routeName.user.base, routeName.user.service.home)
    
    return (
        <Modal
            isVisible={typeof menuShown === 'boolean' ? menuShown : menuShown < 1}
            deviceHeight={screenHeight}
            style={styles.modal}
            statusBarTranslucent={true}
            animationIn="fadeInLeft"
            animationOut="fadeOutLeft"
            backdropTransitionOutTiming={0}
            coverScreen={false}
            useNativeDriver={false}>
            <View flex width={width} minWidth={250} borderTR={15} borderBR={15} color='secondary'>
                <ImageBackground ImageProps={{ source: images.FacePattern }} paddingT={top}  width={'100%'} height={100 + top}>
                    <View paddingH={20} paddingB={20} flex between iCenter row fullWidth>
                        <AnimatedView animation={fadeIn}>
                            <TouchableOpacity
                                color='white'
                                border={30}
                                padding={2}
                                onPress={onPressProfilePicture}
                            >
                                <Image source={profileImage} width={48} height={48} border={24} />
                            </TouchableOpacity>
                        </AnimatedView>
                        <AnimatedView animation={fadeIn}>
                            <TouchableOpacity
                                onPress={onClose}>
                                <Image source={images.tab.icons.Close} width={18} height={18} />
                            </TouchableOpacity>
                        </AnimatedView>
                    </View>
                </ImageBackground>
                <ScrollView flex marginH={10}>
                    <AnimatedView animation={'fadeInUp'} marginB={10}>
                        <CategoryItem image={images.tab.menu.BmProfile} text={accountInformation} />
                        <Item text={personnalInformation} onPress={onPressPersonalInfo} />
                        <Item text={myCurrentSubscriptionsPlans} onPress={onPressMembership} />
                        <Item text={myProfileKeywords} onPress={onPressKeywords} />
                        <Item text={myTrips} onPress={onPressTrips} />
                        <Item text={getSecretsGigiTitle} onPress={onPressSecret} />
                        <Item text={notifications} onPress={onPressNotifications} isLast={!isPro} />
                        {isPro && <Item text={proMessaging} onPress={onPressMessaging} isLast />}
                        <SubscribeItem title={gigiSubscriptionsPlans?.toUpperCase()} mini onPress={onPressFormules} image={images.tab.menu.Formules} />
                        <SubscribeItem title={gigissimoServices?.toUpperCase()} mini onPress={onPressService} image={images.tab.menu.Gigissimo} />

                    </AnimatedView>
                    <AnimatedView animation={'fadeInUp'} delay={100}>
                        <CategoryItem image={images.tab.menu.BmWho} text={whoIsGigi} onPress={onPressWhoGigi} />
                    </AnimatedView>
                    <AnimatedView animation={'fadeInUp'} delay={200}>
                        <CategoryItem image={images.tab.menu.Contact} text={contactGigi} onPress={onPressContactGigi} />
                    </AnimatedView>
                    <AnimatedView animation={'fadeInUp'} delay={300}>
                        <CategoryItem image={images.tab.menu.BmJury} text={legal} />
                        <Item text={privacyPolicy} onPress={onPressPrivacy} />
                        {/*<Item disabled text={privacyParameters} />*/}
                        <Item text={termsConditionsAbbr} onPress={onPressCgv} isLast />
                    </AnimatedView>
                </ScrollView>
                <AnimatedView
                    animation={'fadeInUp'}
                    paddingH={10}
                    paddingV={25}
                >
                    <Button
                        text={logoutBtn}
                        onPress={logOut}
                    />
                    <View marginT={20}>
                        <Text center size={12} light>{ggCopyright}</Text>
                        <View row center iCenter marginT={5}>
                            <Text center size={12} light>v{appVersion}</Text>
                            {!IS_PROD && Platform.OS === "ios" && <Text center size={12}>({getBuildNumber()})</Text>}
                            {!IS_PROD && <Text center size={12} bold marginL={5}>Preprod V{VERSION}</Text>}
                        </View>
                    </View>
                </AnimatedView>
            </View>
            <SubscribeModal modal={subscribeModal} setModal={closeSubscribeModal} />
        </Modal>
    );
};

export default MenuModal;

const styles = StyleSheet.create({
    modal: {
        padding: 0,
        margin: 0,
    }
});
