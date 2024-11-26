import {gql} from '@apollo/client';

const query_no_auth = gql`
  query {
    config {
      loading {
        introHtml
        mediaList {
          urlHq
          urlLq
        }
        timer
      }
      gdpr {
        title
        textHtml
      }
    }
    languages {
      id
      label
    }
    translation {
      chooseYourLanguage
      continue
      next
      validate
      skip
      skipStep
      startBtn
      cookiesAccept
      privacyPolicy
      cookiesManage
      termsConditionsAbbr

      updateInstallMandatory
      updateInstallOptional
      updateMandatoryAvailable
      updateMandatoryAvailableBtn
      yes
      no
      updateAvailable
      updateDownloading
      updateInstalling
      updateInstalled

      onboardingV2Slide1Title
      onboardingV2Slide1Text
      onboardingV2Slide2Title
      onboardingV2Slide3Title
      onboardingV2Slide3Text
    }
  }
`;

export default query_no_auth;
