import FavoriteStateType from "./type";

export const favoriteInitialState: FavoriteStateType = {
  favoriteDatas: {
    translation: {
      myLists: "",
      myListsDescription: "",
      removeFavoriteConfirm: "",
      removeFromAllLists: "",
      removeFromAllListsConfirm: "",
      favorites: "",
      save: "",
      discover: "",
      createBtn: "",
      createList: "",
      selectFavoritesList: "",
      addTofavorites: "",
      nameYourList: "",
      options: "",
      changeList: "",
      delete: "",
      cancel: "",
    },
    config: {
      favorites: {
        headerDescription: "",
        intro: "",
        headerBg: {
          urlHq: "",
          urlLq: "",
          type: "",
        },
      },
    },
  },
  favoritesLists: {
    total: 0,
    items: [],
  },
  isFirstFavorite: true,
};
