import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

const Image = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/images")
      .then((res) =>{setImages(res.data.images) ;console.log( res.data.images)})
      .catch((error) =>console.log( error.response.message));
  }, []);
  return (
    <>
      <Row>
        <Col md={12}>
          <Card border="primary" style={{ width: "100%" }}>
            <Card.Header>IMAGE</Card.Header>
            <Card.Body>
              <Form>
                d
                <Form.Group className="mb-3" controlId="">
                  <Form.Label>Path</Form.Label>
                  <Form.Control type="text" name="name" id="" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label>Image</Form.Label>
                  <Form.Control type="file" name="name" id="" multiple />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Thêm
                </Button>
              </Form>
            </Card.Body>
          </Card>0
        </Col>
      </Row>



    <div>

    <Row>
      {

        images.map((image , index)=>(
          <Col md={2} key={index} >
            <img  style={{width:"150px" , height:"200px"}}src ={`http://localhost:8000/upload/images/${image.path}`} alt="Ảnh lỗi"/>
          </Col>

      ))}
      
    </Row>
    </div>
    </>
  );
};

export default Image;
