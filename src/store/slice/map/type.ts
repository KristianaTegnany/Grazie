export type IMapDatas = {
  config: {
    map: {
      thumbnail: {
        alt: string;
        label: string;
        urlHq: string;
        urlLq: string;
      };
      textHtml: string;
    };
  };
  translation: {
    myMapTutoTitle: string;
    myMapTutoButtonLabel: string;
    filters: string;
    filterFavorites: string;
    filterAdressCategories: string;
    filterSuggestions: string;
  };
};

type MapStateType = {
  mapDatas: IMapDatas;
  isFirstMap: boolean;
};

export default MapStateType;
