import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

const client = new ApolloClient({
  uri: process.env.SERVER_URL,

  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: {
            keyArgs: ['userId'],
            merge: (existing = [], incoming = []) => [...existing, ...incoming],
          },
          comments: {
            keyArgs: ['postId'],
            merge: (existing = [], incoming = []) => [...existing, ...incoming],
          },
          favorites: {
            keyArgs: ['userId'],
            merge: (existing = [], incoming = []) => [...existing, ...incoming],
          },
        },
      },
    },
  }),
});

export default function App() {
  return (
    <div>
      <ApolloProvider client={client}>
        <AuthContextProvider>
          <BrowserRouter>
            <Navbar />
            <main className="max-w-[80%] mx-auto mt-16 pt-8 pb-16">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/posts" element={<PostsPage />} />
                <Route path="/posts/:id" element={<PostPage />} />
                <Route path="/users/:id" element={<ProfilePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route
                  path="/register"
                  element={
                    <ProtectedRoute inverted>
                      <RegisterPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <ProtectedRoute inverted>
                      <LoginPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/upload"
                  element={
                    <ProtectedRoute>
                      <UploadPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={() => '404 Not Found'} />
              </Routes>
            </main>
          </BrowserRouter>
        </AuthContextProvider>
      </ApolloProvider>
    </div>
  );
}
