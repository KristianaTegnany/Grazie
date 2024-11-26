import {gql} from '@apollo/client';

const query_burger_menu = gql`
  query {
    translation {
      accountInformation
      personnalInformation
      myCurrentSubscriptionsPlans
      notifications
      proMessaging
      contactGigi
      customizeAccount
      myProfileKeywords
      myTrips
      gigissimoServices
      gigiSubscriptionsPlans
      orderService
      myOrders
      whoIsGigi
      legal
      privacyPolicy
      privacyParameters
      termsConditions
      termsConditionsAbbr
      getSecretsGigiTitle
      logout
      ggCopyright
      chatGigi
      placeholderMessage
      welcomeMessage
    }
  }
`;

export default query_burger_menu;
