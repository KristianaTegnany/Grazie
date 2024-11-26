import {gql} from '@apollo/client';

const query_addresses_datas = gql`
  query {
    user {
      id
    }
    config {
      address {
        headerBg {
          urlHq
          urlLq
        }
        tutoImage {
          urlHq
          urlLq
        }
        tutoDescription
      }
    }
    taxonomy {
      regions {
        id
        label
        media {
          urlHq
          urlLq
        }
      }
      adresscategories {
        id
        label
        media {
          urlHq
          urlLq
        }
        partnerTypes {
          id
          label
        }
        icon {
          id
          urlHq
          urlLq
        }
      }
      seasons {
        id
        label
        media {
          urlHq
          urlLq
        }
      }
      desires {
        id
        isPro
        label
        media {
          urlHq
          urlLq
        }
      }
    }
    translation {
      details
      addressesSuggestionsTitle
      addressesSuggestionsSubTitle

      addressesListTitle
      addressesListContentTitle
      addressesListText
      filter
      filterDestination
      addressesFilterDestinationText
      filterDesires
      filterSeason
      filterSaveButton
      addressesListHeaderDescription
      addressesTutoTitle
      addressesTutoText
      addressesTutoButtonLabel

      myNotebooks
      noNotebookLabel
      noNotebookDescription
      gigiNotebooks
      allSecretsAddressesByDestination
      exploreYourDestinationNotebooks
    }
  }
`;

export const query_addresses_detail = gql`
  query (
    $offset: Int
    $regions: [Int]
    $desires: [Int]
    $seasons: [Int]
    $categories: [Int]
    $partnerTypes: [Int]
  ) {
    user {
      id
    }
    addresses(
      offset: $offset
      regions: $regions
      desires: $desires
      seasons: $seasons
      categories: $categories
      partnerTypes: $partnerTypes
    ) {
      total
      items {
        id
        category {
          label
          media {
            urlHq
            urlLq
          }
        }
        partnerTypes {
          id
          label
        }
        thumbnail {
          urlHq
          urlLq
        }
        title
        summary
        description
        isFavorite
        isPublic
      }
    }
  }
`;

export const query_addresses_card = gql`
  query ($id: ID!) {
    user {
      id
    }
    address(id: $id) {
      id
      category {
        id
        label
      }
      isFavorite
      sector
      summary
      title
      enseigne
      description
      region {
        id
        label
      }
      partnerTypes {
        id
        label
      }
      latitude
      longitude
      thumbnail {
        urlHq
        urlLq
      }
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
        ... on ParagraphGigiWink {
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
        ... on ParagraphMediaMultiple {
          medias {
            label
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
        ... on ParagraphProgramme {
          title
          programmesUnit {
            title
            textHtml
          }
        }
        ... on ParagraphPartnerSuggestion {
          title
          text
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

export const query_address_favorite = gql`
  query ($id: ID!) {
    address(id: $id) {
      isFavorite
    }
  }
`;

export const query_search_address = gql`
  query ($keywords: String!) {
    user{
      id
    }
    search(keywords: $keywords) {
      total
      items {
        type
        typeId
        title
        body
        media {
          id
          urlHq
          urlLq
        }
      }
    }
  }
`;

export default query_addresses_datas;
