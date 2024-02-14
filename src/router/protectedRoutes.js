import { Navigate } from 'react-router-dom'
import Layout from '../common/layout';
import routeNames from './routeNames';

const ProtectedRoute = () => {
 const isAuthenticated = localStorage.getItem('token');

 return isAuthenticated ? (
  <Layout>
   <Navigate to={routeNames.DASHBOARD} replace />
  </Layout>
 ) : (
  <Navigate to={routeNames.LOGIN} replace />
 );
};

export default ProtectedRoute;
