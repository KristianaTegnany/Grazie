import {gql} from '@apollo/client';

const query_articles = gql`
  query ($offset: Int, $category: Int) {
    user {
      id
    }
    articles(offset: $offset, category: $category) {
      total
      items {
        id
        title
        category {
          id
          label
        }
        hasVideo
        region {
          id
          label
        }
        thumbnail {
          urlHq
          urlLq
        }
        summary
        isFavorite
        isGreen
        isHandmade
        isPublic
      }
    }
  }
`;

export default query_articles;
