import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Route, Routes } from 'react-router-dom';
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
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
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
        </AuthContextProvider>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </div>
  );
}

export default App;
