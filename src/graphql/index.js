import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client/core";

export default new ApolloClient({
  link: createHttpLink({ uri: "https://countries.trevorblades.com/graphql" }),
  cache: new InMemoryCache(),
});
