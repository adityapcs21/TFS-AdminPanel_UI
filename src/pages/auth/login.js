import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { Imagesdata } from '../../common/commonimages';

const SignIn = () => {
 return (
  <div>
   <div className="">
    <Row className="no-gutter">
     <Col md={6} lg={6} xl={7} className="d-none d-md-flex bg-primary-transparent">
      <Row className="wd-100p mx-auto text-center">
       <Col md={12} lg={12} xl={12} className="my-auto mx-auto wd-100p">
        <img src="https://images.unsplash.com/photo-1529539795054-3c162aab037a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="my-auto ht-xl-100p wd-md-100p wd-xl-100p mx-auto" alt="logo" />
       </Col>
      </Row>
     </Col>
     <Col md={6} lg={6} xl={5} className="bg-white py-4">
      <div className="login d-flex align-items-center py-2 px-4">
       <Container className="p-0">
        <Row>
         <Col md={10} lg={10} xl={9} className="mx-auto">
          <div className="card-sigin">
           <div className="mb-5 d-flex">

            {/* <img src="../src/assets/img/photos/8.jpg" className="sign-favicon-a ht-40" alt="logo" />
            <img src="../src/assets/img/photos/8.jpg" className="sign-favicon-b ht-40" alt="logo" /> */}

            <h1 className="main-logo1 ms-1 me-0 my-auto tx-28">T<span>F</span>S</h1>
           </div>
           <div className="card-sigin">
            <div className="main-signup-header">
             <h2>Welcome back!</h2>
             <h5 className="fw-semibold mb-4">Please sign in to continue.</h5>
             <Form action="#">
              <Form.Group>
               <Form.Label className="mb-2">Email</Form.Label>
               <Form.Control className="mb-3" placeholder="Enter your email" type="text" />
              </Form.Group>
              <Form.Group>
               <Form.Label className="mb-2">Password</Form.Label>
               <Form.Control className="mb-3" placeholder="Enter your password" type="password" />
              </Form.Group>
              <Button className="btn-main-primary btn-block">Sign In</Button>
              <Row className="row-xs social-icons">
               <Col sm={6} className="">
                <Button className="btn-block"><i className="fab fa-facebook-f"></i> Signup with Facebook</Button>
               </Col>
               <Col sm={6} className="mg-t-10 mg-sm-t-0">
                <Button className="btn-info btn-block btn-b"><i className="fab fa-twitter"></i> Signup with Twitter</Button>
               </Col>
              </Row>
             </Form>
             <div className="main-signin-footer mt-5">
              <p>
               Forgot password?</p>
              <p>Don't have an account? Create an Account</p>
             </div>
            </div>
           </div>
          </div>
         </Col>
        </Row>
       </Container>
      </div>
     </Col>
    </Row>
   </div>
  </div>
 )
};


export default SignIn;
