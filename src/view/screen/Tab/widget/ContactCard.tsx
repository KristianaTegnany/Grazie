import { Text, View } from "widget/Native"
import ContactIcon from "./ContactIcon";

type IProps = {
    place?: string;
    phone?: string;
    mail?: string;
    web?: string;
    room?: string;
    amenities?: string;
    fbLink?: string;
    instaLink?: string;
    title: string;
}

const ContactCard = ({ place, phone, mail, web, room, amenities, fbLink, instaLink, title }: IProps) => {
    const hasSocial = !!fbLink || !!instaLink

    return (
        <>
            <Text size={25} rosha marginB={20}>{title}</Text>
            {!!place && <ContactIcon type="map" text={place} />}
            {!!phone && <ContactIcon type="phone" text={phone} />}
            {!!mail && <ContactIcon type="mail" text={mail} />}
            {!!web && <ContactIcon type="web" text={web} />}
            {!!room && <ContactIcon type="room" text={room} />}
            {!!amenities && <ContactIcon type="hotel" text={amenities} />}

            {
                hasSocial &&
                <View paddingT={10} row>
                    {!!instaLink && <ContactIcon type="insta" size="lg" linking={instaLink} />}
                    {!!fbLink && <ContactIcon type="fb" size="lg" linking={fbLink} />}
                </View>
            }
        </>
    )
}

export default ContactCard;