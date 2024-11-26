import CardLayout, { ICardLayout } from "./CardLayout";
import FavoriteIcon from "./FavoriteIcon";


const CardRectLayout = (props: ICardLayout) => {
    return (
        <CardLayout {...props} type="rect" renderFavoriteIcon={<FavoriteIcon articleId={props.id} dark={props.dark} isFavorite={props.isFavorite} callback={props.favoriteCallback} />} />
    )
}

export default CardRectLayout;