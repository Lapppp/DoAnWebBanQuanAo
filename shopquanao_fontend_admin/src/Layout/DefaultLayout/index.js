import React from "react";
import Header from "./Header";
import Aside from "./Aside";
import { Col, Row } from "react-bootstrap";

function DefaultLayout({ children }) {
  return (
    <div className="wrapper">
      <Row>
        <Col md={2}>
          {/* Aside Component */}
          <Aside />
        </Col>

        <Col md={12}>
          {/* Header Component */}
          <Header />
        </Col>
      </Row>

      <Row>

        {/* <Col md={{ span: 8, offset: 2 }}> */}

        <Col md={{ span: 8, offset:3}}>

          {/* Main Content Area */}
          <div className="content">{children}</div>
        </Col>
      </Row>
    </div>
  );
}

export default DefaultLayout;
