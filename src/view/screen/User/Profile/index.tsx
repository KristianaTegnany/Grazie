import { images } from "assets/images";
import useAppNavigator from "hooks/useAppNavigator";
import { useSelector } from "react-redux";
import routeName from "routes/routeName";
import { rootState } from "store/reducer";
import TitleBackBtn from "widget/Header/TitleBackBtn";
import { Image, ScrollView, Text, View } from "widget/Native";
import LinkText from "widget/Text/LinkText";
import ProfileItem from "./ProfileItem";
import { useEffect } from "react";
import Apollo from "services/utils/apollo";
import useStatusBar from "hooks/useStatusBar";

const ProfileScreen = () => {
    useStatusBar('dark-content');
    const {
        firstName,
        lastName,
        email,
        phoneNumber,
        profilePicture,
        profiles,
        whishes
    } = useSelector((state: rootState) => state?.userReducer.userInfo);

    const {
        profile,
        myProfile,
        myDesires,
        edit
    } = useSelector((state: rootState) => state?.userReducer.persoInfosDatas.translation);

    const {
        whatDoYouLike,
        whatDoYouLikeDescription,
        youWouldRather,
        youWouldRatherDescription,
    } = useSelector((state: rootState) => state.authReducer.authDatas.translation);

    const navigator = useAppNavigator()

    const navigateToUserInfo = () => navigator.navigateScreen(routeName.user.profile.info)
    const onClickProfile = () => navigator.navigateScreen(routeName.user.profile.tags, {
        items: profiles,
        title: youWouldRather,
        description: youWouldRatherDescription,
    })
    const onClickEnvy = () => navigator.navigateScreen(routeName.user.profile.tags, {
        items: whishes,
        title: whatDoYouLike,
        description: whatDoYouLikeDescription,
    })

    useEffect(() => {
        if (navigator.isFocused)
            Apollo.getAccount()

    }, [navigator.isFocused])
    return (
        <>
            <TitleBackBtn image={images.Pattern} title={profile} />
            <View flex fullWidth borderT={20} center iCenter color="secondary" paddingT={20} marginT={-20} shadow>
                <View size={131} border={66} center iCenter color="white">
                    <Image native
                        source={profilePicture?.urlLq ? { uri: profilePicture?.urlLq } : images.Logo}
                        width={127} height={127} border={65}
                    />
                </View>
                <Image source={images.LeftHalfMoon} width={140} height={280} absolute={-1} left={0} />
                <View fullWidth marginB={30}>
                    <Text center rosha size={30} color='onSecondaryDark' marginV={10}>
                        {firstName} {lastName[0]}.
                    </Text>
                    <Text center size={14} italic color='onSecondaryLight' marginB={5}>
                        {email}
                    </Text>
                    <Text center size={14} italic color='onSecondaryLight'>
                        {phoneNumber}
                    </Text>
                    <LinkText center text={edit} marginT={10}
                        onPress={navigateToUserInfo} />
                </View>
                <ScrollView flex>
                    <View>
                        <ProfileItem title={myProfile} description={profiles.map(item => item.label).join(', ')} onPress={onClickProfile} />
                        <ProfileItem title={myDesires} description={whishes.map(item => item.label).join(', ')} onPress={onClickEnvy} />
                    </View>
                </ScrollView>
            </View>
        </>
    )
}

export default ProfileScreen;