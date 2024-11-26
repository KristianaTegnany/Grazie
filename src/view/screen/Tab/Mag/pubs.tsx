import { /*memo,*/ useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { openURL } from "screen/Others/whoGigi";
import Apollo from "services/utils/apollo";
import { query_mag_pub } from "services/utils/apollo/query";
import { rootState } from "store/reducer";
import { Image, Pressable, Text, View } from "widget/Native";

export const PubTag = () => {
    const advertisment = useSelector((state: rootState) => state.magReducer.magDatas.translation.advertisment);

    return <View absolute={1} top={20} left={20} border={20} paddingV={5} paddingH={20} hexColor="#7C93A3">
        <Text size={14} rosha color="white">{advertisment?.toUpperCase()}</Text>
    </View>
}

const Pubs = ({ index, category }: { index: number, category: number }) => {
    const [pubs, setPubs] = useState<{ [x: number]: any }>();
    useEffect(() => {
        Apollo.query(query_mag_pub, category ? { placement: "mag_home_filter", category } : { placement: "mag_home" }).then(response => {
            if (response?.data?.adInserts?.items) {
                setPubs(response.data.adInserts.items.reduce(
                    (obj: any, item: any) => ((obj[item.position] = item.ad), obj),
                    {},
                ));
            }
        });
    }, [category])

    const onPress = () => {
        if (pubs && pubs[index + 1].cta?.url)
            openURL(pubs[index + 1].cta.url)
    }

    return pubs && Object.keys(pubs).length > 0 && pubs[index + 1] ?
        <Pressable onPress={onPress} marginT={20}>
            <PubTag />
            <Image source={{ uri: pubs[index + 1].media?.urlLq }} aspectRatio={1.39} width={'100%'} />
        </Pressable> : <></>
}

export default Pubs;