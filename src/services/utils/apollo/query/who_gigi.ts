import {gql} from "@apollo/client";

const query_who_gigi = gql`
  query {
    config {
      whoisgigi {
        headerBg {
          urlHq
          urlLq
        }
        introTitle
        casaGigiTitle
        gigiGreenTitle
        contactTitle
        customerServiceLabel
        customerServiceMail
        pressMagLabel
        pressMagMail
        partnersLabel
        partnersMail
        website
        facebookLink
        instagramLink
        introTextHtml
        casaGigiTextHtml
        gigiGreenTextHtml
        imageLaCasaGigi {
          urlHq
          urlLq
        }
        imageGigiGreen {
          urlHq
          urlLq
        }
        iconLaCasaGigi {
          urlHq
          urlLq
        }
        iconGigiGreen {
          urlHq
          urlLq
        }
        fattoManoTextHtml
        iconFattoMano {
          urlHq
          urlLq
        }
      }
    }
  }
`;

export default query_who_gigi;
