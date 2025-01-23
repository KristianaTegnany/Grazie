import AppStateType from './type';

export const appInitialState: AppStateType = {
  bottomNavDatas: {
    translation: {
      theMag: '',
      inspiration: '',
      myNotebooks: '',
      myMap: '',
      favorites: '',
    },
  },
  appDatas: {
    menuShown: false,
    subscribeShown: false,
    subscribeMagShown: false,
    carnetData: null,
    privateShown: false,
    isItalian: false,
    isLocale: false,
    isSplash: false,
    isOnBoarding: false,
    isWelcome: false,
  },
  burgerMenuDatas: {
    translation: {
      accountInformation: '',
      personnalInformation: '',
      myCurrentSubscriptionsPlans: '',
      notifications: '',
      customizeAccount: '',
      myProfileKeywords: '',
      myTrips: '',
      gigiSubscriptionsPlans: '',
      gigissimoServices: '',
      orderService: '',
      myOrders: '',
      whoIsGigi: '',
      legal: '',
      privacyPolicy: '',
      privacyParameters: '',
      termsConditions: '',
      termsConditionsAbbr: '',
      getSecretsGigiTitle: '',
      logout: '',
      contactGigi: '',
      proMessaging: '',
      ggCopyright: '',
      //Pour chat
      chatGigi: '',
      placeholderMessage: '',
      welcomeMessage: '',
    },
  },
  notificationDatas: {
    translation: {
      manageNotifications: '',
      enableNotifications: '',
      enableNotificationsDescription: '',
      goToSettings: '',
      manageYourNotifications: '',
      notifyNewContentLabel: '',
      notifyOffersSubscriptionLabel: '',
      notifyInspirationsCommunityLabel: '',
      notifyNewsLabel: '',
      notifyOrderInfoLabel: '',
      getSecretsGigiTitle: '',
      getSecretsGigiEmailLabel: '',
    },
  },
  whoGigiDatas: {
    config: {
      whoisgigi: {
        headerBg: {
          urlHq: '',
          urlLq: '',
        },
        introTitle: '',
        casaGigiTitle: '',
        gigiGreenTitle: '',
        contactTitle: '',
        customerServiceLabel: '',
        customerServiceMail: '',
        pressMagLabel: '',
        pressMagMail: '',
        partnersLabel: '',
        partnersMail: '',
        website: '',
        facebookLink: '',
        instagramLink: '',
        introTextHtml: '',
        casaGigiTextHtml: '',
        gigiGreenTextHtml: '',
        imageLaCasaGigi: {
          urlHq: '',
          urlLq: '',
        },
        imageGigiGreen: {
          urlHq: '',
          urlLq: '',
        },
        iconLaCasaGigi: {
          urlHq: '',
          urlLq: '',
        },
        iconGigiGreen: {
          urlHq: '',
          urlLq: '',
        },
        fattoManoTextHtml: '',
        iconFattoMano: {
          urlHq: '',
          urlLq: '',
        },
      },
    },
  },
  cgvDatas: {
    config: {
      cgu: {
        title: '',
        textHtml: '',
      },
    },
  },
  privacyDatas: {
    config: {
      privacypolicy: {
        title: '',
        textHtml: '',
      },
    },
  },
  cookiesDatas: {
    config: {
      cookies: {
        title: '',
        textHtml: '',
      },
    },
  },
  membershipDatas: {
    config: {
      subcriptionProduct: {
        thumbnail: {
          label: '',
          urlHq: '',
          urlLq: '',
          alt: '',
        },
        footerImage: {
          label: '',
          urlHq: '',
          urlLq: '',
          alt: '',
        },
      },
    },
    translation: {
      theNotebookOf: '',
      theNotebookOfPlural: '',
      allSecretsAddresses: '',
      theGeolocatedMap: '',
      theGeolocatedMapDescription: '',
      addExpWithTheseOffers: '',

      mySubscriptionsPlans: '',
      myCurrentSubscriptionsPlans: '',
      needMoreContent: '',
      seeSubscriptionsPlans: '',
      noSubscriptionPlanLabel: '',
      noSubscriptionPlanDescription: '',

      subscriptionProductsTitle: '',
      subscriptionProductsChangeTitle: '',
      subscriptionProductsChooseText: '',
      subscriptionProductsChooseButtonLabel: '',
      subscriptionProductsCurrentTitle: '',
      subscriptionProductsCurrentFromDate: '',
      subscriptionProductsCurrentToDate: '',
      subscriptionProductsProTitle: '',
      subscriptionProductsProSubtitle: '',
      subscriptionProductsPaymentTerms: '',
      continue: '',
      goBack: '',
      promoCode: '',
      restorePurchase: '',
      useTheCode: '',

      memberEdition: '',
      memberEdition2: '',
      becomeMemberToContinueReading: '',
      chooseMembershipDuration: '',
      noCommitment: '',
      becomeMemberToAccessAllGigisExclusiveContent: '',
      becomeMemberToDiscoverOurAddresses: '',
      becomeMember: '',
      chooseThisFormula: '',

      gigiSubscriptionsPlans: '',
      gigiSubscriptionsPlansDescription: '',

      gigisMag: '',
      italianNewsAndInspirations: '',
      inspiration: '',
      findTheDestinationThatSuitsYourProject: '',
      theAddressBook: '',
      targetedAddressesToYourProfile: '',
      theInteractiveMap: '',
      aTravelAssistantIndicatingYourFavorites: '',
      subscribeToGigiMag: '',
      or:  '',
    },
  },
  sharedDatas: {
    translation: {
      searchPlaceholder: '',
    },
  },
  subscriptionsBO: [],
  redirectTo: null
};
