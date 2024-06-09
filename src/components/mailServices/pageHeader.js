import React, { Fragment } from 'react';
import { ButtonGroup, Dropdown, Button, Breadcrumb } from 'react-bootstrap';

const Pageheader = (props) => {
 const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

 return (
  <Fragment>
   <div className="breadcrumb-header justify-content-between">
    <div className="my-auto">
     <h4 className="page-title">{props.titles}</h4>
     <Breadcrumb as="ol" className="breadcrumb">
      <Breadcrumb.Item as="li" className="breadcrumb-item">
       <div as="a">{props.titles}</div>
      </Breadcrumb.Item>
      <Breadcrumb.Item as="li" className="breadcrumb-item" active>{props.active}</Breadcrumb.Item>
     </Breadcrumb>

    </div>
    <div className="d-sm-flex">
     <div className="d-flex my-xl-auto right-content">
      <div className="pe-1 mb-xl-0">
       <Button variant='info' className="btn-icon me-2 btn-b"><i className="mdi mdi-filter-variant"></i></Button>
      </div>
      <div className="pe-1 mb-xl-0">
       <Button variant='danger' className="btn-icon me-2"><i className="mdi mdi-star"></i></Button>
      </div>
      <div className="pe-1 mb-xl-0">
       <Button variant='warning' className="btn-icon me-2"><i className="mdi mdi-refresh"></i></Button>
      </div>
     </div>
     <div className="mb-xl-0 my-xl-auto right-content">
      <Dropdown as={ButtonGroup} placement="bottom-end" id="bg-vertical-dropdown-1">
       <Button variant="primary">{new Date().getDate()} {months[new Date().getMonth()]} {new Date().getFullYear()}</Button>
       <Dropdown.Toggle split variant="primary" id="dropdown-split-basic" />
       <Dropdown.Menu>
        <Dropdown.Item eventKey="1">2018</Dropdown.Item>
        <Dropdown.Item eventKey="2">2019</Dropdown.Item>
        <Dropdown.Item eventKey="1">2020</Dropdown.Item>
        <Dropdown.Item eventKey="2">2021</Dropdown.Item>
       </Dropdown.Menu>
      </Dropdown>
     </div>
    </div>
   </div>
  </Fragment>
 )
};

export default Pageheader;
