import React from 'react'
import Header from './header';
import Sidebar from './sidebar';
import { Outlet } from 'react-router-dom';
import Footer from './footer';
// import BacktoTop from '../backtotop';

export default function Layout() {
 return (
  <div className='horizontalMenucontainer'>
   <div className="page">
    <Header />
    <div className="sticky" style={{ paddingTop: "-63px" }}>
     <Sidebar />
    </div>
    <div className="jumps-prevent" style={{ paddingTop: "63px" }}></div>
    <div className="main-content app-content" >
     <div className="main-container container-fluid" >
      <div className='side-app'>
       <Outlet />
      </div>
     </div>
    </div>
    <Footer />
   </div>
   {/* <BacktoTop /> */}
  </div>
 )
}
