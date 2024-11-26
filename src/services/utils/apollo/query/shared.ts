import {gql} from "@apollo/client";

const query_shared = gql`
  query {
    translation {
      searchPlaceholder
    }
  }
`;

export default query_shared;
