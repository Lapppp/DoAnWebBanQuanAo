import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const Size = () => {
  const [sizeData, setSizeData] = useState({
    name: "",
    height: "",
    weight: "",
  });
  
  const [sizes, setSizes] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    fetchSizes();
  }, []);
  const fetchSizes = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/sizes");
      setSizes(response.data.sizes);
    } catch (error) {
      console.error(error.response.data.error);
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSizeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/sizes", sizeData);
      console.log(response.data.message); // Log success message
      setSizes([...sizes, response.data.size]); // Update sizes array with the newly added size
      await fetchSizes();
      setSizeData({
        name: "",
        height: "",
        weight: "",
      }); // Clear the form after submission
    } catch (error) {
      console.error(error.response.data.error); // Log error message
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    const editedSize = sizes[index];
    setSizeData({
      name: editedSize.name,
      height: editedSize.height,
      weight: editedSize.weight,
    });
  };

  const handleEditSubmit = async (index) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/sizes/${sizes[index].id}`,
        sizeData
      );
      console.log(response.data.message); // Log success message
      await fetchSizes();
      setEditingIndex(null); // Clear editing state
    } catch (error) {
      console.error(error.response.data.error); // Log error message
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/sizes/${id}`);
      console.log(response.data.message);
      fetchSizes(); // Cập nhật lại danh sách màu sau khi xóa
    } catch (error) {
      console.error(error.response.data.error);
    }
  };
  return (
    <>
      <div>
        <Card border="primary" style={{ width: "100%" }}>
          <Card.Header>SIZE</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formSize">
                <Form.Label>Tên kích thước</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  id="name"
                  value={sizeData.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formHeight">
                    <Form.Label>Chiều Cao</Form.Label>
                    <Form.Control
                      type="text"
                      name="height"
                      id="height"
                      value={sizeData.height}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formWeight">
                    <Form.Label>Chiều rộng</Form.Label>
                    <Form.Control
                      type="text"
                      name="weight"
                      id="weight"
                      value={sizeData.weight}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="primary" type="submit">
                Thêm kích thước
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
      {/* danh sách */}
      <div>
        <div className=" mt-5">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Tên kích thước </th>
                <th> Chiều Cao </th>
                <th>Chiều Rộng</th>
                <th>Trạng Thái</th>
                <th>Chức Năng</th>
              </tr>
            </thead>
            <tbody>
             
            {sizes?.map((size, index) => (
  <tr key={index}>
    <td>
      {index === editingIndex ? (
        <Form.Control
          type="text"
          name="name"
          value={sizeData.name}
          onChange={handleChange}
        />
      ) : (
        size?.name // Kiểm tra xem size có tồn tại không
      )}
    </td>
    <td>
      {index === editingIndex ? (
        <Form.Control
          type="text"
          name="height"
          value={sizeData.height}
          onChange={handleChange}
        />
      ) : (
        size?.height
      )}
    </td>
    <td>
      {index === editingIndex ? (
        <Form.Control
          type="text"
          name="weight"
          value={sizeData.weight}
          onChange={handleChange}
        />
      ) : (
        size?.weight
      )}
    </td>
    <td>{size?.status}</td>
    <td>
      {index === editingIndex ? (
        <>
          <Button
            variant="success"
            style={{ marginRight: "5px", marginBottom: "5px" }}
            onClick={() => handleEditSubmit(index)}
          >
            Lưu
          </Button>
          <Button
            variant="secondary"
            style={{ marginRight: "5px", marginBottom: "5px" }}
            onClick={() => setEditingIndex(null)}
          >
            Hủy
          </Button>
        </>
      ) : (
        <div>
          <Button
            variant="warning"
            style={{ marginRight: "5px", marginBottom: "5px" }}
            onClick={() => handleEdit(index)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button
            variant="danger"
            style={{ marginRight: "5px", marginBottom: "5px" }}
            onClick={() => handleDelete(size?.id)} // Kiểm tra xem size có tồn tại không
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </div>
      )}
    </td>
  </tr>
))}

            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Size;
