import {gql} from '@apollo/client';

const query_auth = gql`
  query {
    translation {
      register
      logIn
      login
      email
      password
      forgotPasswordQuestion
      notRegisteredAsGigiYet
      registerFormal
      createMyAccount
      password
      confirmPassword
      alreadyRegisteredAsGigi
      loginFormal
      notifyEmailLabel
      notifyAllowAllLabel
      civility
      name
      firstname
      nickname
      godfatherLabel
      godfatherPlaceholder
      godfatherNotExist
      cannotBeYourOwnGodfatherErrorMessage
      nicknameAlreadyExist
      next
      imProfessional
      chooseYourActivity
      helpUsRecommandInfoRelatedActivity
      youWouldRather
      youWouldRatherDescription
      whatDoYouLike
      whatDoYouLikeDescription
      finish
      forgotPassword
      resetPasswordDescription
      resetPassword
      enterYourCode
      codeSentEmailProvided
      didntGetCode
      resendCode
      resetPassword
      newPassword
      confirmNewPassword
      savePassword
      newPasswordSaved
      backToLogin
    }
    taxonomy {
      civilities {
        id
        label
        machineName
      }
      user {
        proActivities {
          id
          label
          machineName
        }
        profiles {
          id
          label
          machineName
          icon {
            urlHq
            urlLq
            label
          }
        }
        whishes {
          id
          label
          machineName
          icon {
            urlHq
            urlLq
            label
          }
        }
      }
    }
  }
`;

export default query_auth;
