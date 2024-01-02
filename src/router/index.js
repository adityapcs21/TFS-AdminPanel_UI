import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./protectedRoutes";
import routeNames from "./routeNames";
import { Suspense, lazy } from "react";
import Loader from "../common/loader/index.js";

const Login = lazy(() => import('../pages/auth/login.js'));
const Blog = lazy(() => import('../pages/blog'));
const UserManagement = lazy(() => import('../pages/user-management'))

const Router = () => {

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path={routeNames.LOGIN} element={<Login />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={< UserManagement />} />
          <Route path={routeNames.BLOG} element={< Blog />} />
        </Route>
        {/* <Route path={routeNames.ERROR} element={<ErrorPage />} /> */}
      </Routes>
    </Suspense>
  )
}

export default Router;