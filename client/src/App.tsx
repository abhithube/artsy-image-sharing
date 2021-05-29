import { Box, ChakraProvider, Container, CSSReset } from '@chakra-ui/react';
import '@fontsource/inter';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import AuthContextProvider from './lib/context/AuthContext';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PostPage from './pages/PostPage';
import PostsPage from './pages/PostsPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import UploadPage from './pages/UploadPage';
import theme from './theme';

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
