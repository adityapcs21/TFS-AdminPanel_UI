import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./protectedRoutes";
import routeNames from "./routeNames";
import { Suspense, lazy } from "react";
import Loader from "../common/loader/index.js";
import ContactUs from "../pages/contact-us/index.js";
import SubscribedEmail from "../pages/subscribed-email/index.js";
import VideoGallery from "../pages/gallery/video-gallery/index.js";
import ChangePassword from "../pages/auth/changePassword.js";
import Banner from "../pages/banner/index.js";
import Students from "../pages/students/index.js";
import RenewPendingStudents from "../pages/renew-pending-students/index.js";
import BatchUpdateRequest from "../pages/batch-update-request/index.js";
import UpdateProfile from "../pages/update-profile/index.js";
import ManageSubscription from "../pages/manage-subscription/index.js";
import ManagePayment from "../pages/manage-payment/index.js";
import AssignBuddy from "../pages/assign-buddy/index.js";
import MyAssignedUser from "../pages/my-assigned-user/index.js";
import Events from "../pages/events/index.js";
// import CustomerQuery from "../pages/customer-query/index.js";


const Login = lazy(() => import('../pages/auth/login.js'));
const Blog = lazy(() => import('../pages/blog'));
const UserManagement = lazy(() => import('../pages/user-management'));
const AboutUs = lazy(() => import('../pages/about-us/index'));
const Dashboard = lazy(() => import("../pages/dashboard/index"))
const ImageGallery = lazy(() => import('../pages/gallery/image-gallery/index'))
const CustomerQuery = lazy(() => import('../pages/customer-query'))


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
          <Route path={routeNames.MANAGESUBSCRIPTION} element={<ManageSubscription />} />
          <Route path={routeNames.MANAGEPAYMENT} element={<ManagePayment />} />
          <Route path={routeNames.SUBSCRIBEDEMAIL} element={<SubscribedEmail />} />
          <Route path={routeNames.CUSTOMERQUERY} element={<CustomerQuery />} />
          <Route path={routeNames.STUDENTS} element={<Students />} />
          <Route path={routeNames.STUDENTBATCHCHANGE} element={<BatchUpdateRequest />} />
          <Route path={routeNames.UPDATEPROFILE} element={<UpdateProfile />} />
          <Route path={routeNames.RENEWPENDINGSTUDENTS} element={<RenewPendingStudents />} />
          <Route path={routeNames.ASSIGNBUDDY} element={<AssignBuddy />} />
          <Route path={routeNames.MYASSIGNEDUSER} element={<MyAssignedUser />} />
          <Route path={routeNames.ABOUTUS} element={< AboutUs />} />
          <Route path={routeNames.CONTACTUS} element={< ContactUs />} />
          <Route path={routeNames.IMAGEGALLERY} element={< ImageGallery />} />
          <Route path={routeNames.VIDEOGALLERY} element={<VideoGallery />} />
          <Route path={routeNames.BANNER} element={<Banner />} />
          <Route path={routeNames.EVENTS} element={<Events />} />
        </Route>
        {/* <Route path={routeNames.ERROR} element={<ErrorPage />} /> */}
      </Routes>
    </Suspense>
  )
}

export default Router;