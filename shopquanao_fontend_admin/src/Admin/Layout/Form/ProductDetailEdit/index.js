import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

const ProductDetailEdit = () => {
  const { id } = useParams();

  const [pDetail, setPdetail] = useState({
    quantity: "",
    price: "",
    color_id: null,
    size_ids: [],
    product_id: id,
    path: [],
  });
  const [avatars, setAvatars] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);

  useEffect(() => {
    try {
      // Fetch sizes
      axios
        .get("http://localhost:8000/api/sizes")
        .then((res) => setSize(res.data.sizes))
        .catch((error) => console.log(error.response.message));

      // Fetch colors
      axios
        .get("http://localhost:8000/api/colors")
        .then((res) => setColor(res.data.colors))
        .catch((error) => console.log(error.response.message));
    } catch (error) {}
  }, []);

  useEffect(() => {
    try {
      // Fetch product details for editing
      axios
        .get(`http://localhost:8000/api/productdetailedit/${id}`)
        .then((res) => setPdetail(res.data.productdetail))
        .catch((error) => console.log(error.response.message));
    } catch (error) {}
  }, [id]);

  const handleImage = (e) => {
    const images = e.target.files;
    const newAvatars = Array.from(images).map((image) => ({
      file: image,
      preview: URL.createObjectURL(image),
      name: image.name,
    }));

    setAvatars((prevAvatars) => [...prevAvatars, ...newAvatars]);
  };

  const handleChange = (e) => {
    const { name, value, checked, files } = e.target;

    if (name === "color_id") {
      setPdetail((prevPdetail) => ({ ...prevPdetail, [name]: value }));
    } else if (name === "size_id") {
      setPdetail((prevPdetail) => ({
        ...prevPdetail,
        size_ids: checked
          ? [...prevPdetail.size_ids, value]
          : prevPdetail.size_ids.filter((id) => id !== value),
      }));
    } else if (name === "path") {
      const newFiles = Array.from(files).map((file) => file);
      setPdetail((prevP) => ({ ...prevP, [name]: newFiles }));
    } else {
      setPdetail((prevPdetail) => ({ ...prevPdetail, [name]: value }));
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("quantity", pDetail.quantity);
    formData.append("price", pDetail.price);
    formData.append("product_id", pDetail.product_id);
    formData.append("color_id", pDetail.color_id);

    // Append each size_id
    pDetail.size_ids.forEach((sizeId, index) => {
      formData.append(`size_ids[${index}]`, sizeId);
    });

    // Append each file individually
    pDetail.path.forEach((file, index) => {
      formData.append(`path[${index}]`, file);
    });

    axios
      .put(`http://localhost:8000/api/productdetails/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data.product);
        // Redirect or perform other actions after successful update
      })
      .catch((errors) => console.log(errors.response));
  };

  const handleDeleteImage = useCallback(
    (index) => {
      const updatedAvatars = [...avatars];
      const deletedImage = updatedAvatars[index];

      updatedAvatars.splice(index, 1);
      URL.revokeObjectURL(deletedImage.preview);

      setAvatars(updatedAvatars);
    },
    [avatars]
  );

  return (
    <div className="mt-5">
    <Form>
      <div>
        <h2>Kích Thước</h2>
        <Row>
          {size.map((size) => (
            <Col key={size.id} md={1} className="mb-3">
              <Form.Check
                type="checkbox"
                label={size.name}
                id={size.id}
                name="size_id"
                value={size.id}
                onChange={handleChange}
              />
            </Col>
          ))}
        </Row>
      </div>

      <div>
        <h2>Màu</h2>
        <Row>
          {color.map((color) => (
            <Col key={color.id} md={1} className="mb-3">
              <Form.Check
                type="radio"
                label={color.name}
                id={color.id}
                name="color_id"
                value={color.id}
                onChange={handleChange}
              />
            </Col>
          ))}
        </Row>
      </div>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Label>Số Lượng</Form.Label>
          <Form.Control
            type="text"
            placeholder="Số lượng"
            name="quantity"
            value={pDetail.quantity}
            onChange={handleChange}
          />
        </Col>
        <Col md={4}>
          <Form.Label>Giá Tiền</Form.Label>
          <Form.Control
            type="text"
            placeholder="Giá tiền"
            name="price"
            value={pDetail.price}
            onChange={handleChange}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={8}>
          <Form.Label>Hình Ảnh</Form.Label>
          <Form.Control
            type="file"
            name="path"
            onChange={(e) => (handleChange(e), handleImage(e))}
            multiple
          />
        </Col>
      </Row>

      <Row>
        {avatars.map((avatar, index) => (
          <Col key={index} md={3} style={{ position: "relative" }} className="mb-3">
            <img
              src={avatar.preview}
              alt={`ảnh ${index + 1}`}
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
            <Button
              variant="danger"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                borderRadius: "50%",
              }}
              onClick={() => handleDeleteImage(index)}
            >
              X
            </Button>
          </Col>
        ))}
      </Row>

      <Button variant="primary" onClick={handleSubmit} className="mt-3">
        Thêm
      </Button>
    </Form>
  </div>
  );
};

export default ProductDetailEdit;
