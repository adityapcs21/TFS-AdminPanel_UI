import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./protectedRoutes";
import routeNames from "./routeNames";
import { Suspense, lazy } from "react";
import Loader from "../common/loader/index.js";
import ContactUs from "../pages/contact-us/index.js";
import SubscribedEmail from "../pages/subscribed-email/index.js";
import VideoGallery from "../pages/gallery/video-gallery/index.js";
import VideoGallery2 from "../pages/gallery/video-gallery/videoGallery.js";
import ChangePassword from "../pages/auth/changePassword.js";
import GalleryComponent from "../pages/gallery/video-gallery/videoGallery.js";


const Login = lazy(() => import('../pages/auth/login.js'));
const Blog = lazy(() => import('../pages/blog'));
const UserManagement = lazy(() => import('../pages/user-management'));
const AboutUs = lazy(() => import('../pages/about-us/index'));
const Dashboard = lazy(() => import("../pages/dashboard/index"))
const ImageGallery = lazy(() => import('../pages/gallery/image-gallery/index'))

const Router = () => {

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path={routeNames.LOGIN} element={<Login />} />
        <Route path={routeNames.CHNAGEPASSWORD} element={<ChangePassword />} />
        <Route element={<ProtectedRoute />}>
          <Route index element={< Dashboard />} />
          <Route path={routeNames.BLOG} element={< Blog />} />
          <Route path={routeNames.USERMANAGEMENT} element={<UserManagement />} />
          <Route path={routeNames.SUBSCRIBEDEMAIL} element={<SubscribedEmail />} />
          <Route path={routeNames.ABOUTUS} element={< AboutUs />} />
          <Route path={routeNames.CONTACTUS} element={< ContactUs />} />
          <Route path={routeNames.IMAGEGALLERY} element={< ImageGallery />} />
          <Route path={routeNames.VIDEOGALLERY} element={<GalleryComponent />} />
        </Route>
        {/* <Route path={routeNames.ERROR} element={<ErrorPage />} /> */}
      </Routes>
    </Suspense>
  )
}

export default Router;