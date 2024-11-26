import InspirationStateType from "./type";

export const inspirationInitialState: InspirationStateType = {
  inspirationDatas: {
    translation: {
      inspiration: "",
      italy: "",
      bySeason: "",
      byDesire: "",
      byRegion: "",
      byLengthOfStay: "",
      forPros: "",
      filter: "",
      filterAll: "",
      filterSeason: "",
      filterDesires: "",
      filterDuration: "",
      filterSaveButton: "",
      filterRegion: "",
    },
    config: {
      inspiration: {
        headerBg: {
          type: "",
          urlHq: "",
          urlLq: "",
        },
        headerDescription: "",
        inspirationTutoImg: {
          type: "",
          urlHq: "",
          urlLq: "",
        },
        inspirationTutoDescription: "",
        inspirationTutoBtn: "",
      },
    },
    taxonomy: {
      seasons: [],
      desires: [],
      durations: [],
      inspirationPro: [],
      regions: [],
    },
  },
  isFirstInspiration: true,
};
