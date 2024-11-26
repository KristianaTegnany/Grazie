type ILabel = {
  id: string;
  label: string;
};

export type IArticle = {
  id: string;
  title: string;
  category: ILabel;
  region: ILabel;
  hasVideo: boolean;
  thumbnail: {
    urlLq: string;
  };
  summary: string;
  type?: string;
  isGreen: boolean;
  isHandmade: boolean;
  isFavorite: boolean;
  isPublic: boolean;
};

export type IArticlesDatas = {
  articles: {
    total: number;
    items: IArticle[];
  };
};

export type ICategory = {
  id: string;
  label: string;
  machineName: string;
  media?: {
    urlLq: string;
  }
};

export type ICategoriesDatas = {
  taxonomy: {
    articles: ICategory[];
    stories: ICategory[];
  };
};

export type IMagDatas = {
  translation: {
    advertisment: string;
    theMag: string;
    filterAll: string;
    publishedOn: string;
    discoverMoreGigisFavorites: string;
    toContact: string;
    ingredients: string;
    inKitchen: string;
    discoverOtherGigiSecrets: string;
    italy: string;
    gigiGreen: string;
    fattoMano: string;
    noStoryYet: string;
  };
  config: {
    mag: {
      articlesTitle: string;
      headerBg: {
        type: string;
        urlHq: string;
        urlLq: string;
      };
      headerDescription: string;
      storiesTitle: string;
      storiesTutoImg: {
        type: string;
        urlHq: string;
        urlLq: string;
      };
      storiesTutoTitle: string;
      storiesTutoDescription: string;
      storiesTutoBtn: string;
      gigiGreenTitle: string;
      gigiGreenDescription: string;
      fattoManoTitle: string;
      fattoManoDescription: string;
    };
  };
};

type MagStateType = {
  articlesDatas: IArticlesDatas;
  categoriesDatas: ICategoriesDatas;
  magDatas: IMagDatas;
  storiesDatas: {
    isFirstCasa: boolean;
    isFirstBiblio: boolean;
    isFirstPepite: boolean;
    isFirstFriend: boolean;
  };
};

export default MagStateType;
