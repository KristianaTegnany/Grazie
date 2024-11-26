import {gql} from "@apollo/client";

const query_mag_categories = gql`
  query {
    user {
      id
    }
    taxonomy {
      articles {
        id
        label
        machineName
      }
      stories {
        id
        label
        machineName
      }
    }
  }
`;

export default query_mag_categories;
