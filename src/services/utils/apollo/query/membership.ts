import {gql} from '@apollo/client';

const query_membership_datas = gql`
  query {
    config {
      subcriptionProduct {
        thumbnail {
          label
          urlHq
          urlLq
          alt
        }
        footerImage {
          label
          urlHq
          urlLq
          alt
        }
      }
    }
    translation {
      theNotebookOf
      theNotebookOfPlural
      allSecretsAddresses
      theGeolocatedMap
      theGeolocatedMapDescription
      addExpWithTheseOffers

      mySubscriptionsPlans
      myCurrentSubscriptionsPlans
      needMoreContent
      seeSubscriptionsPlans
      noSubscriptionPlanLabel
      noSubscriptionPlanDescription


      subscriptionProductsTitle
      subscriptionProductsChangeTitle
      subscriptionProductsChooseText
      subscriptionProductsChooseButtonLabel
      subscriptionProductsCurrentTitle
      subscriptionProductsCurrentFromDate
      subscriptionProductsCurrentToDate
      subscriptionProductsProTitle
      subscriptionProductsProSubtitle
      subscriptionProductsPaymentTerms
      continue
      goBack
      promoCode
      restorePurchase
      useTheCode

      memberEdition
      memberEdition2
      becomeMemberToContinueReading
      chooseMembershipDuration
      noCommitment
      becomeMemberToAccessAllGigisExclusiveContent
      becomeMemberToDiscoverOurAddresses
      becomeMember
      chooseThisFormula

      gigiSubscriptionsPlans
      gigiSubscriptionsPlansDescription

      gigisMag
      italianNewsAndInspirations
      inspiration
      findTheDestinationThatSuitsYourProject
      theAddressBook
      targetedAddressesToYourProfile
      theInteractiveMap
      aTravelAssistantIndicatingYourFavorites
      subscribeToGigiMag
      or
    }
  }
`;

export const query_subscription_detail = gql `
  query ($id: ID!) {
  user { id }
  subscriptionProduct(id: $id) {
    id
    reference
    type
    title
    titlePageItem
    price {
      sku
      number
      formatted
      label
    }
    thumbnail(style: "16_9") {
      alt
      urlHq
      urlLq
    }
    panels {
      ... on ParagraphSubscriptionPanel {
        theme {
          label
          machineName
        }
        title
        contentHtml
        media {
          alt
          label
          type
          urlHq
          urlLq
        }
        mediaMap: media(style: "16_9") {
          alt
          urlHq
          urlLq
        }
        address {
          id
          category {
            id
            label
          }
          isFavorite
          sector
          summary
          title
          enseigne
          description
          region {
            id
            label
          }
          partnerTypes {
            id
            label
          }
          latitude
          longitude
          thumbnail {
            urlHq
            urlLq
          }
          content {
            type
            ... on ParagraphDetailsContact {
              address
              emailAddresses
              phoneNumbers
              website
              roomsLabel
              rooms
              amenities
              socialNetworks {
                id
                label
                url
              }
            }
            ... on ParagraphGigiFriends {
              title
              contentHtml
            }
            ... on ParagraphGigiWink {
              title
              contentHtml
            }
            ... on ParagraphMedia {
              media {
                type
                urlHq
                urlLq
              }
            }
            ... on ParagraphMediaMultiple {
              medias {
                label
                urlHq
                urlLq
              }
            }
            ... on ParagraphRecipe {
              ingredientsHtml
              stepsHtml {
                contentHtml
              }
            }
            ... on ParagraphProgramme {
              title
              programmesUnit {
                title
                textHtml
              }
            }
            ... on ParagraphPartnerSuggestion {
              title
              text
            }
            ... on ParagraphText {
              contentHtml
            }
            ... on ParagraphTitle {
              titleHtml
            }
            ... on ParagraphTitleText {
              title
              contentHtml
            }
          }
        }
      }
    }
    offers {
      total
      items {
        id
        reference
        type
        title
        price {
          sku
          number
          formatted
        }
        displayOldPrice
        thumbnail(style: "16_9_wide") {
          alt
          urlHq
          urlLq
        }
        type
        packItems {
          id
          isMag
          thumbnail(style: "16_9") {
            alt
            urlHq
            urlLq
          }
        }
      }
      cta {
        label
      }
    }
  }
}
`

export const query_subscriptions = gql`
  query {
    user {
      id
    }
    subscriptionProducts(version: "3") {
      total
      items {
        id
        uid
        reference
        thumbnail {
          label
          urlHq
          urlLq
          alt
        }
        title
        titleListItem
        titlePageItem
        displayPrice
        displayFullPrice
        displayOldPrice
        isAllRegions
        isPro
        isMag
        regions {
          id
          label
        }
        filterAllThumbnail: thumbnail(style: "decoration") {
          urlHq
          urlLq
        }
        regionExploreNotebookLabel
        shortDescription {
          ... on ParagraphText {
            contentHtml
          }
          ... on ParagraphTitle {
            titleHtml
          }
          ... on ParagraphTitleText {
            title
            contentHtml
          }
          ... on ParagraphImageTitleText {
            title
            contentHtml
            media {
              urlHq
              urlLq
            }
          }
        }
        shortDescription2 {
          ... on ParagraphText {
            contentHtml
          }
          ... on ParagraphTitle {
            titleHtml
          }
          ... on ParagraphTitleText {
            title
            contentHtml
          }
          ... on ParagraphImageTitleText {
            title
            contentHtml
            media {
              urlHq
              urlLq
            }
          }
        }
        fullDescription {
          ... on ParagraphText {
            contentHtml
          }
          ... on ParagraphTitle {
            titleHtml
          }
          ... on ParagraphTitleText {
            title
            contentHtml
          }
          ... on ParagraphImageTitleText {
            title
            contentHtml
            media {
              urlHq
              urlLq
            }
          }
        }
      }
    }
  }
`;

export default query_membership_datas;
