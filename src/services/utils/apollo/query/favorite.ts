import {gql} from "@apollo/client";

const query_favorite = gql`
  query {
    user {
      id
    }
    translation {
      myLists
      myListsDescription
      removeFavoriteConfirm
      removeFromAllLists
      removeFromAllListsConfirm
      favorites
      save
      discover
      createBtn
      addTofavorites
      nameYourList
      options
      changeList
      delete
      createList
      selectFavoritesList
      cancel
    }
    config {
      favorites {
        headerDescription
        intro
        headerBg {
          urlHq
          urlLq
          type
        }
      }
    }
  }
`;

const query_favorite_list = gql`
  query ($offset: Int) {
    user{
      id
    }
    favoritesLists(offset: $offset) {
      total
      items {
        id
        title
        entitiesTotal
        entitiesTotalLabel
        removeListConfirm
        thumbnail {
          urlLq
        }
      }
    }
  }
`;

const query_favorite_detail = gql`
  query ($id: ID!, $offset: Int) {
    user {
      id
    }
    favorites(listId: $id, offset: $offset) {
      total
      items {
        type
        id
        title
        region {
          id
          label
        }
        category {
          id
          label
        }
        summary
        thumbnail {
          urlHq
          urlLq
        }
      }
    }
  }
`;

export {query_favorite_list, query_favorite_detail};

export default query_favorite;
