type ILabel = {
  id: string;
  label: string;
};

export type IFavoriteList = {
  total: number;
  items: {
    id: string;
    title: string;
    entitiesTotal: number;
    entitiesTotalLabel: string;
    removeListConfirm: string;
    thumbnail: {
      urlLq: string;
    };
  }[];
};

export type IFavoriteDatas = {
  translation: {
    myLists: string;
    myListsDescription: string;
    removeFavoriteConfirm: string;
    removeFromAllLists: string;
    removeFromAllListsConfirm: string;
    favorites: string;
    save: string;
    discover: string;
    createBtn: string;
    createList: string;
    selectFavoritesList: string;
    addTofavorites: string;
    nameYourList: string;
    options: string;
    changeList: string;
    delete: string;
    cancel: string;
  };
  config: {
    favorites: {
      headerDescription: string;
      intro: string;
      headerBg: {
        urlHq: string;
        urlLq: string;
        type: string;
      };
    };
  };
};

type FavoriteStateType = {
  favoriteDatas: IFavoriteDatas;
  favoritesLists: IFavoriteList;
  isFirstFavorite: boolean;
};

export default FavoriteStateType;
