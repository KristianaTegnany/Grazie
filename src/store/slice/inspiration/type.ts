export type IItem = {
  id: string;
  isPro?: boolean;
  label: string;
  machineName: string;
  media: {
    type: string;
    urlHq: string;
    urlLq: string;
  };
  partnerTypes?: {
    id: string;
    label: string;
  }[];
  icon?: {
    id: string;
    label: string;
    urlHq: string;
    urlLq: string;
  };
};

export type IInspirationDatas = {
  translation: {
    inspiration: string;
    italy: string;
    bySeason: string;
    byDesire: string;
    byRegion: string;
    byLengthOfStay: string;
    forPros: string;
    filter: string;
    filterAll: string;
    filterSeason: string;
    filterDesires: string;
    filterDuration: string;
    filterSaveButton: string;
    filterRegion: string;
  };
  config: {
    inspiration: {
      headerBg: {
        type: string;
        urlHq: string;
        urlLq: string;
      };
      headerDescription: string;
      inspirationTutoImg: {
        type: string;
        urlHq: string;
        urlLq: string;
      };
      inspirationTutoDescription: string;
      inspirationTutoBtn: string;
    };
  };
  taxonomy: {
    seasons: IItem[];
    desires: IItem[];
    durations: IItem[];
    inspirationPro: IItem[];
    regions: IItem[];
  };
};

type InspirationStateType = {
  inspirationDatas: IInspirationDatas;
  isFirstInspiration: boolean;
};

export default InspirationStateType;
