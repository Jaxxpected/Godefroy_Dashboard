import '../styles/globals.css'

import { ApolloProvider, ApolloLink } from '@apollo/client';
import client from "../apollo-client";

// create the authentication header
const authLink = new ApolloLink((operation, forward) => {

  // get the authentication token from local storage if it exists
  const token = window.localStorage.getItem('token');

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
