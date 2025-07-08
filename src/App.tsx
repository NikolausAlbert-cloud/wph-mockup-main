import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';

import { SignUpForm_page } from './pages/SignUpForm_page';
import { SignInForm_page } from './pages/SignInForm_page';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Home } from './pages/Home';
import { Navbar } from './components/navbar/Navbar';
import { UserProfile_page } from './pages/UserProfile_page';
import { Posts } from './pages/Posts';
import { NavbarPosts } from './components/navbar/NavbarPosts';
import { UserPostBlog } from './pages/UserPostBlog';
import { useAuth } from './hooks/useAuth';
import { PublicPost } from './pages/PublicPost';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  )
}

const AppContent = () => {
  const noNavbarPaths = ['/auth/register', '/auth/login', 'NotFound'];
  const navbarPosts = ["/posts"];
  const location = useLocation(); 
  const showNavbar = !noNavbarPaths.includes(location.pathname);
  const showNavbarPosts = navbarPosts.includes(location.pathname);

  const ProtectedRoute = ({ children }: any) => {
    const { isToken, loading } = useAuth();
    
    if(loading) {
      return <div>Loading authentication...</div>
    }
    if (!isToken) {
      return <Navigate to="/auth/login" replace/>;
    }
    return children ? children : <Outlet />;
  }
  
  return (
    <>
      {showNavbar && !showNavbarPosts &&<Navbar />}
      {showNavbarPosts && <NavbarPosts />}
      <Routes>
        <Route path="/auth/register" element={<SignUpForm_page />} />
        <Route path="/auth/login" element={<SignInForm_page />} />
        <Route path="/userProfile" element={<ProtectedRoute><UserProfile_page /></ProtectedRoute>} />
        <Route path="/posts/recommended" element={<PublicPost />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/my-posts" element={<ProtectedRoute><UserPostBlog /></ProtectedRoute>} />
        <Route path="/" element={<Home />} />
        {/* <Route path="*" element={<NotFound />} /> */}
        {/* Add more routes as needed */}
      </Routes>
    </>

  )
}

export default App