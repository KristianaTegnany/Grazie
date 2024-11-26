import { Button, ImageBackground, Text, View } from 'widget/Native';
import React, { useEffect, useState } from 'react';
import useAppNavigator from 'hooks/useAppNavigator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TitleBackBtn from 'widget/Header/TitleBackBtn';
import { images } from 'assets/images';
import { BlurView } from '@react-native-community/blur';
import defaultStyle from 'themes/defaultStyle';
import { useSelector } from 'react-redux';
import { rootState } from 'store/reducer';
import UserInfo from 'services/applicatif/user/type';
import Toast from 'react-native-toast-message';
import AnySizeDragSortable from 'widget/Drag/DragSortableView';
import useStatusBar from 'hooks/useStatusBar';
import PrivateModal from 'screen/User/Membership/widget/PrivateModal';
import { useUser } from 'hooks/useUser';
import { UserService } from 'services/applicatif/user/userService';

const ProfileTagsScreen = () => {
    useStatusBar('light-content');
    const { bottom } = useSafeAreaInsets();
    const { isSubscribed } = useUser()
    const navigator = useAppNavigator();
    const params: any = navigator.getParams();

    const {
        whatDoYouLike,
    } = useSelector((state: rootState) => state.authReducer.authDatas.translation);

    const [loading, setLoading] = useState(false);
    const [orderedItems, setOrderedItems] = useState<Array<any>>(params?.items);
    const [privateModal, setPrivateModal] = useState(false);

    const closePrivateModal = () => setPrivateModal(false)
    const openPrivateModal = () => setPrivateModal(true)

    useEffect(() => {
        setOrderedItems(params?.items);
    }, [params]);

    const save = () => {
        if (isSubscribed) {
            setLoading(true)
            let userInfo
            const items = orderedItems.map(item => item.id)
            if (params.title === whatDoYouLike)
                userInfo = {
                    whishes: items
                }
            else userInfo = {
                profile_types: items
            }

            UserService.updateAccount(userInfo as UserInfo).then(result => {
                Toast.show({
                    type: result.success ? 'success' : 'error',
                    text2: result.message,
                });
                if (result.success) {
                    navigator.goBack();
                }
            }).finally(() => setLoading(false))
        } else {
            openPrivateModal()
        }
    };

    const onDataChange = (data: any[], callback: any) => {
        setOrderedItems(Object.assign([], data));
        callback();
    }

    return (
        <ImageBackground ImageProps={{
            source: images.tab.card.CardProfileBGLg,
            resizeMode: 'stretch'
        }} fullWidth height={'100%'}>
            <BlurView blurType="dark" blurAmount={1} style={defaultStyle.absolute} />
            <TitleBackBtn title='Profil' white />
            <View flex>
                <View flex fullWidth paddingH={20} paddingB={bottom || 20}>
                    <View flex>
                        <Text marginT={20} size={20} bold color='white'>{params.title}</Text>
                        <Text marginT={15} color='white'>
                            {params.description}
                        </Text>
                        <View flex marginV={20}>
                            <AnySizeDragSortable data={orderedItems} isEdit
                                onDataChange={onDataChange} />
                        </View>
                    </View>
                    <Button
                        md
                        loading={loading}
                        text={'Enregistrer'}
                        onPress={save}
                    />
                </View>
            </View>
            <PrivateModal modal={privateModal} closeModal={closePrivateModal} />
        </ImageBackground>
    );
};

export default ProfileTagsScreen;
