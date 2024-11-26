import {gql} from "@apollo/client";

const query_inspiration_datas = gql`
  query {
    user {
      id
    }
    translation {
      inspiration
      bySeason
      byDesire
      byRegion
      byLengthOfStay
      forPros
      filter
      filterAll
      filterSeason
      filterDesires
      filterDuration
      filterSaveButton
      filterRegion
    }
    config {
      inspiration {
        headerBg {
          type
          urlHq
          urlLq
        }
        headerDescription
        inspirationTutoImg {
          type
          urlHq
          urlLq
        }
        inspirationTutoDescription
        inspirationTutoBtn
      }
    }
    taxonomy {
      seasons {
        id
        label
        machineName
        media {
          type
          urlHq
          urlLq
        }
      }
      desires {
        id
        isPro
        label
        machineName
        media {
          type
          urlHq
          urlLq
        }
      }
      durations {
        id
        label
        machineName
        media {
          type
          urlHq
          urlLq
        }
      }
      inspirationPro {
        id
        label
        media {
          type
          urlHq
          urlLq
        }
      }
      regions {
        id
        label
        machineName
        media {
          type
          urlHq
          urlLq
        }
      }
    }
  }
`;

export const query_inspiration_detail = gql`
  query (
    $regions: [Int]
    $seasons: [Int]
    $inspirations: [Int]
    $desires: [Int]
    $durations: [Int]
  ) {
    user{
      id
    }
    inspirations(
      offset: 0
      limit: 10
      regions: $regions
      seasons: $seasons
      inspirations: $inspirations
      desires: $desires
      durations: $durations
    ) {
      total
      items {
        id
        title
        thumbnail {
          urlHq
          urlLq
        }
        summary
        isFavorite
      }
    }
  }
`;

export const query_inspiration_by_region = gql`
  query ($regions: [Int], $offset: Int) {
    user{
      id
    }
    inspirations(regions: $regions, offset: $offset) {
      total
      items {
        id
        title
        thumbnail {
          urlHq
          urlLq
        }
        region {
          label
          id
          media {
            type
            urlHq
            urlLq
          }
        }
      }
    }
  }
`;

export const query_inspiration_destination = gql`
  query ($id: ID!) {
    user{
      id
    }
    translation {
      destination
      inspirationSuggestionsSubTitle
    }
    inspiration(id: $id) {
      id
      title
      headerBg {
        urlHq
        urlLq
      }
      suggestionsTitle
      summary
      seasons {
        machineName
        label
      }
      desires {
        machineName
        label
      }
      profiles {
        machineName
        label
      }
      patrimoineMondial {
        machineName
        label
      }
      durations {
        machineName
        label
      }
      region {
        id
        machineName
        label
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
      isFavorite
    }
  }
`;

export default query_inspiration_datas;
