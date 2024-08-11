import { useEffect, useState } from "react";
import Products from "../../../../Section/Form/Products";
import "../../../../assets/style/ImageSlider.css";
import "../../../../assets/images/hinh-nen-powerpoint-mau-vang-2.jpg";
import axios from "axios";
<<<<<<< HEAD
import { useCategory } from "../Header";
=======
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
>>>>>>> 1995ee8b2c36df87f41783e7ce5774a8b3ee5100

const Section = () => {
  const { selectedCategory } = useCategory();
  const [productDetails, setProductDetails] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/productdetailsimg")
      .then((res) => setProductDetails(res.data.productImage));
  }, []);
<<<<<<< HEAD
  const renderProducts = () => {
    if (selectedCategory === null) {
      return productDetails.map((pro) => (
        <Products
          key={pro.id}
          hrefLink={`/home/productdetail/${pro.id}`}
          srcImg={pro.image_path}
          ProductName={pro.product_name}
          ProductPrice={pro.price === null ? "lỗi" : pro.price}
        />
      ));
    }
  
    return productDetails
      .filter((pro) => pro.category_id === selectedCategory)
      .map((pro) => (
        <Products
          key={pro.id}
          hrefLink={`/home/productdetail/${pro.id}`}
          srcImg={pro.image_path}
          ProductName={pro.product_name}
          ProductPrice={pro.price === null ? "lỗi" : pro.price}
        />
      ));
  };
=======


  const [loaiSP, setloaiSP] = useState(false);
  const [mau, setMau] = useState(false);
  const [price, setPrice] = useState(false);
  const [size, setSize] = useState(false);

  // Function to toggle the visibility of filter options
  const handleLoai = () => {
    setloaiSP(!loaiSP);
  }; 
  const handleMau = () => {
    setMau(!mau);
  };
  const handlePrice = () => {
    setPrice(!price);
  };
  const handleSize = () => {
    setSize(!size);
  };

 console.log(productDetails)

>>>>>>> 1995ee8b2c36df87f41783e7ce5774a8b3ee5100
  return (
    <>
      <section className="main-container col2-left-layout">
        <div className="container">
          <div className="row">
            <div className="col-md-9 col-sm-8 col-xs-12 col-sm-push-4 col-md-push-3">
              {/* promotion banner */}
              {/* ảnh sales */}
              <div className="promotion-banner">
                <div className="row">
                  <div className="col-lg-5 col-sm-5">
                    <a href="a">
                      <img
                        alt=""
                        src="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/images/home-banner1.jpg"
                      />{" "}
                    </a>
                  </div>
                  <div className="col-lg-7 col-sm-7">
                    <a href="a">
                      <img
                        alt=""
                        src="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/images/home-banner2.jpg"
                      />{" "}
                    </a>
                  </div>
                </div>
              </div>
              {/* ảnh sales */}
              <div className="content-page">
                {/* featured category */}
                <div className="category-product">
                  <div className="navbar nav-menu">
                    <div className="navbar-collapse ">
                      <div className="new_title">
                        <h2>SẢN PHẨM </h2>
                       
                      </div>
                      <ul className="nav navbar-nav">
                        <li className="active">
                          <a data-toggle="tab" href="#tab-1">
                            TẤT CẢ{" "}
                          </a>
                        </li>
                        <li>
                          <a data-toggle="tab" href="#tab-2">
                            NỮ{" "}
                          </a>
                        </li>
                        <li>
                          <a data-toggle="tab" href="#tab-3">
                            NAM{" "}
                          </a>
                        </li>
                        <li>
                          <a data-toggle="tab" href="#tab-4">
                            TRẺ EM{" "}
                          </a>
                        </li>
                      </ul>
                    </div>
                    {/* /.navbar-collapse */}
                  </div>
                  <div className="product-bestseller">
                    <div className="product-bestseller-content">
                      <div className="product-bestseller-list">
                        <div className="tab-container">
                          {/* tab product */}
                          <div className="tab-panel active" id="tab-1">
                            <div className="category-products">
                              <ul className="products-grid">
                                
                                {/* START */}
                                {renderProducts()}

                                {/* END */}
                              </ul>
                            </div>
                          </div>

                          {/* tab product */}
                          <div className="tab-panel" id="tab-2">
                            <div className="category-products">
                              <ul className="products-grid"></ul>
                            </div>
                          </div>
                          <div className="tab-panel" id="tab-3">
                            <div className="category-products">
                              <ul className="products-grid"></ul>
                            </div>
                          </div>
                          <div className="tab-panel" id="tab-4">
                            <div className="category-products">
                              <ul className="products-grid"></ul>
                            </div>
                          </div>
                          <div className="tab-panel" id="tab-5">
                            <div className="category-products">
                              <ul className="products-grid"></ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* bestsell slider */}
              <div className="bestsell-pro"></div>
            </div>
            <aside className="col-left sidebar col-md-3 col-sm-4 col-xs-12 col-sm-pull-8 col-md-pull-9">
              <div className="custom-slider-wrap">
                <div className="custom-slider-inner">
                  <div className="home-custom-slider">
                    <div>
                      <div
                        id="carousel-example-generic"
                        className="carousel slide"
                        data-ride="carousel"
                      >
                        <ol className="carousel-indicators">
                          <li
                            className="active"
                            data-target="#carousel-example-generic"
                            data-slide-to="0"
                          ></li>
                          <li
                            data-target="#carousel-example-generic"
                            data-slide-to="1"
                          ></li>
                          <li
                            data-target="#carousel-example-generic"
                            data-slide-to="2"
                          ></li>
                        </ol>
                        <div className="carousel-inner">
                          <div className="item active">
                            {" "}
                            <img
                              src="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/images/custom-slide1.jpg"
                              alt="slide3"
                            />
                            <div className="carousel-caption">
                              {" "}
                              <span>Mega Deal</span>
                              <p>
                                Save up to <strong>70% OFF</strong> Fahion
                                collection
                              </p>
                            </div>
                          </div>
                          <div className="item">
                            {" "}
                            <img
                              src="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/images/custom-slide2.jpg"
                              alt="slide2"
                            />
                            <div className="carousel-caption">
                              {" "}
                              <span>
                                Huge <strong>sale</strong>
                              </span>
                              <p>
                                Save up to <strong>70% OFF</strong> Fahion
                                collection
                              </p>
                            </div>
                          </div>
                          <div className="item">
                            {" "}
                            <img
                              src="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/images/custom-slide3.jpg"
                              alt="slide1"
                            />
                            <div className="carousel-caption">
                              {" "}
                              <span>
                                Hot <strong>Deal</strong>
                              </span>
                              <p>
                                Save up to <strong>70% OFF</strong> Fahion
                                collection
                              </p>
                            </div>
                          </div>
                        </div>
                        <a
                          className="left carousel-control"
                          href="a"
                          data-slide="prev"
                        >
                          {" "}
                          <span className="sr-only">Previous</span>{" "}
                        </a>{" "}
                        <a
                          className="right carousel-control"
                          href="a"
                          data-slide="next"
                        >
                          {" "}
                          <span className="sr-only">Next</span>{" "}
                        </a>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="hot-deal">
                <ul className="products-grid">
                  <li className="right-space two-height item">
                    <div className="item-inner">
                      <div className="item-img">
                        <div className="item-img-info">
                          {" "}
                          <a
                            href="a"
                            title="Retis lapen casen"
                            className="product-image"
                          >
                            {" "}
                            <img
                              src="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/products-images/product1.jpg"
                              alt="Retis lapen casen"
                            />{" "}
                          </a>
                          <div className="hot-label hot-top-left">Hot Deal</div>
                          <div className="box-hover">
                            <ul className="add-to-links">
                              <li>
                                <a
                                  className="link-quickview"
                                  href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/quick_view.html"
                                >
                                  {" "}
                                </a>
                              </li>
                              <li>
                                <a
                                  className="link-wishlist"
                                  href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/wishlist.html"
                                >
                                  {" "}
                                </a>
                              </li>
                              <li>
                                <a
                                  className="link-compare"
                                  href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/compare.html"
                                >
                                  {" "}
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="box-timer">
                            <div
                              className="timer-grid countbox_1"
                              data-time="2020/02/01"
                            ></div>
                          </div>
                        </div>
                      </div>
                       <div className="item-info">
                        <div className="info-inner">
                          <div className="item-title">
                            {" "}
                            <a
                              href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/product_detail.html"
                              title="Retis lapen casen"
                            >
                              {" "}
                              Retis lapen casen{" "}
                            </a>{" "}
                          </div>
                          <div className="item-content">
                            <div className="rating">
                              <div className="ratings">
                                <div className="rating-box">
                                  <div className="rating width80"></div>
                                </div>
                                <p className="rating-links">
                                  {" "}
                                  <a href="a">1 Review(s) </a>{" "}
                                  <span className="separator">|</span>{" "}
                                  <a href="a">Add Review </a>{" "}
                                </p>
                              </div>
                            </div>
                            <div className="item-price">
                              <div className="price-box">
                                {" "}
                                <span className="regular-price">
                                  {" "}
                                  <span className="price">$125.00</span>{" "}
                                </span>{" "}
                              </div>
                            </div>
                            <div className="action">
                              <button
                                data-original-title="Add to Cart"
                                title=""
                                type="button"
                                className="button btn-cart"
                              >
                                <span>Add to Cart</span>{" "}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div> 
                       
                     
                    </div>
                  </li>
                </ul>
              </div> */}

              <div className="item-info">
                    <div className="filter-container">
                        <div className="filter-header" onClick={handleLoai}>
                          <h2 style={{ display: 'flex', alignItems: 'center' }} >Loại Sản Phẩm
                            {loaiSP ? (
                              <FontAwesomeIcon icon={faChevronDown}  style={{ marginRight: '10px' }}/>
                            ) : (
                              <FontAwesomeIcon icon={faChevronRight}  style={{ marginRight: '10px' }} />
                            )}</h2>
                        </div>

                        {loaiSP && (
                          <>
                            <label style={{ marginRight: '10px' }}>
                              <input type="checkbox" name="filterOption1" />Bo Filter Option 1
                            </label>
                            <label style={{ marginRight: '10px' }}>
                              <input type="checkbox" name="filterOption2" /> Filter Option 2
                            </label>
                            {/* Add more filter options as needed */}
                          </>
                        )}
                      
                    </div>

                    <div className="filter-container">
                        <div className="filter-header" onClick={handleMau}>
                          <h2 style={{ display: 'flex', alignItems: 'center' }} >Màu
                            {mau ? (
                              <FontAwesomeIcon icon={faChevronDown}  style={{ marginRight: '10px' }}/>
                            ) : (
                              <FontAwesomeIcon icon={faChevronRight}  style={{ marginRight: '10px' }} />
                            )}</h2>
                        </div>

                        {mau && (
                          <>
                            <label style={{ marginRight: '10px' }}>
                              <input type="checkbox" name="filterOption1" />Đỏ
                            </label>
                            <label style={{ marginRight: '10px' }}>
                              <input type="checkbox" name="filterOption2" />Vàng
                            </label>
                            {/* Add more filter options as needed */}
                          </>
                        )}
                      
                    </div>

                    <div className="filter-container">
                        <div className="filter-header" onClick={handleSize}>
                          <h2 style={{ display: 'flex', alignItems: 'center' }} >Size
                            {size ? (
                              <FontAwesomeIcon icon={faChevronDown}  style={{ marginRight: '10px' }}/>
                            ) : (
                              <FontAwesomeIcon icon={faChevronRight}  style={{ marginRight: '10px' }} />
                            )}</h2>
                        </div>

                        {size && (
                          <>
                            <label style={{ marginRight: '10px' }}>
                              <input type="checkbox" name="filterOption1" />L
                            </label>
                            <label style={{ marginRight: '10px' }}>
                              <input type="checkbox" name="filterOption2" />M
                            </label>
                            <label style={{ marginRight: '10px' }}>
                              <input type="checkbox" name="filterOption1" />S
                            </label>
                            <label style={{ marginRight: '10px' }}>
                              <input type="checkbox" name="filterOption1" />XL
                            </label>
                            {/* Add more filter options as needed */}
                          </>
                        )}
                      
                    </div>

                    <div className="filter-container">
                        <div className="filter-header" onClick={handlePrice}>
                          <h2 style={{ display: 'flex', alignItems: 'center' }} >Khoảng giá
                            {price ? (
                              <FontAwesomeIcon icon={faChevronDown}  style={{ marginRight: '10px' }}/>
                            ) : (
                              <FontAwesomeIcon icon={faChevronRight}  style={{ marginRight: '10px' }} />
                            )}</h2>
                        </div>

                        {price && (
                          <>
                            <label style={{ marginRight: '10px' }}>
                              <input type="checkbox" name="filterOption1" />nhỏ hơn 200k
                            </label>
                            <label>
                              <input type="checkbox" name="filterOption2" /> lớn hơn 200K
                            </label>
                            {/* Add more filter options as needed */}
                          </>
                        )}
                      
                    </div>  

                    

                    
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};
export default Section;
