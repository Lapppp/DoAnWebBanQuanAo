import React, { useEffect, useState } from "react";
import { Button, Card, Form, Table } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const Color = () => {
  const [colors, setColors] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [colorData, setColorData] = useState({
    name: "",
  });

  useEffect(() => {
    fetchColors();
  }, []);
// danh sách colors
  const fetchColors = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/colors");
      setColors(response.data.colors);
    } catch (error) {
      console.error(error.response.data.error);
    }
  };
// xử lý lưu 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setColorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
// xử lý sửa 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/colors", colorData);
      console.log(response.data.message);
      fetchColors(); // Cập nhật lại danh sách màu sau khi thêm mới
      setColorData({
        name: "",
      });
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    const editedColor = colors[index];
    setColorData({
      name: editedColor.name,
    });
  };

  const handleEditSubmit = async (index) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/colors/${colors[index].id}`,
        colorData
      );
      console.log(response.data.message);
      setEditingIndex(null);
      fetchColors(); // Cập nhật lại danh sách màu sau khi sửa
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/colors/${id}`);
      console.log(response.data.message);
      fetchColors(); // Cập nhật lại danh sách màu sau khi xóa
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  return (
    <>
      <div>
        <Card border="primary" style={{ width: "100%" }}>
          <Card.Header>COLOR</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="">
                <Form.Label>Tên Màu</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={colorData.name}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Thêm Màu
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
                <th>Tên Màu</th>
                <th>Trạng Thái</th>
                <th>Chức Năng</th>
              </tr>
            </thead>
            <tbody>
              {colors?.map((color, index) => (
                <tr key={index}>
                  <td>
                    {index === editingIndex ? (
                      <Form.Control
                        type="text"
                        name="name"
                        value={colorData.name}
                        onChange={handleChange}
                      />
                    ) : (
                      color.name
                    )}
                  </td>
                  <td>{color.status}</td>
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
                          onClick={() => handleDelete(color.id)}
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

export default Color;
