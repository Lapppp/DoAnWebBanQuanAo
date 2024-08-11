import axios from "axios";
import { useEffect, useState } from "react";
<<<<<<< HEAD
import React, { createContext, useContext } from "react";
import Category from "../../../../Header/Form/Category";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import "../../../../assets/style/HeaderLogin.css";
=======

import { Link, useNavigate } from "react-router-dom";

import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";








>>>>>>> 1995ee8b2c36df87f41783e7ce5774a8b3ee5100

// khó
const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    //console.log(`Category ${categoryId} clicked`);
  };

  return (
    <CategoryContext.Provider value={{ selectedCategory, handleCategoryClick }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};
//
const Header = () => {
  const [dropdownLogin, setDropdownLogin] = useState(false);
  const handleAllCategoriesClick = () => {
    setDropdownLogin(!dropdownLogin);
  };

  const handleResetPassWord = () => {};
  

  const Nam = "Nam";
  const Nu = "Nữ";
  const TreEm = "Trẻ Em";
  const { handleCategoryClick } = useCategory();
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/getcategory")
      .then((res) => setCategory(res.data.categories))
      .catch((err) => console.log(err.response));
  }, []);
  const handleLogout = async () => {
    try {
      // Nhận mã thông báo từ localStore
      const authToken = localStorage.getItem("authToken");
      // console.log('lấy',authToken);
      // Xóa mã xác thực tại cục bộ
      console.log("remove", localStorage.removeItem("authToken"));

      //  thực hiện yêu cầu  tới laravel
      const response = await axios.post(
        "http://localhost:8000/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("Logout successful", response.data);

      navigate("/home/login");
    } catch (error) {
      console.error("Logout failed", error.response?.data);
    }
  };


  // thử nghiệm 
  
  
    const [isHomeMenuVisible, setHomeMenuVisible] = useState(false);
  
    const toggleHomeMenu = () => {
      setHomeMenuVisible(!isHomeMenuVisible);
    };
    const [name, setname] = useState('');
    const hanldeChangename=(e)=>{
      setname(e.target.value);

    }
  
  
   
  return (
    <header>
      <div className="header-container"></div>

      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12 logo-block">
            {/*-- Header Logo */}
            <div className="logo">
              <a title="Linea HTML Template" href="index.html">
                <img
                  alt="Linea HTML"
                  src="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/images/logo.png"
                />
              </a>
            </div>
            {/*-- End Header Logo */}
          </div>
          <div className="col-lg-7 col-md-6 col-sm-6 col-xs-3 hidden-xs category-search-form">
            <div
              className="search-box"
              style={{
                borderRadius: "10px",
                boxSizing: "border-box",
              }}
            >
              <form id="search_mini_form" method="get">
                {/*-- Autocomplete End code */}
                <input
                style={{color:'black'}}
                  id="search"
                  type="text"
<<<<<<< HEAD
                  name="q"
                  placeholder="Tìm kiếm"
                  className="searchbox"
                  maxLength="128"
=======
                  name="name"
                  placeholder="Nhập tên sản phẩm..."
                  className="searchbox"
                  maxlength="128"
                  onChange={hanldeChangename}
>>>>>>> 1995ee8b2c36df87f41783e7ce5774a8b3ee5100
                />
               
                 <Link to={`/home/search/${name}`}    title="Search" className="search-btn-bg" style={{ marginRight: "5px" }} >
                                                       
                                                    </Link>
              </form>
            </div>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-3 col-xs-12 card_wishlist_area">
            <div className="mm-toggle-wrap">
              <div className="mm-toggle">
                <i className="fa fa-align-justify"></i>
                <span className="mm-label">Menu</span>
              </div>
            </div>
            <div className="top-cart-contain" id="top-cart-contain">
              {/*-- Top Cart */}
              <div className="mini-cart">
<<<<<<< HEAD
                <div
                  data-toggle="dropdown"
                  data-hover="dropdown"
                  className="basket dropdown-toggle"
                >
                  <a href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/shopping_cart.html">
                    <span className="price hidden-xs">Shopping Cart</span>
                    <span className="cart_count hidden-xs">2 Items/ $4580</span>
                  </a>
                </div>
=======
              
                  <Link to={`/home/cart`}   style={{ marginRight: "5px" }} >
                  <FontAwesomeIcon icon={faCartShopping} size="3x" /> Shopping Cart
                                        </Link>
               
>>>>>>> 1995ee8b2c36df87f41783e7ce5774a8b3ee5100
                <div>
                  <div className="top-cart-content" id="top-cart-content">
                    {/*--block-subtitle*/}
                    <ul className="mini-products-list" id="cart-sidebar">
                      <li className="item first">
                        <div className="item-inner">
                          <a
                            className="product-image"
                            title="Retis lapen casen"
                            href="#l"
                          >
                            <img
                              alt="Retis lapen casen"
                              src="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/products-images/product4.jpg"
                            />
                          </a>
                          <div className="product-details">
                            <div className="access">
                              <a
                                className="btn-remove1"
                                title="Remove This Item"
                                href="a"
                              >
                                Remove
                              </a>
                              <a
                                className="btn-edit"
                                title="Edit item"
                                href="a"
                              >
                                <i className="icon-pencil"></i>
                                <span className="hidden">Edit item</span>
                              </a>
                            </div>
                            {/*--access*/}
                            <strong>1</strong> x
                            <span className="price">$179.99</span>
                            <p className="product-name">
                              <a href="a">Retis lapen casen...</a>
                            </p>
                          </div>
                        </div>
                      </li>
                      <li className="item last">
                        <div className="item-inner">
                          <a
                            className="product-image"
                            title="Retis lapen casen"
                            href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/product_detail.html"
                          >
                            <img
                              alt="Retis lapen casen"
                              src="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/products-images/product3.jpg"
                            />
                          </a>
                          <div className="product-details">
                            <div className="access">
                              <a
                                className="btn-remove1"
                                title="Remove This Item"
                                href="a"
                              >
                                Remove
                              </a>
                              <a
                                className="btn-edit"
                                title="Edit item"
                                href="a"
                              >
                                <i className="icon-pencil"></i>
                                <span className="hidden">Edit item</span>
                              </a>
                            </div>
                            {/*--access*/}
                            <strong>1</strong> x
                            <span className="price">$80.00</span>
                            <p className="product-name">
                              <a href="a">Retis lapen casen...</a>
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                    {/*--actions*/}
                    <div className="actions">
                      <button
                        className="btn-checkout"
                        title="Checkout"
                        type="button"
                      >
                        <span>Checkout</span>
                      </button>
                      <a
                        href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/shopping_cart.html"
                        className="view-cart"
                      >
                        <span>View Cart</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {/*-- Top Cart */}
            </div>
            {/*-- mgk wishlist */}
          </div>
        </div>
      </div>

      <nav className="hidden-xs">
        <div className="nav-container">
          {/* menu lúc đầu */}
          {/* <div className="col-md-3 col-xs-12 col-sm-4">
            <div className="mega-container visible-lg visible-md visible-sm">
              <div className="navleft-container">
                <div className="mega-menu-title" id="mega-menu-title">
                  <h3 onClick={handleAllCategoriesClick}>
                    <i className="fa fa-navicon"></i>TẤT CẢ
                  </h3>
                </div>
                {dropdownLogin && (
                  <div className="mega-menu-category" id="mega-menu-category">
                    <ul className="nav">
                      <li>
                        <a href="index.html">
                          <i className="fa fa-home"></i> Home
                        </a>
                        <div className="wrap-popup column1"></div>
                      </li>
                      <li>
                        <a href="a">
                          <i className="fa fa-file-text"></i>danh sách
                        </a>
                        <div className="wrap-popup">
                          <div className="popup">
                            <div className="row">
                              <div className="col-sm-6">
                                <ul className="nav">
                                  <li>
                                    <a href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/grid.html">
                                      <span>Grid</span>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-sm-6 has-sep">
                                <ul className="nav">
                                  <li>
                                    <a href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/dashboard.html">
                                      <span>Dashboard</span>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>

                      <Category
                        categoryName={Nu}
                        categoryId={null}
                        categoryData={category}
                        onClick={handleCategoryClick}
                        categoryNameParent={["Áo Nữ"]}
                      />
                      <Category
                        categoryName={Nam}
                        categoryId={null}
                        categoryData={category}
                        onClick={handleCategoryClick}
                        categoryNameParent={["Áo Nam","Quần Nam"]}
                        
                      />
                      <Category
                        categoryName={TreEm}
                        categoryId={null}
                        categoryData={category}
                        onClick={handleCategoryClick}
                        categoryNameParent={["Áo Trẻ Em"]}
                      />
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div> */}
          <div className="col-md-3 col-xs-12 col-sm-4">
            <div className="mega-container visible-lg visible-md visible-sm">
              <div className="navleft-container" style={{ backgroundColor: '#f8f8f8' , border: '1px solid #ddd' }}>
                <div className="mega-menu-title" id="mega-menu-title" onClick={toggleHomeMenu}>
                  <h3>
                    <i className="fa fa-navicon"></i> Menu
                  </h3>
                </div>

                {isHomeMenuVisible && (
           <nav style={{ backgroundColor: '#f8f8f8', borderRadius: '50px', padding: '5px' }}>
           <ul style={{ listStyle: 'none', padding: 0, margin: '5px' }}>
             <li style={{ marginRight: '10px' }}>
               <a href="#" style={{ textDecoration: 'none', color: '#333', fontSize: '18px' }}>Menu Item 1</a>
             </li>
             <li style={{ marginRight: '15px'  }}>
               <a href="#" style={{ textDecoration: 'none', color: '#333', fontSize: '18px'  }}>Menu Item 2</a>
             </li>
             {/* Thêm các mục menu khác tùy thuộc vào nhu cầu của bạn */}
           </ul>
         </nav>)}
                
              </div>
            </div>
          </div>
<<<<<<< HEAD
          <div></div>
=======
          
        






          
         
>>>>>>> 1995ee8b2c36df87f41783e7ce5774a8b3ee5100
          {/*-- features box */}
          <div className="our-features-box hidden-xs">
            <div className="features-block">
              <div className="col-lg-7 col-md-9 col-xs-12 col-sm-8 offer-block">
                <div className="feature-box first">
                  <div className="content">
                    <h3>Miễn phí vận chuyển</h3>
                  </div>
                  
                </div>
                <span className="separator">/</span>
                <div className="feature-box">
                  <div className="content">
                    <h3>Đảm bảo chất lượng</h3>
                  </div>
                </div>
                <span className="separator">/</span>
                <div className="feature-box last">
                  <div className="content">
                    <h3>Đặt hàng ngay +(84) 945730450</h3>
                  </div>
                </div>
              </div>
<<<<<<< HEAD
            </div>

=======
            
            </div> 
          
>>>>>>> 1995ee8b2c36df87f41783e7ce5774a8b3ee5100
            {/* START */}

            <div className="navbar">
              {localStorage.getItem("authToken") ? (
                <div className="feature-box last">
                  <div className="content">
                    <DropdownButton
                      as={ButtonGroup}
                      id={`dropdown-variants-user`}
                      title={
                       <Link to={'/home/account'}>
                          <div className="d-flex align-items-center">
                            <FontAwesomeIcon  style={{ fontSize: '25px' }} icon={faUser} />
                            <span className="ml-2">CÁ NHÂN</span>
                          </div>
                       </Link>
                      }
                    >
                     
                      <Dropdown.Item onClick={handleResetPassWord}>
                      <FontAwesomeIcon icon={faLock} className="mr-2" />
                        Đổi mật khẩu
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout}>
                      <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                        Đăng Xuất
                      </Dropdown.Item>
                      {/* Thêm các mục khác nếu cần */}
                    </DropdownButton>

                    <div className="user-info">
                      {/* Các thông tin khác về người dùng */}
                    </div>
                  </div>
                </div>
<<<<<<< HEAD
              ) : (
                <>
                  <div className="feature-box ">
                    <div className="content">
                      <Link to={`/home/register`}>
                        <h3>ĐĂNG KÝ</h3>
                      </Link>
                    </div>
                  </div>

                  <span className="separator">/</span>

                  <div className="feature-box last">
                    <div className="content">
                      <Link to={`/home/login`}>
                        <h3>ĐĂNG NHẬP</h3>
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
=======
              </>
            )}
            
>>>>>>> 1995ee8b2c36df87f41783e7ce5774a8b3ee5100

            {/* END */}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
