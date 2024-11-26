import {gql} from "@apollo/client";

export const query_travel_list = gql`
  query {
    user {
      id
    }
    travels {
      total
      items {
        id
        title
        startAt
        endAt
        region {
          id
          label
          machineName
          media {
            type
            urlHq
            urlLq
          }
        }
      }
    }
  }
`;

const query_travel = gql`
  query {
    config {
      travel {
        thumbnail {
          label
          alt
          urlHq
          urlLq
        }
      }
    }
    translation {
      myTrips
      dateFrom
      dateTo
      edit
      travelAddButtonLabel
      newTravel
      newTravelSuccess
      newTravelError
      editTravel
      editTravelSuccess
      editTravelError
      deleteTravel
      deleteTravelSuccess
      deleteTravelError
      travelChooseRegionTitle
      travelChooseRegionText
      travelChooseDatesTitle
      travelChooseDatesInput
      travelChooseLabelTitle
      travelConfirmDeleteText
      save
    }
  }
`;

export default query_travel;
