import {gql} from "@apollo/client";

const query_pub = gql`
  query ($placement: String!, $nid: Int) {
    adInserts(placement: $placement, nid: $nid) {
      items {
        ad {
          id
          media {
            type
            urlHq
            urlLq
          }
          cta {
            url
          }
        }
      }
    }
  }
`;

export default query_pub;
