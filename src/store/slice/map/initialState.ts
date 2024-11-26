import MapStateType from "./type";

export const mapInitialState: MapStateType = {
  mapDatas: {
    config: {
      map: {
        thumbnail: {
          alt: "",
          label: "",
          urlHq: "",
          urlLq: "",
        },
        textHtml: "",
      },
    },
    translation: {
      myMapTutoTitle: "",
      myMapTutoButtonLabel: "",
      filters: "",
      filterFavorites: "",
      filterAdressCategories: "",
      filterSuggestions: "",
    },
  },
  isFirstMap: true,
};
