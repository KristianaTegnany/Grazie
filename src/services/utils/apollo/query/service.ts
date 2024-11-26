import {gql} from '@apollo/client';

const query_service_datas = gql`
  query {
    user {
      id
    }
    phoneContactTypes {
      items {
        id
        label
      }
    }
    phoneNumbers {
      items {
        countryCode
        flagUrl
        phoneCode
      }
    }
    serviceProducts {
      title
      total
      items {
        addToCartButtonLabel
        description
        details {
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
              id
              urlHq
              urlLq
              label
            }
          }
        }
        extraInfo
        id
        isPriceStartingAt
        reference
        terms
        title
        thumbnail(style: "service_large") {
          urlHq
          urlLq
        }
        price {
          number
          sku
          formatted
        }
        summary
      }
    }
    travelPurposes {
      items {
        id
        label
      }
    }
    translation {
      gigissimoServices
      gigissimoServicesDescription
      priceStartingAt

      details
      termsAndConditions
      bookAppointment
      seeOthersServices

      adviceAppointment
      customisedJourney
      conciergeService
      orderDestinationLabel
      orderDestinationDescription

      servicesIntroTitle
      servicesIntroDescription
      helpMeOrganiseMyTrip

      knowTravelDates
      chooseYourDates
      dontKnowTravelDates
      dates
      confirmDates
      dateFrom
      dateTo
      next

      orderContactMethodLabel
      orderPhoneNumberLabel
      selectRegionCode

      appointmentCallslotLabel
      showMoreSlots

      orderSummaryLabel
      edit
      destination
      travelDates
      toBeContacted
      yourSlot
      day
      days
      person
      people
      confirmAndPay
      longClickToChangeStartDate

      yourTravelDetails
      howManyPeopleTravelling
      howManyPeoplePlaceholder
      haveAccommodation
      nameAccommodationLabel
      stayPrioritiesLabel

      yes
      no
      skipStep

      conciergeServiceDurationLabel
      conciergeServiceDurationPlaceholder
      conciergeServiceDurationReachMaxDescription
      conciergeServiceCorrespondingDateLabel
      conciergeServiceTotalNumberOfDays

      yourRequest

      myOrders
      noOrderYet
      orderStatusOnDate
      statusLabel
      enableNotifications
      servicesNotificationDescription
      goToSettings
      newOrder

      adviceAppointmentExpertCalling
      editAppointment
      modifyMyOrder
      showInvoice
      download
      confirmNewDate
      confirmNewDateSuccess
      confirmNewDateMaximumReached

      customisedJourneyExplanation
      conciergeServiceExplanation

      orderThankYouTitle
      orderThankYouMessage
      orderThankYouSuccessMessage
      close
    }
  }
`;

export const query_orders = gql`
  query ($offset: Int, $limit: Int) {
    user {
      id
    }
    myOrders(offset: $offset, limit: $limit) {
      total
      items {
        id
        status {
          machineName
          label
        }
        region {
          id
          label
        }
        travelDuration
        travelPurposes {
          machineName
          label
        }
        ordered
        product {
          id
          reference
          title
          thumbnail {
            urlHq
            urlLq
          }
        }
      }
    }
  }
`;

export const query_order = gql`
  query ($id: ID!) {
    user {
      id
    }
    order(id: $id) {
      id
      status {
        label
        machineName
      }
      product {
        reference
        thumbnail {
          urlHq
          urlLq
          alt
        }
        title
      }
      appointment {
        id
        date {
          label
          timestamp
        }
        callslot {
          id
          label
        }
      }
      ordered
      region {
        id
        label
        machineName
      }
      travelDates {
        start {
          timestamp
          html
          type
          label
        }
        end {
          timestamp
          html
          type
          label
        }
      }
      travelDuration
      phone {
        number
        countryCode
        national
        international
        html
      }
      contactMethod {
        label
        machineName
      }
      travelersNumber
      isHosted
      accommodationName
      travelPurposes {
        label
        machineName
      }
      date {
        created
        html
        label
      }
      ordered
      description
      attachedFile {
        title
        url
      }
      quantity
      conciergeDate {
        timestamp
        label
      }
    }
    translation {
      editAppointment,
      download
      customisedJourney
    }
  }
`;

export const query_callslots = gql`
  query ($to: String, $from: String) {
    user {
      id
    }
    callslotsAvailabilities(from: $from, to: $to) {
      total
      items {
        date {
          timestamp
          label
        }
        callslots {
          id
          label
          availability
        }
      }
    }
  }
`;
export default query_service_datas;
