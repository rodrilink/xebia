import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    link: new HttpLink({
        uri: "https://api.github.com/graphql",
        headers: {
            authorization: `bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
    }),
    cache: new InMemoryCache()
});

export default client;