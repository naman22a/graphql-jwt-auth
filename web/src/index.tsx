import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
    ApolloProvider,
    ApolloLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ChakraProvider } from '@chakra-ui/react';
import { getAccessToken, setAccessToken } from './global';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode from 'jwt-decode';

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include'
});

const authLink = setContext((_, { headers }) => {
    const token = getAccessToken();
    return {
        headers: {
            ...headers,
            authorization: token ? `bearer ${token}` : ''
        }
    };
});

const tokenRefreshLink = new TokenRefreshLink({
    accessTokenField: 'accessToken',
    isTokenValidOrUndefined: () => {
        const accessToken = getAccessToken();

        if (!accessToken) {
            return true;
        }

        try {
            const { exp } = jwtDecode(accessToken) as { exp: number };

            if (Date.now() > exp * 1000) {
                return false;
            } else {
                return true;
            }
        } catch (error) {
            return false;
        }
    },
    fetchAccessToken: () => {
        return fetch('http://localhost:4000/auth/refresh_token', {
            method: 'POST',
            credentials: 'include'
        });
    },
    handleFetch: (accessToken: string) => {
        setAccessToken(accessToken);
    },
    handleError: (err: Error) => {
        console.error(err);
    }
});

const apolloClient = new ApolloClient({
    link: ApolloLink.from([tokenRefreshLink, authLink, httpLink]),
    cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <ApolloProvider client={apolloClient}>
            <ChakraProvider>
                <App />
            </ChakraProvider>
        </ApolloProvider>
    </React.StrictMode>
);
