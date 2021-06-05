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

function App() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
  });

  return (
    <div>
      <Router>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <Navbar />
            <main className="max-w-[80%] mx-auto mt-16 pt-8 pb-16">
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
                <ProtectedRoute path="/login" component={LoginPage} inverted />
                <ProtectedRoute path="/upload" component={UploadPage} />
                <Route path="*" render={() => '404 Not Found'} />
              </Switch>
            </main>
          </AuthContextProvider>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
      </Router>
    </div>
  );
}

export default App;
