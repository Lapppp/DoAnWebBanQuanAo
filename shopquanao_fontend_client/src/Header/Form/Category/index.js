// Category.js
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import '../../../assets/style/category/category.css'
import axios from "axios";
function Category({
  categoryName,
  categoryId,
  categoryData,
  urlCategory,
  onClick,
  categoryNameParent =[],
}) {

  
  const [selectedCategory, setSelectedCategory] = useState(null);
 
  console.log('a',selectedCategory);
  const handleItemClick = (categoryId) => {
    // Gọi onClick với id của category được click
    if (onClick) {
      onClick(categoryId);
    }

    // Cập nhật selectedCategory khi người dùng click vào một category
    if (categoryId !== selectedCategory) {
      setSelectedCategory(categoryId);
    }
  };

  return (
    <li >
      <a href="a" >
        <i className="fa fa-suitcase"></i>
        {categoryName}
      </a>
      <div className="wrap-popup">
        <div className="popup">
          <div className="row">
            <div className="col-md-12">
            <Row>
      {categoryData &&
        categoryData
          .filter(cate => categoryNameParent.includes(cate.parent_category_name))

          .map((category) => (
            <Col md={6} key={category.id}>
              <h2 className="hoverCategory">{category.parent_category_name}</h2>
              {category.children_name.map(children=>(
              <ul className="nav">
                <li
                  key={children.id}
                  onClick={() => handleItemClick(children.id)}
                  className="category-item"
                >
                  <h5>{children.category_name}</h5>
                </li>
              </ul>))}
              
            </Col>
          ))}
    </Row>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Category;
