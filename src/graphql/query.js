import gql from "graphql-tag";

export const initialData = gql`
  query initialData {
    continents {
      name
    }
    countries {
      name
      currencies
      capital
      continent {
        name
      }
      languages {
        name
      }
      subdivisions {
        name
      }
    }
  }
`;
