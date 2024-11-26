import {gql} from "@apollo/client";

const query_bottom_nav = gql`
  query {
    user {
      id
    }
    translation {
      theMag
      inspiration
      myNotebooks
      myMap
      favorites
    }
  }
`;

export default query_bottom_nav;
