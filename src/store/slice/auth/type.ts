import {IMedia} from 'store/type';

export type ILabelItem = {
  id: string;
  label: string;
  machineName: string;
  icon?: {
    urlHq: string;
    urlLq: string;
    label: string;
  };
};

export type INoAuthDatas = {
  config: {
    loading: {
      introHtml: string;
      mediaList: IMedia[];
      timer: string;
    };
    onboarding: {
      items: {
        decoration: IMedia;
        media: IMedia & {type: string; alt: string};
        bgColor: string;
        title: string;
        descriptionHtml: string;
      }[];
      timer: string;
    };
    gdpr: {
      title: string;
      textHtml: string;
    };
  };
  languages: {
    id: string;
    label: string;
  };
  translation: {
    chooseYourLanguage: string;
    continue: string;
    next: string;
    validate: string;
    skip: string;
    skipStep: string;
    startBtn: string;
    cookiesAccept: string;
    privacyPolicy: string;
    cookiesManage: string;
    termsConditionsAbbr: string;
    //Code Push
    updateInstallMandatory: string;
    updateInstallOptional: string;
    updateMandatoryAvailable: string;
    updateMandatoryAvailableBtn: string;
    yes: string;
    no: string;
    updateAvailable: string;
    updateDownloading: string;
    updateInstalling: string;
    updateInstalled: string;

    onboardingV2Slide1Title: string;
    onboardingV2Slide1Text: string;
    onboardingV2Slide2Title: string;
    onboardingV2Slide3Title: string;
    onboardingV2Slide3Text: string;
  };
};

export type IAuthDatas = {
  translation: {
    register: string;
    logIn: string;
    login: string;
    email: string;
    password: string;
    forgotPasswordQuestion: string;
    notRegisteredAsGigiYet: string;
    registerFormal: string;
    createMyAccount: string;
    confirmPassword: string;
    alreadyRegisteredAsGigi: string;
    loginFormal: string;
    civility: string;
    name: string;
    firstname: string;
    nickname: string;
    godfatherLabel: string;
    godfatherPlaceholder: string;
    nicknameAlreadyExist: string;
    godfatherNotExist: string;
    cannotBeYourOwnGodfatherErrorMessage: string;
    next: string;
    imProfessional: string;
    chooseYourActivity: string;
    helpUsRecommandInfoRelatedActivity: string;
    youWouldRather: string;
    youWouldRatherDescription: string;
    whatDoYouLike: string;
    whatDoYouLikeDescription: string;
    finish: string;
    forgotPassword: string;
    resetPasswordDescription: string;
    resetPassword: string;
    enterYourCode: string;
    codeSentEmailProvided: string;
    didntGetCode: string;
    resendCode: string;
    enterNewPassword: string;
    newPassword: string;
    confirmNewPassword: string;
    savePassword: string;
    newPasswordSaved: string;
    backToLogin: string;
    notifyAllowAllLabel: string;
    notifyEmailLabel: string;
  };
  taxonomy: {
    civilities: ILabelItem[];
    user: {
      proActivities: ILabelItem[];
      profiles: ILabelItem[];
      whishes: ILabelItem[];
    };
  };
};

type AuthStateType = {
  noAuthDatas: INoAuthDatas;
  authDatas: IAuthDatas;
};

export default AuthStateType;
