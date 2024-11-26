type IProfileChoice = {
  id: string;
  label: string;
};

type UserInfo = {
  id: string;
  addressZipcode: string;
  addressCity: string;
  addressStreet: string;
  addressCountryCode: string;
  label: string;
  langcode: string;
  civility: IProfileChoice;
  firstName: string;
  lastName: string;
  isPro: boolean;
  isScheduledDeletion: boolean;
  proActivity: IProfileChoice;
  birthdate:
    | {
        timestamp: string;
        label: string;
      }
    | string;
  profiles: IProfileChoice[];
  whishes: IProfileChoice[];
  phoneNumber: string;
  profilePicture: {
    urlHq: string;
    urlLq: string;
  };
  profile_picture?: string;
  email: string;
  godfather?: {
    email: string;
  };
  godfather_email?: string;
  temp_email?: string;
  uuid?: string;
  code?: string;
  password?: string;
  notifyNewContent: boolean;
  notifyOffersSubscription: boolean;
  notifyInspirationsCommunity: boolean;
  notifyNews: boolean;
  notifyOrderInfo: boolean;
  notifyEmail: boolean;
  notifications: {
    [key: string]: boolean;
  };
  roles: {id: string}[];
  subscription?: {
    id: string;
    title: string;
    createdAt: string;
    startAt: string;
    endAt: string;
    source: any; //TO DO
    subscriptionProduct: any; //TO DO
  };
  subscriptions?: {
    dates: {
      start: {
        label: string;
      },
      end: {
        timestamp: string;
      }
    },
    endAtLabel: string;
    subscriptionProduct: {
      id: string;
      isAllRegions: boolean;
      isMag: boolean;
      isPro: boolean;
      reference: string;
      regions: {
        id: string;
      }[],
      titleListItem: string;
      thumbnail:{
        alt: string;
        urlHq: string;
      },
      filterAllThumbnail:{
        alt: string;
        urlHq: string;
      },
      regionExploreNotebookLabel: string;
      packItems?: {
        id: string;
        isMag: boolean;
        reference: string;
        regions: {
          id: string;
        }[],
        titleListItem: string;
        thumbnail:{
          alt: string;
          urlHq: string;
        },
        filterAllThumbnail:{
          alt: string;
          urlHq: string;
        },
        regionExploreNotebookLabel: string;
      }[];
      title: string;
      type: string;
      version: string;
    }
  }[];
};

export default UserInfo;
