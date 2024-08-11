import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

const SizeColorSelector = ({ items, itemName, label, onChange }) => (
  <Col md={12}>
    <Form.Label>{label}</Form.Label>
    <Row>
      {items.map((item) => (
        <Col key={item.id} md={1} className="mb-3">
          <Form.Check
            type={itemName === 'color' ? 'radio' : 'checkbox'}
            label={item.name}
            id={item.id}
            name={`${itemName}_id`}
            value={item.id}
            onChange={onChange}
          />
        </Col>
      ))}
    </Row>
  </Col>
);

const ProductDetail = () => {
  const { id } = useParams();
  const [showColor, setShowColor] = useState(false);
  const [showSize, setShowSize] = useState(false);

  const [productDetail, setProductDetail] = useState({
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
    const fetchData = async () => {
      try {
        const sizeResponse = await axios.get("http://localhost:8000/api/sizes");
        setSize(sizeResponse.data.sizes);
      } catch (error) {
        console.log(error.response.message);
      }

      try {
        const colorResponse = await axios.get("http://localhost:8000/api/colors");
        setColor(colorResponse.data.colors);
      } catch (error) {
        console.log(error.response.message);
      }
    };

    fetchData();
  }, []);

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
      setProductDetail((prevProductDetail) => ({ ...prevProductDetail, [name]: value }));
    } else if (name === "size_id") {
      setProductDetail((prevProductDetail) => ({
        ...prevProductDetail,
        size_ids: checked
          ? [...prevProductDetail.size_ids, value]
          : prevProductDetail.size_ids.filter((id) => id !== value),
      }));
    } else if (name === "path") {
      const newFiles = Array.from(files);
      setProductDetail((prevProductDetail) => ({ ...prevProductDetail, [name]: newFiles }));
    } else {
      setProductDetail((prevProductDetail) => ({ ...prevProductDetail, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("quantity", productDetail.quantity);
    formData.append("price", productDetail.price);
    formData.append("product_id", productDetail.product_id);
    formData.append("color_id", productDetail.color_id);

    productDetail.size_ids.forEach((sizeId, index) => {
      formData.append(`size_ids[${index}]`, sizeId);
    });

    productDetail.path.forEach((file, index) => {
      formData.append(`path[${index}]`, file);
    });

    try {
      const response = await axios.post("http://localhost:8000/api/productdetails", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response:", response.data.product);
    } catch (errors) {
      console.log("Error:", errors.response);
    }
  };

  const handleDeleteImage = (index) => {
    const updatedAvatars = [...avatars];
    const deletedImage = updatedAvatars[index];

    updatedAvatars.splice(index, 1);
    URL.revokeObjectURL(deletedImage.preview);

    setAvatars(updatedAvatars);
  };

  return (
    <>
      <Button variant="primary" onClick={handleSubmit} className="mt-3">
        Thêm chi tiết
      </Button>
      <div className="mt-5">
        <Form>
          <div>
            <Button onClick={() => setShowSize(!showSize)} style={{ marginBottom: '15px' }}>Chọn kích thước</Button>
            {showSize && <SizeColorSelector items={size} itemName="size" label="Kích Thước" onChange={handleChange} />}
          </div>
  
          <div>
            <Button onClick={() => setShowColor(!showColor)} style={{ marginBottom: '15px' }}>Chọn màu</Button>
            {showColor && <SizeColorSelector items={color} itemName="color" label="Màu Sắc" onChange={handleChange} />}
          </div>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Label>Số Lượng</Form.Label>
              <Form.Control
                type="text"
                placeholder="Số lượng"
                name="quantity"
                value={productDetail.quantity}
                onChange={handleChange}
              />
            </Col>
            <Col md={4}>
              <Form.Label>Giá Tiền</Form.Label>
              <Form.Control
                type="text"
                placeholder="Giá tiền"
                name="price"
                value={productDetail.price}
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
        </Form>
      </div>
    </>
  );
};

export default ProductDetail;
