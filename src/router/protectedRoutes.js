import { Navigate } from 'react-router-dom'
import Layout from '../common/layout';

const ProtectedRoute = () => {
 // Check authentication status (replace this with your actual authentication check)
 const isAuthenticated = localStorage.getItem('token');
 // console.log("isAuthenticated", isAuthenticated)
 return isAuthenticated ? (
  <Layout>
   <Navigate to="/" replace />
  </Layout>
 ) : (
  <Navigate to="/login" replace />
 );
};

export default ProtectedRoute;
