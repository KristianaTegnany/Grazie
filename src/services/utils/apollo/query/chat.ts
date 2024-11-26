import {gql} from "@apollo/client";

const query_chat = gql`
  query {
    user {
      id
    }
    messages {
      total
      items {
        id
        thread
        date {
          created
        }
        owner {
          id
          label
          isCs
        }
        contentHtml
      }
    }
    config {
      graziegigi {
        csLabel
      }
    }
    translation {
      chatGigi
      placeholderMessage
    }
  }
`;

export default query_chat;
