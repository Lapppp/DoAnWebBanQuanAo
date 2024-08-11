import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const Category = () => {
  const [category, setCategory] = useState({ name: "", category_id: null });
  const [categories, setCategories] = useState([]);


  const [categoryData, setCategoryData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [categoryEditData, setCategoryEditData] = useState({
    parent_category_name: "",
    children_name: [],
  });

  
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState({});

  const [disableDanhMuc, setDisableDanhMuc] = useState(true);
  const [isAddingChild, setIsAddingChild] = useState(false);

  const hanldeCategory = (e) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({ ...prevCategory, [name]: value }));
    setSuccess({});
    setErrors({});
    //console.log(category);
  };


  const handleEdit = (index) => {
    setEditingIndex(index);
    const editedCategory = categoryData[index];
    setCategoryEditData({
      parent_category_name: editedCategory.parent_category_name,
      children_name: [...editedCategory.children_name],
    });
  };

  const handleEditSubmit = async (index) => {
    try {
        const updatedCategories = [...categoryData];
        const updatedCategory = updatedCategories[index];

        // Update parent category
        updatedCategory.parent_category_name = categoryEditData.parent_category_name;

        // Update child categories
        updatedCategory.children_name = categoryEditData.children_name.map((child, childIndex) => {
            return {
                id: child.id,
                cate: child.cate,
            };
        });

        const response = await axios.put(
            `http://localhost:8000/api/categories/${updatedCategory.id}`,
            { categories: [updatedCategory] }
        );

        console.log(response.data.message);
        await fetchCategoryData();
        setEditingIndex(null);
    } catch (error) {
        console.error(error.response.data.error);
    }
};


  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/categories/${id}`
      );
      console.log(response.data.message);
      fetchCategoryData();
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  const handleChange = (e, index, isChild = false) => {
    const { name, value } = e.target;

    setCategoryEditData((prevData) => {
      const updatedData = { ...prevData };

      if (isChild) {
        updatedData.children_name[0][name] = value;
      } else {
        updatedData[name] = value;
      }

      return updatedData;
    });
  };
  const fetchCategory = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/categories");
      setCategories(response.data.category);
      setSuccess({});
    } catch (error) {
      console.error(error.response.data.error);
    }
  };
  const fetchCategoryData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/getcategorydata");
      setCategoryData(response.data.categories);
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchCategoryData();
  }, []); 

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post("http://localhost:8000/api/categories", category)
        .then((res) => {
          //  gán thông báo thành công
          setSuccess(res.data);
          if (!isAddingChild) {
            // Nếu không phải là thêm danh mục con, thêm mới danh mục cha vào danh sách
            setCategories([...categories, res.data.category]);
          }
          setCategories(categories);
 
          fetchCategory();
          fetchCategoryData();
        })
        .catch((error) => {
          if (error.response.status === 422) {
            setErrors(error.response.data.validate_err);
          } else {
            console.log(error.response.data);
          }
        });
    } catch (error) {
      console.log("Lỗi", error.response);
    }
    // Thêm danh mục mới vào danh sách
  };

  const handleAddChild = () => {
    
    setCategory((prevCategory) => ({ ...prevCategory, category_id: null }));
    setIsAddingChild(true);
    setDisableDanhMuc(false);
  };

  return (
    <>
      <Row>
        <Col md={12}>
          <Card border="primary" style={{ width: "100%" }}>
            <Card.Header style={{ textAlign: "center" }}>CATEGORY</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="">
                  <Form.Select
                    aria-label="Default select example"
                    value={category.category_id ?? ""}
                    onChange={(e) => hanldeCategory(e)}
                    name="category_id"
                    disabled={disableDanhMuc}
                  >
                    <option value="">-- Chọn Danh Mục Cha --</option>
                    {categories &&
                      categories.length > 0 &&
                      categories
                        .filter((item) => item.category_id === null)
                        .map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="">
                  <Form.Label>Danh Mục Con</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={category.name}
                    onChange={(e) => hanldeCategory(e)}
                  />
                  {!errors.name ? (
                    <span className="text-warning"></span>
                  ) : (
                    <span className="text-warning">{errors.name}</span>
                  )}
                </Form.Group>

                <Button variant="primary" type="submit">
                  Lưu
                </Button>
                <Button
                  variant="primary ml-4"
                  type="button"
                  onClick={() => {
                    handleAddChild();
                    setDisableDanhMuc(!disableDanhMuc);
                  }}
                >
                  Thêm Danh Mục Cha
                </Button>

                <Link className="btn btn-info ml-4" to="/admin/products">
                  Thêm Sản Phẩm
                </Link>
              </Form>
              <span className="text-warning">{success.message}</span>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* // danh sách category */}
    <div className="mt-5">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Loại Sản Phẩm Cha</th>
            <th>Loại Sản Phẩm Con</th>
            <th>Chức Năng</th>
          </tr>
        </thead>
        <tbody>
          {categoryData.map((type, index) => (
            <tr key={index}>
              <td>
                {index === editingIndex ? (
                  <Form.Control
                    type="text"
                    name="parent_category_name"
                    value={categoryEditData.parent_category_name}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  type.parent_category_name
                )}
              </td>
              <td>
                
               
                  {type.children_name.map((child, childIndex) => (
                    
                    <td key={childIndex}>
                      {index === editingIndex ? (
                        <Form.Control
                          type="text"
                          name="cate"
                          value={categoryEditData.children_name[childIndex].cate}
                          onChange={(e) =>
                            handleChange(e, childIndex, true)
                          }
                        />
                      ) : (
                        child.cate
                      )}
                      
                    </td>
                  ))}
               
              </td>
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
                      onClick={() => handleDelete(type.id)}
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
    </>
  );
};

export default Category;