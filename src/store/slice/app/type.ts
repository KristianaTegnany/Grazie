export type IBottomNavDatas = {
  translation: {
    theMag: string;
    inspiration: string;
    myNotebooks: string;
    myMap: string;
    favorites: string;
  };
};

type IAppDatas = {
  menuShown: boolean | number;
  subscribeShown: boolean;
  subscribeMagShown: boolean;
  carnetData: any;
  privateShown: boolean;
  isItalian: boolean;
  isLocale: boolean;
  isSplash: boolean;
  isOnBoarding: boolean;
  isWelcome: boolean;
};

export type IBurgerMenuDatas = {
  translation: {
    accountInformation: string;
    personnalInformation: string;
    myCurrentSubscriptionsPlans: string;
    notifications: string;
    customizeAccount: string;
    myProfileKeywords: string;
    myTrips: string;
    gigissimoServices: string;
    gigiSubscriptionsPlans: string;
    orderService: string;
    myOrders: string;
    whoIsGigi: string;
    legal: string;
    privacyPolicy: string;
    privacyParameters: string;
    termsConditions: string;
    termsConditionsAbbr: string;
    getSecretsGigiTitle: string;
    logout: string;
    proMessaging: string;
    contactGigi: string;
    ggCopyright: string;
    //Pour chat
    chatGigi: string;
    placeholderMessage: string;
    welcomeMessage: string;
  };
};

export type INotificationDatas = {
  translation: {
    manageNotifications: string;
    enableNotifications: string;
    enableNotificationsDescription: string;
    goToSettings: string;
    manageYourNotifications: string;
    notifyNewContentLabel: string;
    notifyOffersSubscriptionLabel: string;
    notifyInspirationsCommunityLabel: string;
    notifyNewsLabel: string;
    notifyOrderInfoLabel: string;
    getSecretsGigiTitle: string;
    getSecretsGigiEmailLabel: string;
  };
};

export type IWhoGigiDatas = {
  config: {
    whoisgigi: {
      headerBg: {
        urlHq: string;
        urlLq: string;
      };
      introTitle: string;
      casaGigiTitle: string;
      gigiGreenTitle: string;
      contactTitle: string;
      customerServiceLabel: string;
      customerServiceMail: string;
      pressMagLabel: string;
      pressMagMail: string;
      partnersLabel: string;
      partnersMail: string;
      website: string;
      facebookLink: string;
      instagramLink: string;
      introTextHtml: string;
      casaGigiTextHtml: string;
      gigiGreenTextHtml: string;
      imageLaCasaGigi: {
        urlHq: string;
        urlLq: string;
      };
      imageGigiGreen: {
        urlHq: string;
        urlLq: string;
      };
      iconLaCasaGigi: {
        urlHq: string;
        urlLq: string;
      };
      iconGigiGreen: {
        urlHq: string;
        urlLq: string;
      };
      fattoManoTextHtml: string;
      iconFattoMano: {
        urlHq: string;
        urlLq: string;
      };
    };
  };
};

export type ICgvDatas = {
  config: {
    cgu: {
      title: string;
      textHtml: string;
    };
  };
};

export type ICookiesDatas = {
  config: {
    cookies: {
      title: string;
      textHtml: string;
    };
  };
};

export type IPrivacyDatas = {
  config: {
    privacypolicy: {
      title: string;
      textHtml: string;
    };
  };
};

export type IMembershipDatas = {
  config: {
    subcriptionProduct: {
      thumbnail: {
        label: string;
        urlHq: string;
        urlLq: string;
        alt: string;
      };
      footerImage: {
        label: string;
        urlHq: string;
        urlLq: string;
        alt: string;
      };
    };
  };
  translation: {
    theNotebookOf: string;
    theNotebookOfPlural: string;
    allSecretsAddresses: string;
    theGeolocatedMap: string;
    theGeolocatedMapDescription: string;
    addExpWithTheseOffers: string;

    mySubscriptionsPlans: string;
    myCurrentSubscriptionsPlans: string;
    needMoreContent: string;
    seeSubscriptionsPlans: string;
    noSubscriptionPlanLabel: string;
    noSubscriptionPlanDescription: string;

    subscriptionProductsTitle: string;
    subscriptionProductsChangeTitle: string;
    subscriptionProductsChooseText: string;
    subscriptionProductsChooseButtonLabel: string;
    subscriptionProductsCurrentTitle: string;
    subscriptionProductsCurrentFromDate: string;
    subscriptionProductsCurrentToDate: string;
    subscriptionProductsProTitle: string;
    subscriptionProductsProSubtitle: string;
    subscriptionProductsPaymentTerms: string;
    continue: string;
    goBack: string;
    promoCode: string;
    restorePurchase: string;
    useTheCode: string;

    memberEdition: string;
    memberEdition2: string;
    becomeMemberToContinueReading: string;
    chooseMembershipDuration: string;
    noCommitment: string;
    becomeMemberToAccessAllGigisExclusiveContent: string;
    becomeMemberToDiscoverOurAddresses: string;
    becomeMember: string;
    chooseThisFormula: string;

    gigiSubscriptionsPlans: string;
    gigiSubscriptionsPlansDescription: string;

    gigisMag: string;
    italianNewsAndInspirations: string;
    inspiration: string;
    findTheDestinationThatSuitsYourProject: string;
    theAddressBook: string;
    targetedAddressesToYourProfile: string;
    theInteractiveMap: string;
    aTravelAssistantIndicatingYourFavorites: string;
    subscribeToGigiMag: string;
    or: string;
  };
};

export type ISharedDatas = {
  translation: {
    searchPlaceholder: string;
  };
};

type AppStateType = {
  bottomNavDatas: IBottomNavDatas;
  appDatas: IAppDatas;
  burgerMenuDatas: IBurgerMenuDatas;
  notificationDatas: INotificationDatas;
  whoGigiDatas: IWhoGigiDatas;
  cgvDatas: ICgvDatas;
  privacyDatas: IPrivacyDatas;
  cookiesDatas: ICookiesDatas;
  membershipDatas: IMembershipDatas;
  subscriptionsBO: any[];
  sharedDatas: ISharedDatas;
  params?: {},
  redirectTo: string | null
};

export default AppStateType;
