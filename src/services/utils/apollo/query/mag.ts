import {gql} from '@apollo/client';

const query_mag = gql`
  query {
    user {
      id
    }
    translation {
      advertisment
      theMag
      filterAll
      publishedOn
      discoverMoreGigisFavorites
      toContact
      ingredients
      inKitchen
      discoverOtherGigiSecrets
      italy
      gigiGreen
      fattoMano
    }
    config {
      mag {
        articlesTitle
        headerBg {
          type
          urlHq
          urlLq
        }
        headerDescription
        storiesTitle
        storiesTutoImg {
          type
          urlHq
          urlLq
        }
        storiesTutoTitle
        storiesTutoDescription
        storiesTutoBtn
        gigiGreenTitle
        gigiGreenDescription
        fattoManoTitle
        fattoManoDescription
      }
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

export const query_mag_pub = gql`
  query ($placement: String!, $category: Int) {
    adInserts(placement: $placement, category: $category) {
      items {
        position
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

export default query_mag;
