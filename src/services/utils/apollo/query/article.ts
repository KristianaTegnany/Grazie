import {gql} from "@apollo/client";

const query_article = gql`
  query ($id: ID!) {
    user {
      id
    }
    article(id: $id) {
      id
      title
      author {
        id
        label
      }
      created
      category {
        id
        label
      }
      region {
        id
        label
      }
      headerBg {
        urlHq
        urlLq
      }
      isGreen
      isHandmade
      isFavorite
      isPublic
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
        ... on ParagraphMedia {
          media {
            type
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
`;

export const query_article_favorite = gql`
  query ($id: ID!) {
    article(id: $id) {
      isFavorite
    }
  }
`;

export const query_articles_suggestions = gql`
  query ($category: Int, $id: [Int]) {
    articles(offset: 0, limit: 5, category: $category, excludeIds: $id) {
      total
      items {
        id
        title
        category {
          id
          label
        }
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

export default query_article;
