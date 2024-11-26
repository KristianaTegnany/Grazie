import MagStateType from './type';

export const magInitialState: MagStateType = {
  articlesDatas: {
    articles: {
      total: 0,
      items: [],
    },
  },
  categoriesDatas: {
    taxonomy: {
      articles: [],
      stories: [],
    },
  },
  magDatas: {
    translation: {
      advertisment: '',
      theMag: '',
      filterAll: '',
      publishedOn: '',
      discoverMoreGigisFavorites: '',
      toContact: '',
      ingredients: '',
      inKitchen: '',
      discoverOtherGigiSecrets: '',
      italy: '',
      gigiGreen: '',
      fattoMano: '',
      noStoryYet: '',
    },
    config: {
      mag: {
        articlesTitle: '',
        headerBg: {
          type: '',
          urlHq: '',
          urlLq: '',
        },
        headerDescription: '',
        storiesTitle: '',
        storiesTutoImg: {
          type: '',
          urlHq: '',
          urlLq: '',
        },
        storiesTutoTitle: '',
        storiesTutoDescription: '',
        storiesTutoBtn: '',
        gigiGreenTitle: '',
        gigiGreenDescription: '',
        fattoManoTitle: '',
        fattoManoDescription: '',
      },
    },
  },
  storiesDatas: {
    isFirstCasa: true,
    isFirstBiblio: true,
    isFirstPepite: true,
    isFirstFriend: true,
  },
};
