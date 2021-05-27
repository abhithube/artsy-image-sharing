import {
  Box,
  ChakraProvider,
  Container,
  CSSReset,
  Spinner,
} from '@chakra-ui/react';
import '@fontsource/inter';
import { GraphQLClient } from 'graphql-request';
import { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import AuthContextProvider from './context/AuthContext';
import theme from './theme';

const AboutPage = lazy(() => import('./pages/AboutPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const PostPage = lazy(() => import('./pages/PostPage'));
const PostsPage = lazy(() => import('./pages/PostsPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const UploadPage = lazy(() => import('./pages/UploadPage'));

export const graphQLClient = new GraphQLClient(
  `${process.env.SERVER_URL}/graphql`,
  { credentials: 'include' }
);

function App() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
  });

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Box minH="100%">
        <Router>
          <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
              <Navbar />
              <Container
                as="main"
                maxW="80%"
                mt={16}
                pt={8}
                pb={16}
                h="calc(100% - 128px)"
              >
                <Suspense fallback={<Spinner speed="1s" />}>
                  <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/posts" component={PostsPage} />
                    <Route path="/posts/:id" component={PostPage} />
                    <Route path="/users/:id" component={ProfilePage} />
                    <Route path="/about" component={AboutPage} />
                    <ProtectedRoute
                      path="/register"
                      component={RegisterPage}
                      inverted
                    />
                    <ProtectedRoute
                      path="/login"
                      component={LoginPage}
                      inverted
                    />
                    <ProtectedRoute path="/upload" component={UploadPage} />
                    <Route path="*" render={() => '404 Not Found'} />
                  </Switch>
                </Suspense>
              </Container>
            </AuthContextProvider>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          </QueryClientProvider>
        </Router>
      </Box>
    </ChakraProvider>
  );
}

export default App;
