import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom';


const InvoicedetailAdd = () => {

   
    var { id } = useParams();
    const [formData, setFormData] = useState({
      productName: "",
      color: "",
      size: "",
      product_detail_id: "",
      quantity: "",
      price: "",
      invoice_id: id,
    });
  
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
    console.log(formData)
  
    const handleSearchProductDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/getproductdetailid?productName=${formData.productName}&color=${formData.color}&size=${formData.size}`
        );
  
        if (response.data && response.data.id) {
          setFormData((prevData) => ({
            ...prevData,
            product_detail_id:   response.data.id ,
          }));
          console.log("Tìm thấy chi tiết sản phẩm, ID:", response.data.id);
        } else {
          console.error("Không tìm thấy chi tiết sản phẩm.");
        }
      } catch (error) {
        console.error("Lỗi khi tìm kiếm chi tiết sản phẩm:", error);
      }
    };
  
    const handleAddInvoiceDetail = (e) => {
      e.preventDefault();
  
      axios
        .post(`http://localhost:8000/api/invoicedetail`, {
          product_detail_id: formData.product_detail_id,
          quantity: formData.quantity,
          price: formData.price,
          invoice_id: formData.invoice_id,
        })
        .then(()=>{navigate(`/admin/invoice`)})
        
    };
  
    return (
      <>
        <h4>Thêm chi tiết hóa đơn</h4>
  
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Tên sản phẩm:</Form.Label>
            <Form.Control
              type="text"
              name="productName"
              placeholder="Nhập tên sản phẩm"
              value={formData.productName}
              onChange={handleChange}
            />
          </Form.Group>
  
          <Form.Group className="mb-3">
            <Form.Label>Màu:</Form.Label>
            <Form.Control
              type="text"
              name="color"
              placeholder="Nhập màu"
              value={formData.color}
              onChange={handleChange}
            />
          </Form.Group>
  
          <Form.Group className="mb-3">
            <Form.Label>Size:</Form.Label>
            <Form.Control
              type="text"
              name="size"
              placeholder="Nhập size"
              value={formData.size}
              onChange={handleChange}
            />
          </Form.Group>
  
          <Button variant="primary" onClick={handleSearchProductDetail}>
            Tìm chi tiết sản phẩm
          </Button>
  
          {formData.product_detail_id && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Số lượng:</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  placeholder="Nhập số lượng"
                  value={formData.quantity}
                  onChange={handleChange}
                />
              </Form.Group>
  
              <Form.Group className="mb-3">
                <Form.Label>Đơn giá:</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  placeholder="Nhập đơn giá"
                  value={formData.price}
                  onChange={handleChange}
                />
              </Form.Group>
  
         
  
              <Button variant="success" onClick={handleAddInvoiceDetail}>
                <FontAwesomeIcon icon={faCheck} /> Thêm chi tiết hóa đơn
              </Button>
            </>
          )}
        </Form>
      </>
    );
  };

export default InvoicedetailAdd