import axios from "axios";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
//import ProductList from "../ProductList";
import { useNavigate, useParams } from "react-router-dom";
const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState([]); // kiểu mảng mới dùng map đc
  const [products, setProducts] = useState({
    name: "",
    price: "",
    description: "",
    //image: [],
    averagestar: 5,
    slug: "",
    category_id: "",
    status: true,
  });
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/products/${id}`)
      .then((res) => setProducts(res.data.product));
  }, [id]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/categories")
      .then((res) => setCategory(res.data.category));
  }, []);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setProducts((prevState) => ({ ...prevState, [name]: value }));

    console.log(products);
  };
  function changeToSlug() {
    var title = products.name;

    // Chuyển đổi chuỗi có dấu thành chuỗi không dấu
    var unaccentedString = title
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    // Thay thế khoảng trắng bằng dấu "-"
    var slugs = unaccentedString.toLowerCase().replace(/\s+/g, "-");

    setProducts((prevState) => ({ ...prevState, slug: slugs }));
    console.log(products);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios
        .put(`http://localhost:8000/api/products/${id}`, products)
        .then(() => navigate('/admin/products'));
      console.log(response.data); // Hiển thị dữ liệu từ API
    } catch (error) {
      console.error("Error:", error); // Hiển thị lỗi từ API
    }
  };

  return (
    <>
      <div className=" mt-5">
      
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="name1">
                <Form.Label>Tên Sản Phẩm</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={products.name}
                  placeholder="Tên Sản Phẩm"
                  onChange={(e) => {
                    handleChange(e);
                    changeToSlug();
                  }}
                />
              </Form.Group>

              

              <Form.Group
                aria-label="Default select example"
                name="category_id"
                value={products.category_id}
                onChange={(e) => handleChange(e)}
              >
                <Row>
                  <h5>Loại Sản Phẩm</h5>
                  {category
                    .filter((cates) => cates.category_id === null)
                    .map((cate, index) => (
                      <Col md={6} key={index}>
                        <div className="border p-3 mb-3">
                          <h4 className="text-primary">{cate.name}</h4>
                          {category
                            .filter((item) => item.category_id === cate.id)
                            .map((item, itemIndex) => (
                              <div key={itemIndex}>
                                <input
                                  type="radio"
                                  value={item.id}
                                  name="category_id"
                                />
                                <label>{item.name}</label>
                              </div>
                            ))}
                        </div>
                      </Col>
                    ))}
                </Row>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Đường Dẫn Trang Sản Phẩm</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Đường Dẫn Trang Sản phẩm"
                  name="slug"
                  id="name"
                  value={products.slug}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </Form.Group>

              
              <Form.Group className="mb-3" controlId="name3">
                <Form.Label>Mô Tả</Form.Label>
                <CKEditor
                  editor={ClassicEditor}
                  data={products.description}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setProducts((pres) => {
                      return { ...pres, description: data };
                    });
                  }}
                  onBlur={(event, editor) => {
                    console.log("Blur.", editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log("Focus.", editor);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button type="submit" onClick={handleSubmit}>
            Cập Nhập Sản Phẩm
          </Button>
        </Form>
      </div>
    </>
  );
};

export default ProductEdit;
