import AddressStateType from "./type";

export const addressInitialState: AddressStateType = {
  addressDatas: {
    translation: {
      details: "",
      addressesSuggestionsTitle: "",
      addressesSuggestionsSubTitle: "",
      addressesListTitle: "",
      addressesListContentTitle: "",
      addressesListText: "",
      filter: "",
      filterDestination: "",
      addressesFilterDestinationText: "",
      filterDesires: "",
      filterSeason: "",
      filterSaveButton: "",
      addressesListHeaderDescription: "",
      addressesTutoTitle: "",
      addressesTutoText: "",
      addressesTutoButtonLabel: "",

      myNotebooks: "",
      noNotebookLabel: "",
      noNotebookDescription: "",
      gigiNotebooks: "",
      allSecretsAddressesByDestination: "",
      exploreYourDestinationNotebooks: "",
    },
    config: {
      address: {
        headerBg: {
          type: "",
          urlHq: "",
          urlLq: "",
        },
        tutoImage: {
          type: "",
          urlHq: "",
          urlLq: "",
        },
        tutoDescription: "",
      },
    },
    taxonomy: {
      regions: [],
      seasons: [],
      desires: [],
      adresscategories: [],
    },
  },
  isFirstAddress: true,
};
