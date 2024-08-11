import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from 'react-bootstrap/Pagination';
import {
  faEdit,
  faPlusCircle,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const ProductList = ( {reload}) => {
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [selectShow, setSelectShow] = useState(null);

  const handleClickPagination = () => {
    // Xử lý khi nhấn vào phân trang
    // ...
  };

  // const handleShow = () => {
  //   setShow(true);
  // };
  

  const handleShowModel = (id) => {
    setSelectShow(products.find(item => item.id === id));
    setShow(true);
  };

  const handleClose = () => setShow(false);

  useEffect(() => {
    axios.get("http://localhost:8000/api/products").then((res) => {
      setProducts(res.data.product);
      console.log("product", res.data.product);
    });
  }, [reload]);

  const handleShowDelete = (id) => {
    try {
      const thongbao = window.confirm("Bạn có muốn xóa sản phẩm này không?");

      if (thongbao) {
        axios.delete(`http://localhost:8000/api/products/${id}`);
        const productdelete = products.filter((item) => item.id !== id);
        setProducts(productdelete);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <div className=" mt-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Tên sản phẩm</th>
              <th>Loại</th>
              <th>Trạng thái</th>
              <th>Chức Năng</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>

                {product.category.id &&
                product.category_id === product.category.id ? (
                  <td>{product.category.name}</td>
                ) : (
                  <td>
                    <h5>Lỗi</h5>
                  </td>
                )}
                {product.status === 1 ? (
                  <td>
                    <span className="text-primary">Có Sẵn</span>
                  </td>
                ) : (
                  <td>
                    <span className="text-primary">Hết</span>
                  </td>
                )}

                <td>
                  {/* chi tiết sản phẩm */}
                  <Button
                    variant="info"
                    style={{ marginRight: "5px" }}
                    onClick={() => handleShowModel(product.id)}
                  >
                    <FontAwesomeIcon icon={faUser} />
                  </Button>

                  <Link
                    to={`/admin/products/edit/${product.id}`}
                    className="btn btn-warning"
                    style={{ marginRight: "5px" }}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => handleShowDelete(product.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>

                  <Link
                    to={`/admin/productdetail/add/${product.id}`}
                    className="btn btn-warning"
                    style={{ marginLeft: "5px" }}
                  >
                    <FontAwesomeIcon icon={faPlusCircle} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="mt-3">
        <Pagination onClick={handleClickPagination}>
          {/* Thêm items của bạn vào đây */}
          {/* {items} */}
        </Pagination>
      </div>

      {/* Modal */}
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectShow?.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                {/* Nội dung Modal */}
                <Row>
                  {/* Lặp qua các màu sắc */}
                  {selectShow?.productdetails
                    ?.reduce((uniqueColors, productDetail) => {
                      const { color } = productDetail;

                      // Kiểm tra xem màu sắc có trong mảng uniqueColors chưa
                      if (!uniqueColors.some((item) => item.id === color.id)) {
                        uniqueColors.push(color);
                      }

                      return uniqueColors;
                    }, [])
                    .map((color) => (
                      <Row key={color.id}>
                        {/* Hiển thị thông tin màu sắc */}
                        <div>
                          <span>{color.name}</span>
                        </div>

                        {/* Hiển thị ảnh cho màu sắc */}
                        {color?.images?.map((image, index) => (
                          <Col md={3} style={{ border: "1px solid " }} key={index}>
                            <img
                              style={{ width: '100px', marginTop: '10px' }}
                              src={`http://localhost:8000/upload/images/${image.path}`}
                              alt="Ảnh lỗi"
                            />
                          </Col>
                        ))}
                      </Row>
                    ))}
                </Row>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </>
  );
};

export default ProductList;
