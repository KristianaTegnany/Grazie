import {gql} from "@apollo/client";

const query_cgv = gql`
  query {
    config {
      cgu {
        title
        textHtml
      }
    }
  }
`;

export default query_cgv;
