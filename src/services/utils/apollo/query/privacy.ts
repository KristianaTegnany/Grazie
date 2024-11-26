import {gql} from '@apollo/client';

const query_privacy = gql`
  query {
    config {
      privacypolicy {
        title
        textHtml
      }
    }
  }
`;

export default query_privacy;
