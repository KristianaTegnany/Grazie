import {gql} from '@apollo/client';

const query_account = gql`
  query {
    user {
      id
      addressZipcode
      addressCity
      addressStreet
      addressCountryCode
      email
      godfather {
        email
      }
      label
      langcode
      civility {
        id
        label
      }
      firstName
      lastName
      isPro
      isScheduledDeletion
      proActivity {
        id
        label
      }
      birthdate {
        timestamp
        label
      }
      profiles {
        id
        label
        icon {
          urlHq
          urlLq
          label
        }
      }
      whishes {
        id
        label
        icon {
          urlHq
          urlLq
          label
        }
      }
      phoneNumber
      profilePicture {
        urlHq
        urlLq
      }
      notifyNewContent
      notifyOffersSubscription
      notifyInspirationsCommunity
      notifyNews
      notifyOrderInfo
      notifyEmail
      roles {
        id
      }
      subscriptions {
        dates {
          start {
            label
          }
          end {
            timestamp
          }
        }
        endAtLabel
        subscriptionProduct {
          id
          isMag
          isPro
          isAllRegions
          reference
          regions {
            id
          }
          title
          titleListItem
          thumbnail(style: "16_9") {
            alt
            urlHq
            urlLq
          }
          type
          filterAllThumbnail: thumbnail(style: "decoration") {
            alt
            urlHq
            urlLq
          }
          regionExploreNotebookLabel
          packItems {
            id
            isMag
            reference
            regions {
              id
            }
            titleListItem
            thumbnail(style: "16_9") {
              alt
              urlHq
              urlLq
            }
            filterAllThumbnail: thumbnail(style: "decoration") {
              alt
              urlHq
              urlLq
            }
            regionExploreNotebookLabel
          }
          version
        }
      }
    }
  }
`;

export const query_account_subscription = gql`
  query {
    user {
      id
      subscriptions {
        dates {
          end {
            timestamp
          }
        }
      }
    }
  }
`;

export const query_perso_infos = gql`
  {
    translation {
      cancelDeleteAccountSaveButtonLabel
      deleteAccountTitle
      deleteAccountMessage
      deleteAccountSaveButtonLabel
      deleteMyAccountTitle

      personnalInformation
      addProfilePicture
      changeProfilePicture
      fromGallery
      takeAPicture
      civility
      sir
      madam
      name
      firstname
      nickname
      dateBirth
      phoneNumber
      email
      editEmail
      password
      save
      editMyEmail
      newEmail
      confirmNewEmail
      saveNewEmail
      editMyPassword
      oldPassword
      newPassword
      confirmNewPassword
      editPassword
      newPasswordSaved
      cancel
      validate
      profile
      myTrips
      myProfile
      myDesires
      edit

      postalAddressInvoicing
      addressStreetPlaceholder
      addressCityPlaceholder
      addressZipcodePlaceholder
      addressCountryPlaceholder
    }
  }
`;

export const query_countries = gql`
  {
    user {
      id
    }
    countries(onlyAddressCountries: true) {
      items {
        name
        code
      }
    }
  }
`;

export default query_account;
