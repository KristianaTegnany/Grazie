import { /*memo,*/ useEffect, useState } from "react"
import { openURL } from "screen/Others/whoGigi"
import Apollo from "services/utils/apollo"
import { query_pub } from "services/utils/apollo/query"
import { Image, Pressable } from "widget/Native"
import { IViewProps } from "widget/Native/View"
import { PubTag } from "../Mag/pubs"

type IProps = IViewProps & {
    nid?: number;
    placement: string;
}

const Pub = (props: IProps) => {
    const [pub, setPub] = useState<any>()
    const { nid, placement } = props
    useEffect(() => {
        Apollo.query(query_pub, { nid, placement }).then(response => {
            if (response.data && response.data.adInserts?.items?.length > 0) {
                setPub(
                    response.data.adInserts.items[0].ad
                );
            }
        });
    }, [])

    const onPress = async () => {
        if (pub?.cta?.url) {
            openURL(pub.cta.url)
        }
    }

    const source = { uri: pub?.media?.urlLq }
    return pub ? (
        <Pressable marginV={20} {...props} onPress={onPress}>
            <PubTag />
            <Image poster source={source} aspectRatio={1.39} width={'100%'} />
        </Pressable>
    ) : <></>
}

export default Pub;