import {gql} from '@apollo/client';

const query_notification = gql`
  query {
    translation {
      manageNotifications
      enableNotifications
      enableNotificationsDescription
      goToSettings
      manageYourNotifications
      notifyNewContentLabel
      notifyOffersSubscriptionLabel
      notifyInspirationsCommunityLabel
      notifyNewsLabel
      notifyOrderInfoLabel
      getSecretsGigiTitle
      getSecretsGigiEmailLabel
    }
  }
`;

export default query_notification;
