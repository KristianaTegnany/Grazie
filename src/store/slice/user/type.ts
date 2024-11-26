import AuthInfo from 'services/applicatif/auth/type';
import UserInfo from 'services/applicatif/user/type';

export type PersoInfosDatas = {
  translation: {
    cancelDeleteAccountSaveButtonLabel: string;
    deleteAccountTitle: string;
    deleteAccountMessage: string;
    deleteAccountSaveButtonLabel: string;
    deleteMyAccountTitle: string;
    personnalInformation: string;
    addProfilePicture: string;
    changeProfilePicture: string;
    fromGallery: string;
    takeAPicture: string;
    civility: string;
    sir: string;
    madam: string;
    name: string;
    firstname: string;
    nickname: string;
    dateBirth: string;
    phoneNumber: string;
    email: string;
    editEmail: string;
    password: string;
    save: string;
    editMyEmail: string;
    newEmail: string;
    confirmNewEmail: string;
    saveNewEmail: string;
    editMyPassword: string;
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
    editPassword: string;
    newPasswordSaved: string;
    cancel: string;
    validate: string;
    profile: string;
    myTrips: string;
    myProfile: string;
    myDesires: string;
    edit: string;
    postalAddressInvoicing: string;
    addressStreetPlaceholder: string;
    addressCityPlaceholder: string;
    addressZipcodePlaceholder: string;
    addressCountryPlaceholder: string;
  };
};

export type TravelDatas = {
  config: {
    travel: {
      thumbnail: {
        label: string;
        alt: string;
        urlHq: string;
        urlLq: string;
      };
    };
  };
  translation: {
    myTrips: string;
    dateFrom: string;
    dateTo: string;
    edit: string;
    travelAddButtonLabel: string;
    newTravel: string;
    newTravelSuccess: string;
    newTravelError: string;
    editTravel: string;
    editTravelSuccess: string;
    editTravelError: string;
    deleteTravel: string;
    deleteTravelSuccess: string;
    deleteTravelError: string;
    travelChooseRegionTitle: string;
    travelChooseRegionText: string;
    travelChooseDatesTitle: string;
    travelChooseDatesInput: string;
    travelChooseLabelTitle: string;
    travelConfirmDeleteText: string;
    save: string;
  };
};

export type ITravel = {
  id: string;
  title: string;
  startAt: string;
  endAt: string;
  region: {
    id: string;
    label: string;
    machineName: string;
    media: {
      urlLq: string;
    }
  };
};
export type ServiceDatas = {
  phoneContactTypes: {
    items: {
      id: string;
      label: string;
    }[];
  };
  phoneNumbers: {
    items: {
      countryCode: string;
      flagUrl: string;
      phoneCode: string;
    }[];
  };
  serviceProducts: {
    title: string;
    total: number;
    items: {
      addToCartButtonLabel: string;
      description: string;
      details: any;
      extraInfo: string;
      id: string;
      isPriceStartingAt: boolean;
      reference: string;
      terms: string;
      title: string;
      thumbnail: {
        urlHq: string;
        urlLq: string;
      };
      price: {
        number: number;
        sku: string;
        formatted: string;
      };
      summary: string;
    }[];
  };
  travelPurposes: {
    items: {
      id: string;
      label: string;
    }[];
  };
  translation: {
    gigissimoServices: string;
    gigissimoServicesDescription: string;
    priceStartingAt: string;

    details: string;
    termsAndConditions: string;
    bookAppointment: string;
    seeOthersServices: string;

    adviceAppointment: string;
    customisedJourney: string;
    conciergeService: string;
    orderDestinationLabel: string;
    orderDestinationDescription: string;

    servicesIntroTitle: string;
    servicesIntroDescription: string;
    helpMeOrganiseMyTrip: string;

    knowTravelDates: string;
    chooseYourDates: string;
    dontKnowTravelDates: string;
    dates: string;
    confirmDates: string;
    dateFrom: string;
    dateTo: string;
    next: string;

    orderContactMethodLabel: string;
    orderPhoneNumberLabel: string;
    selectRegionCode: string;

    appointmentCallslotLabel: string;
    showMoreSlots: string;

    orderSummaryLabel: string;
    edit: string;
    destination: string;
    travelDates: string;
    toBeContacted: string;
    yourSlot: string;
    day: string;
    days: string;
    person: string;
    people: string;
    confirmAndPay: string;
    longClickToChangeStartDate: string;

    yourTravelDetails: string;
    howManyPeopleTravelling: string;
    howManyPeoplePlaceholder: string;
    haveAccommodation: string;
    nameAccommodationLabel: string;
    stayPrioritiesLabel: string;

    yes: string;
    no: string;
    skipStep: string;

    conciergeServiceDurationLabel: string;
    conciergeServiceDurationPlaceholder: string;
    conciergeServiceDurationReachMaxDescription: string;
    conciergeServiceCorrespondingDateLabel: string;
    conciergeServiceTotalNumberOfDays: string;

    yourRequest: string;

    myOrders: string;
    noOrderYet: string;
    orderStatusOnDate: string;
    statusLabel: string;
    enableNotifications: string;
    servicesNotificationDescription: string;
    goToSettings: string;
    newOrder: string;

    adviceAppointmentExpertCalling: string;
    editAppointment: string;
    modifyMyOrder: string;
    showInvoice: string;
    download: string;
    confirmNewDate: string;
    confirmNewDateSuccess: string;
    confirmNewDateMaximumReached: string;

    customisedJourneyExplanation: string;
    conciergeServiceExplanation: string;

    orderThankYouTitle: string;
    orderThankYouMessage: string;
    orderThankYouSuccessMessage: string;
    close: string;
  };
};

export type ServiceSteps = {
  id?: string;
  startDate: string;
  endDate: string;
  region: {
    id: string;
    label: string;
  };
  hasHotel: boolean;
  hotel: string;
  nbPers: number;
  priorities: string[];
  quantity: number;
  contactType: {
    id: string;
    label: string;
  };
  phoneCode: string;
  phoneNumber: string;
  callslot: {
    id: string;
    date: number;
    label: string;
  };
  travel: {
    start: number;
    end: number;
  };
};

type UserStateType = {
  authInfo: AuthInfo;
  userInfo: UserInfo;
  tag: {
    profile: Array<{id: number; text: string}>;
  };
  userLists: Array<any>;
  persoInfosDatas: PersoInfosDatas;
  travelDatas: TravelDatas;
  serviceDatas: ServiceDatas;
  serviceSteps: ServiceSteps;
  travels: {
    total: number;
    items: ITravel[];
  };
};

export default UserStateType;
