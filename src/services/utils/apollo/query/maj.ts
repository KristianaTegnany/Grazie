import {gql} from "@apollo/client";

const query_maj = gql`
  query($appVersion: String!, $systemName: String!) {
    appInfos(appVersion: $appVersion,systemName: $systemName) {
     isOutDated
    }
  } 
`;

export default query_maj;
