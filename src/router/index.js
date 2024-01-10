import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./protectedRoutes";
import routeNames from "./routeNames";
import { Suspense, lazy } from "react";
import Loader from "../common/loader/index.js";
import ContactUs from "../pages/contact-us/index.js";


const Login = lazy(() => import('../pages/auth/login.js'));
const Blog = lazy(() => import('../pages/blog'));
const UserManagement = lazy(() => import('../pages/user-management'));
const AboutUs = lazy(() => import('../pages/about-us/index'));
const Dashboard = lazy(() => import("../pages/dashboard/index"))
const Gallery = lazy(() => import('../pages/gallery'))

const Router = () => {
  console.log("router")

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path={routeNames.LOGIN} element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route index element={< Dashboard />} />
          <Route path={routeNames.BLOG} element={< Blog />} />
          <Route path={routeNames.USERMANAGEMENT} element={<UserManagement />} />
          <Route path={routeNames.ABOUTUS} element={< AboutUs />} />
          <Route path={routeNames.CONTACTUS} element={< ContactUs />} />
          <Route path={routeNames.GALLERY} element={< Gallery />} />
        </Route>
        {/* <Route path={routeNames.ERROR} element={<ErrorPage />} /> */}
      </Routes>
    </Suspense>
  )
}

export default Router;