import {gql} from "@apollo/client";

const query_map = gql`
  query {
    config {
      map {
        thumbnail {
          alt
          label
          urlHq
          urlLq
        }
        textHtml
      }
    }
    translation {
      myMapTutoTitle
      myMapTutoButtonLabel
      filters
      filterFavorites
      filterAdressCategories
      filterSuggestions
    }
  }
`;

export const query_map_favorite = gql`
  query {
    user {
      id
    }
    favorites(limit: -1, nodeTypes: ["fiche_partenaires"]) {
      total
      items {
        id
      }
    }
  }
`;

export const query_map_address = gql`
  query ($id: ID!) {
    user {
      id
    }
    address(id: $id) {
      id
      category {
        label
      }
      thumbnail {
        urlLq
      }
      title
      summary
      isFavorite
    }
  }
`;

export const query_map_addresses = gql`
  query (
    $regions: [Int]
    $categories: [Int]
    $isFavorite: Boolean
    $latitude: Float
    $longitude: Float
    $offset: Int
  ) {
    user {
      id
    }
    addresses(
      regions: $regions
      categories: $categories
      limit: 100
      offset: $offset
      isFavorite: $isFavorite
      aroundPoint: {latitude: $latitude, longitude: $longitude}
    ) {
      total
      items {
        id
        addressCategory {
          id
          label
          icon {
            urlLq
          }
        }
        thumbnail {
          urlHq
          urlLq
        }
        title
        summary
        isFavorite
        latitude
        longitude
      }
    }
  }
`;

export default query_map;
