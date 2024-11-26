import {IItem} from "../inspiration/type";

export type IAddressDatas = {
  translation: {
    details: string;
    addressesSuggestionsTitle: string;
    addressesSuggestionsSubTitle: string;
    addressesListTitle: string;
    addressesListContentTitle: string;
    addressesListText: string;
    filter: string;
    filterDestination: string;
    addressesFilterDestinationText: string;
    filterDesires: string;
    filterSeason: string;
    filterSaveButton: string;
    addressesListHeaderDescription: string;
    addressesTutoTitle: string;
    addressesTutoText: string;
    addressesTutoButtonLabel: string;

    myNotebooks: string;
    noNotebookLabel: string;
    noNotebookDescription: string;
    gigiNotebooks: string;
    allSecretsAddressesByDestination: string;
    exploreYourDestinationNotebooks: string;
  };
  config: {
    address: {
      headerBg: {
        type: string;
        urlHq: string;
        urlLq: string;
      };
      tutoImage: {
        type: string;
        urlHq: string;
        urlLq: string;
      };
      tutoDescription: string;
    };
  };
  taxonomy: {
    regions: IItem[];
    seasons: IItem[];
    desires: IItem[];
    adresscategories: IItem[];
  };
};

type AddressStateType = {
  addressDatas: IAddressDatas;
  isFirstAddress: boolean;
};

export default AddressStateType;
