import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../../../assets/style/ImageSlider.css";
import { Col, Row } from "react-bootstrap";
const ProductDetail = () => {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState([]); // no undefine
  const [selectedDetail, setSelectedImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [colorData, setColorData] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedSizeProductdetail, setSelectedSizeProductdetail] = useState(
    []
  );
  const [selectedColorProductdetail, setSelectedColorProductdetail] = useState(
    []
  );
  
  const [sizeData, setSizeData] = useState([]);

  console.log(productDetails);
  const [imageClick, setImageClick] = useState(false);
  const [sizeClick, setSizeClick] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/productdetails/${id}`)
      .then((res) => setProductDetails(res.data.products));
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/sizes`)
      .then((res) => setSizeData(res.data.sizes));
  }, []);
  

  const [countProduct, setCountProduct] = useState(1);

  const handleQuantityProductDetails = useCallback(
    (newCount) => {
      setCountProduct(newCount);
    },
    [setCountProduct]
  );

  const handleDecrease = () => {
    const newCount = countProduct - 1;
    setCountProduct(newCount);
    if(countProduct===1)
    {
      setCountProduct(1);
    }
  };

  const handleIncrease = () => {
    const newCount = countProduct + 1;
    setCountProduct(newCount);
  };
 
  
  
  const handlePoductDetais = (detail, detail_color_id, product_id) => {
    //id chi tiết sản phẩm
    setSelectedImage(detail);
    setImageClick(!imageClick);

    // id chi tiết color
    setSelectedColor(detail_color_id);
    // id chi tiết product
    setSelectedProductId(product_id);
    setColorData(detail_color_id);
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/sizeprodetails/${selectedColor}/${selectedProductId}`
      )
      .then((res) => setSelectedSizeProductdetail(res.data.sizes));
  }, [selectedColor, selectedProductId]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/colorprodetails/${colorData}`)
      .then((res) => setSelectedColorProductdetail(res.data.colors));
  }, [colorData]);

  const handleSizeClick = () => {
    setSizeClick(!sizeClick);
  };

  return (
    <>
      <section className="main-container col1-layout">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-xs-12">
              <article className="col-main">
                <div className="product-view">
                  {/* chi tiết sản  phẩm */}
                  {productDetails.map((product) => (
                    <div className="product-essential">
                      <h3>
                        <span>{product.category_name}</span>/
                        <span>{product.product_name}</span>
                      </h3>
                      <form
                        action="#"
                        method="post"
                        id="product_addtocart_form"
                      >
                        <div className="product-img-box col-lg-7 col-sm-5 col-xs-12">
                          <div className="new-label new-top-left"> New </div>
                          {/* hình ảnh sản phẩm */}
                          <div className="product-images-container">
                            <Row>
                              {product.product_Details.length > 0 && (
                                <React.Fragment>
                                  {product.product_Details
                                    .find(
                                      (detail) =>
                                        detail.detail_id === selectedDetail
                                    )
                                    ?.allImages.map((allImage, index) => (
                                      <Col
                                        key={index}
                                        md={6}
                                        className="Image-detail"
                                        
                                      >
                                        <div className="product-image">
                                          <div className="product-full">
                                            <img
                                              id={`product-zoom-default-${index}`}
                                              src={allImage.image}
                                              data-zoom-image={allImage.image}
                                              alt={`Product Zoom ${index}`}
                                            />
                                          </div>
                                        </div>
                                      </Col>
                                    ))}
                                  {!selectedDetail && (
                                    <>
                                      <div className="product-image">
                                        <div className="product-full">
                                          {product.product_Details[0].allImages.map(
                                            (image, index) => (
                                              <Col
                                                key={index}
                                                md={6}
                                                className="Image-detail"
                                                style={{marginBottom:"20px"}}
                                              >
                                                <img
                                                  key={index}
                                                  id={`product-zoom-default-${index}`}
                                                  src={image.image}
                                                  data-zoom-image={image.image}
                                                  alt={`Product Zoom  ${index}`}
                                                />
                                              </Col>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </React.Fragment>
                              )}
                            </Row>
                          </div>
                          {/* hình ảnh sản phẩm */}
                          {/* end: more-images */}
                        </div>

                        {
                          <div className="product-shop col-lg-5 col-sm-7 col-xs-12">
                            <div className="product-name">
                              <h2 className="product-font-size">
                                {product.product_name}
                              </h2>
                            </div>

                            <Row>
                              <Col md={7}>
                                <div>
                                  <span className="star-content">
                                    APK5177-CAM
                                  </span>
                                  <span sclassName="star-content">
                                    Đã bán 239K
                                  </span>
                                </div>
                              </Col>
                              <Col md={5}>
                                <div class="rating">
                                  <span className="star">&#9733;</span>
                                  <span className="star">&#9733;</span>
                                  <span className="star">&#9733;</span>
                                  <span className="star">&#9733;</span>
                                  <span className="star">&#9733;</span>
                                </div>
                              </Col>
                            </Row>

                            <div className="price-block">
                              <div className="price-box">
                                <p className="special-price">
                                  <span className="price-label">
                                    Special Price
                                  </span>
                                  <span className="price"></span>
                                </p>
                              
                              </div>
                            </div>

                            <div className="short-description">
                              <h2>
                                Màu sắc:

                                 {selectedColorProductdetail.length > 0 &&
                                    selectedColorProductdetail[0].name}
                                 
                              </h2>

                              <Row>
                                {product.product_Details.map((detail) => (
                                  <Col
                                    md={2}
                                    className={`Col-Image`}
                                    key={detail.detail_id}
                                  >
                                    <img
                                      onClick={() =>
                                        handlePoductDetais(
                                          detail.detail_id,
                                          detail.color_id,
                                          product.product_id
                                        )
                                      }
                                      className={`Image-Color ${
                                        imageClick === detail.detail_id
                                          ? "Image-Clicked"
                                          : ""
                                      }`}
                                      src={detail.images}
                                      alt="ảnh lỗi"
                                    />
                                  </Col>
                                ))}
                              </Row>
                            </div>
                            <div className="short-description">
                              <h2>Kích Cỡ:</h2>
                              <Row>
                                {selectedSizeProductdetail.map(
                                  (selectedSize) => {
                                    const viewSize = sizeData.find(
                                      (size) => size.id === selectedSize.size_id
                                    );

                                    return viewSize ? (
                                      <Col md={2} key={viewSize.id}>
                                        <button
                                          className="btn-size Col-Size"
                                          onClick={handleSizeClick}
                                        >
                                          {viewSize.name}
                                        </button>
                                      </Col>
                                    ) : null;
                                  }
                                )}
                              </Row>
                            </div>

                            <div className="add-to-box">
                              <div className="add-to-cart">
                                <div className="pull-left">
                                  <div className="custom pull-left">
                                    <button
                                      onClick={()=>handleQuantityProductDetails(handleDecrease)}
                                      className="reduced items-count"
                                      type="button"
                                    >
                                      <i className="fa fa-minus">&nbsp;</i>
                                    </button>
                                    <input
                                      type="text"
                                      className="input-text qty"
                                      title="Qty"
                                      value={countProduct}
                                      maxlength="12"
                                      id="qty"
                                      name="qty"
                                    />
                                    <button
                                  onClick={()=>handleQuantityProductDetails(handleIncrease)}
                                      className="increase items-count"
                                      type="button"
                                    >
                                      <i className="fa fa-plus">&nbsp;</i>
                                    </button>
                                  </div>
                                </div>
                                <button
                                  className="button btn-cart"
                                  title="Add to Cart"
                                  type="button"
                                >
                                  Add to Cart
                                </button>
                              </div>
                            </div>
                            <div className="email-addto-box">
                              <ul className="add-to-links">
                                <li>
                                  <a
                                    className="link-wishlist"
                                    href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/wishlist.html"
                                  >
                                    <span>Add to Wishlist</span>
                                  </a>
                                </li>
                                <li>
                                  <span className="separator">|</span>
                                  <a
                                    className="link-compare"
                                    href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/compare.html"
                                  >
                                    <span>Add to Compare</span>
                                  </a>
                                </li>
                              </ul>
                              <p className="email-friend">
                                <a href="a">
                                  <span>Email to a Friend</span>
                                </a>
                              </p>
                            </div>
                            <div className="social">
                              <ul className="link">
                                <li className="fb">
                                  <a href="a"> </a>
                                </li>
                                <li className="tw">
                                  <a href="a"> </a>
                                </li>
                                <li className="googleplus">
                                  <a href="a"> </a>
                                </li>
                                <li className="rss">
                                  <a href="a"> </a>
                                </li>
                                <li className="pintrest">
                                  <a href="a"> </a>
                                </li>
                                <li className="linkedin">
                                  <a href="a"> </a>
                                </li>
                                <li className="youtube">
                                  <a href="a"> </a>
                                </li>
                              </ul>
                            </div>

                            <ul className="shipping-pro">
                              <li>Free Wordwide Shipping</li>
                              <li>30 days return</li>
                              <li>Member Discount</li>
                            </ul>
                          </div>
                        }
                      </form>
                    </div>
                  ))}
                  {/* chi tiết sản  phẩm */}

                  <div className="product-collateral">
                    <div className="add_info">
                      <ul
                        id="product-detail-tab"
                        className="nav nav-tabs product-tabs"
                      >
                        <li className="active">
                          <a href="#product_tabs_description" data-toggle="tab">
                            Product Description
                          </a>
                        </li>
                        <li>
                          <a href="#product_tabs_tags" data-toggle="tab">
                            Tags
                          </a>
                        </li>
                        <li>
                          <a href="#reviews_tabs" data-toggle="tab">
                            Reviews
                          </a>
                        </li>
                        <li>
                          <a href="#product_tabs_custom" data-toggle="tab">
                            Custom Tab
                          </a>
                        </li>
                        <li>
                          <a href="#product_tabs_custom1" data-toggle="tab">
                            Custom Tab1
                          </a>
                        </li>
                      </ul>
                      <div id="productTabContent" className="tab-content">
                        <div
                          className="tab-pane fade in active"
                          id="product_tabs_description"
                        >
                          <div className="std">
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Nam fringilla augue nec est tristique
                              auctor. Donec non est at libero vulputate rutrum.
                              Morbi ornare lectus quis justo gravida semper.
                              Nulla tellus mi, vulputate adipiscing cursus eu,
                              suscipit id nulla. Donec a neque libero.
                              Pellentesque aliquet, sem eget laoreet ultrices,
                              ipsum metus feugiat sem, quis fermentum turpis
                              eros eget velit. Donec ac tempus ante. Fusce
                              ultricies massa massa. Fusce aliquam, purus eget
                              sagittis vulputate, sapien libero hendrerit est,
                              sed commodo augue nisi non neque. Lorem ipsum
                              dolor sit amet, consectetur adipiscing elit. Sed
                              tempor, lorem et placerat vestibulum, metus nisi
                              posuere nisl, in accumsan elit odio quis mi. Cras
                              neque metus, consequat et blandit et, luctus a
                              nunc. Etiam gravida vehicula tellus, in imperdiet
                              ligula euismod eget. Pellentesque habitant morbi
                              tristique senectus et netus et malesuada fames ac
                              turpis egestas. Nam erat mi, rutrum at
                              sollicitudin rhoncus, ultricies posuere erat. Duis
                              convallis, arcu nec aliquam consequat, purus felis
                              vehicula felis, a dapibus enim lorem nec augue.
                            </p>
                            <p>
                              Nunc facilisis sagittis ullamcorper. Proin lectus
                              ipsum, gravida et mattis vulputate, tristique ut
                              lectus. Sed et lorem nunc. Vestibulum ante ipsum
                              primis in faucibus orci luctus et ultrices posuere
                              cubilia Curae; Aenean eleifend laoreet congue.
                              Vivamus adipiscing nisl ut dolor dignissim semper.
                              Nulla luctus malesuada tincidunt. className aptent
                              taciti sociosqu ad litora torquent per conubia
                              nostra, per inceptos himenaeos. Integer enim
                              purus, posuere at ultricies eu, placerat a felis.
                              Suspendisse aliquet urna pretium eros convallis
                              interdum. Quisque in arcu id dui vulputate mollis
                              eget non arcu. Aenean et nulla purus. Mauris vel
                              tellus non nunc mattis lobortis.
                            </p>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="product_tabs_tags">
                          <div className="box-collateral box-tags">
                            <div className="tags">
                              <form id="addTagForm" action="#" method="get">
                                <div className="form-add-tags">
                                  <label for="productTagName">Add Tags:</label>
                                  <div className="input-box">
                                    <input
                                      className="input-text"
                                      name="productTagName"
                                      id="productTagName"
                                      type="text"
                                    />
                                    <button
                                      type="button"
                                      title="Add Tags"
                                      className=" button btn-add"
                                      onClick="submitTagForm()"
                                    >
                                      <span>Add Tags</span>
                                    </button>
                                  </div>
                                  {/*input-box*/}
                                </div>
                              </form>
                            </div>
                            {/*tags*/}
                            <p className="note">
                              Use spaces to separate tags. Use single quotes (')
                              for phrases.
                            </p>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="reviews_tabs">
                          <div
                            className="box-collateral box-reviews"
                            id="customer-reviews"
                          >
                            <div className="box-reviews1">
                              <div className="form-add">
                                <form
                                  id="review-form"
                                  method="post"
                                  action="http://www.magikcommerce.com/review/product/post/id/176/"
                                >
                                  <h3>Write Your Own Review</h3>
                                  <fieldset>
                                    <h4>
                                      How do you rate this product?
                                      <em className="required">*</em>
                                    </h4>
                                    <span id="input-message-box"></span>
                                    <table
                                      id="product-review-table"
                                      className="data-table"
                                    >
                                      <thead>
                                        <tr className="first last">
                                          <th>&nbsp;</th>
                                          <th>
                                            <span className="nobr">1 *</span>
                                          </th>
                                          <th>
                                            <span className="nobr">2 *</span>
                                          </th>
                                          <th>
                                            <span className="nobr">3 *</span>
                                          </th>
                                          <th>
                                            <span className="nobr">4 *</span>
                                          </th>
                                          <th>
                                            <span className="nobr">5 *</span>
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr className="first odd">
                                          <th>Price</th>
                                          <td className="value">
                                            <input
                                              type="radio"
                                              className="radio"
                                              value="11"
                                              id="Price_1"
                                              name="ratings[3]"
                                            />
                                          </td>
                                          <td className="value">
                                            <input
                                              type="radio"
                                              className="radio"
                                              value="12"
                                              id="Price_2"
                                              name="ratings[3]"
                                            />
                                          </td>
                                          <td className="value">
                                            <input
                                              type="radio"
                                              className="radio"
                                              value="13"
                                              id="Price_3"
                                              name="ratings[3]"
                                            />
                                          </td>
                                          <td className="value">
                                            <input
                                              type="radio"
                                              className="radio"
                                              value="14"
                                              id="Price_4"
                                              name="ratings[3]"
                                            />
                                          </td>
                                          <td className="value last">
                                            <input
                                              type="radio"
                                              className="radio"
                                              value="15"
                                              id="Price_5"
                                              name="ratings[3]"
                                            />
                                          </td>
                                        </tr>
                                        <tr className="even">
                                          <th>Value</th>
                                          <td className="value">
                                            <input
                                              type="radio"
                                              className="radio"
                                              value="6"
                                              id="Value_1"
                                              name="ratings[2]"
                                            />
                                          </td>
                                          <td className="value">
                                            <input
                                              type="radio"
                                              className="radio"
                                              value="7"
                                              id="Value_2"
                                              name="ratings[2]"
                                            />
                                          </td>
                                          <td className="value">
                                            <input
                                              type="radio"
                                              className="radio"
                                              value="8"
                                              id="Value_3"
                                              name="ratings[2]"
                                            />
                                          </td>
                                          <td className="value">
                                            <input
                                              type="radio"
                                              className="radio"
                                              value="9"
                                              id="Value_4"
                                              name="ratings[2]"
                                            />
                                          </td>
                                          <td className="value last">
                                            <input
                                              type="radio"
                                              className="radio"
                                              value="10"
                                              id="Value_5"
                                              name="ratings[2]"
                                            />
                                          </td>
                                        </tr>
                                        <tr className="last odd">
                                          <th>Quality</th>
                                          <td className="value">
                                            <input
                                              type="radio"
                                              className="radio"
                                              value="1"
                                              id="Quality_1"
                                              name="ratings[1]"
                                            />
                                          </td>
                                          <td className="value">
                                            <input
                                              type="radio"
                                              className="radio"
                                              value="2"
                                              id="Quality_2"
                                              name="ratings[1]"
                                            />
                                          </td>
                                          <td className="value">
                                            <input
                                              type="radio"
                                              className="radio"
                                              value="3"
                                              id="Quality_3"
                                              name="ratings[1]"
                                            />
                                          </td>
                                          <td className="value">
                                            <input
                                              type="radio"
                                              className="radio"
                                              value="4"
                                              id="Quality_4"
                                              name="ratings[1]"
                                            />
                                          </td>
                                          <td className="value last">
                                            <input
                                              type="radio"
                                              className="radio"
                                              value="5"
                                              id="Quality_5"
                                              name="ratings[1]"
                                            />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <input
                                      type="hidden"
                                      value=""
                                      className="validate-rating"
                                      name="validate_rating"
                                    />
                                    <div className="review1">
                                      <ul className="form-list">
                                        <li>
                                          <label
                                            className="required"
                                            for="nickname_field"
                                          >
                                            Nickname<em>*</em>
                                          </label>
                                          <div className="input-box">
                                            <input
                                              type="text"
                                              className="input-text"
                                              id="nickname_field"
                                              name="nickname"
                                            />
                                          </div>
                                        </li>
                                        <li>
                                          <label
                                            className="required"
                                            for="summary_field"
                                          >
                                            Summary<em>*</em>
                                          </label>
                                          <div className="input-box">
                                            <input
                                              type="text"
                                              className="input-text"
                                              id="summary_field"
                                              name="title"
                                            />
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="review2">
                                      <ul>
                                        <li>
                                          <label
                                            className="required "
                                            for="review_field"
                                          >
                                            Review<em>*</em>
                                          </label>
                                          <div className="input-box">
                                            <textarea
                                              rows="3"
                                              cols="5"
                                              id="review_field"
                                              name="detail"
                                            ></textarea>
                                          </div>
                                        </li>
                                      </ul>
                                      <div className="buttons-set">
                                        <button
                                          className="button submit"
                                          title="Submit Review"
                                          type="submit"
                                        >
                                          <span>Submit Review</span>
                                        </button>
                                      </div>
                                    </div>
                                  </fieldset>
                                </form>
                              </div>
                            </div>
                            <div className="box-reviews2">
                              <h3>Customer Reviews</h3>
                              <div className="box visible">
                                <ul>
                                  <li>
                                    <table className="ratings-table">
                                      <tbody>
                                        <tr>
                                          <th>Value</th>
                                          <td>
                                            <div className="rating-box">
                                              <div
                                                className="rating"
                                                style={{ width: "100%" }}
                                              ></div>
                                            </div>
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Quality</th>
                                          <td>
                                            <div className="rating-box">
                                              <div
                                                className="rating"
                                                style={{ width: "100%" }}
                                              ></div>
                                            </div>
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Price</th>
                                          <td>
                                            <div className="rating-box">
                                              <div
                                                className="rating"
                                                style={{ width: "100%" }}
                                              ></div>
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <div className="review">
                                      <h6>
                                        <a href="a"> Excellent </a>
                                      </h6>
                                      <small>
                                        Review by <span>Leslie Prichard </span>
                                        on 1/3/2014
                                      </small>
                                      <div className="review-txt">
                                        I have purchased shirts from Minimalism
                                        a few times and am never disappointed.
                                        The quality is excellent and the
                                        shipping is amazing. It seems like it's
                                        at your front door the minute you get
                                        off your pc. I have received my
                                        purchases within two days - amazing.
                                      </div>
                                    </div>
                                  </li>
                                  <li className="even">
                                    <table className="ratings-table">
                                      <tbody>
                                        <tr>
                                          <th>Value</th>
                                          <td>
                                            <div className="rating-box">
                                              <div
                                                className="rating"
                                                style={{ width: "100%" }}
                                              ></div>
                                            </div>
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Quality</th>
                                          <td>
                                            <div className="rating-box">
                                              <div
                                                className="rating"
                                                style={{ width: "100%" }}
                                              ></div>
                                            </div>
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Price</th>
                                          <td>
                                            <div className="rating-box">
                                              <div
                                                className="rating"
                                                style={{ width: "80%" }}
                                              ></div>
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <div className="review">
                                      <h6>
                                        <a href="#/catalog/product/view/id/60/">
                                          Amazing
                                        </a>
                                      </h6>
                                      <small>
                                        Review by <span>Sandra Parker</span>on
                                        1/3/2014
                                      </small>
                                      <div className="review-txt">
                                        Minimalism is the online !
                                      </div>
                                    </div>
                                  </li>
                                  <li>
                                    <table className="ratings-table">
                                      <tbody>
                                        <tr>
                                          <th>Value</th>
                                          <td>
                                            <div className="rating-box">
                                              <div
                                                className="rating"
                                                style={{ width: "100%" }}
                                              ></div>
                                            </div>
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Quality</th>
                                          <td>
                                            <div className="rating-box">
                                              <div
                                                className="rating"
                                                style={{ width: "100%" }}
                                              ></div>
                                            </div>
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Price</th>
                                          <td>
                                            <div className="rating-box">
                                              <div
                                                className="rating"
                                                style={{ width: "80%" }}
                                              ></div>
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <div className="review">
                                      <h6>
                                        <a href="#/catalog/product/view/id/59/">
                                          Nicely
                                        </a>
                                      </h6>
                                      <small>
                                        Review by <span>Anthony Lewis</span>on
                                        1/3/2014
                                      </small>
                                      <div className="review-txt last">
                                        Unbeatable service and selection. This
                                        store has the best business model I have
                                        seen on the net. They are true to their
                                        word, and go the extra mile for their
                                        customers. I felt like a purchasing
                                        partner more than a customer. You have a
                                        lifetime client in me.
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                              <div className="actions">
                                <a
                                  className="button view-all"
                                  id="revies-button"
                                  href="a"
                                >
                                  <span>
                                    <span>View all</span>
                                  </span>
                                </a>
                              </div>
                            </div>
                            <div className="clear"></div>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="product_tabs_custom">
                          <div className="product-tabs-content-inner clearfix">
                            <p>
                              <strong>Lorem Ipsum</strong>
                              <span>
                                &nbsp;is simply dummy text of the printing and
                                typesetting industry. Lorem Ipsum has been the
                                industry's standard dummy text ever since the
                                1500s, when an unknown printer took a galley of
                                type and scrambled it to make a type specimen
                                book. It has survived not only five centuries,
                                but also the leap into electronic typesetting,
                                remaining essentially unchanged. It was
                                popularised in the 1960s with the release of
                                Letraset sheets containing Lorem Ipsum passages,
                                and more recently with desktop publishing
                                software like Aldus PageMaker including versions
                                of Lorem Ipsum.
                              </span>
                            </p>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="product_tabs_custom1"
                        >
                          <div className="product-tabs-content-inner clearfix">
                            <p>
                              <strong> Comfortable </strong>
                              <span>
                                &nbsp;preshrunk shirts. Highest Quality
                                Printing. 6.1 oz. 100% preshrunk heavyweight
                                cotton Shoulder-to-shoulder taping Double-needle
                                sleeves and bottom hem Lorem Ipsumis simply
                                dummy text of the printing and typesetting
                                industry. Lorem Ipsum has been the industry's
                                standard dummy text ever since the 1500s, when
                                an unknown printer took a galley of type and
                                scrambled it to make a type specimen book. It
                                has survived not only five centuries, but also
                                the leap into electronic typesetting, remaining
                                essentially unchanged. It was popularised in the
                                1960s with the release of Letraset sheets
                                containing Lorem Ipsum passages, and more
                                recently with desktop publishing software like
                                Aldus PageMaker including versions of Lorem
                                Ipsum.
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Related Slider */}
                  <div className="related-pro">
                    <div className="slider-items-products">
                      <div className="related-block">
                        <div className="home-block-inner">
                          <div className="block-title">
                            <h2>Related Products</h2>
                          </div>
                        </div>
                        <div
                          id="related-products-slider"
                          className="product-flexslider hidden-buttons"
                        >
                          <div className="slider-items slider-width-col4 products-grid block-content">
                            <div className="item">
                              <div className="item-inner">
                                <div className="item-img">
                                  <div className="item-img-info">
                                    <a
                                      className="product-image"
                                      title="Retis lapen casen"
                                      href="product_detail.html"
                                    >
                                      <img
                                        alt="Retis lapen casen"
                                        src="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/products-images/product1.jpg"
                                      />
                                    </a>
                                    <div className="new-label new-top-right">
                                      new
                                    </div>
                                    <div className="box-hover">
                                      <ul className="add-to-links">
                                        <li>
                                          <a
                                            className="link-quickview"
                                            href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/quick_view.html"
                                          ></a>
                                        </li>
                                        <li>
                                          <a
                                            className="link-wishlist"
                                            href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/wishlist.html"
                                          ></a>
                                        </li>
                                        <li>
                                          <a
                                            className="link-compare"
                                            href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/compare.html"
                                          ></a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <div className="item-info">
                                  <div className="info-inner">
                                    <div className="item-title">
                                      <a
                                        title="Retis lapen casen"
                                        href="product_detail.html"
                                      >
                                        Retis lapen casen
                                      </a>
                                    </div>
                                    <div className="rating">
                                      <div className="ratings">
                                        <div className="rating-box">
                                          <div
                                            style={{ width: "80%" }}
                                            className="rating"
                                          ></div>
                                        </div>
                                        <p className="rating-links">
                                          <a href="a"> 1 Review(s) </a>
                                          <span className="separator">|</span>
                                          <a href="a"> Add Review </a>
                                        </p>
                                      </div>
                                    </div>
                                    <div className="item-content">
                                      <div className="item-price">
                                        <div className="price-box">
                                          <span className="regular-price">
                                            <span className="price">
                                              $125.00
                                            </span>
                                          </span>
                                        </div>
                                      </div>
                                      <div className="action">
                                        <button
                                          className="button btn-cart"
                                          type="button"
                                          title=""
                                          data-original-title="Add to Cart"
                                        >
                                          <span>Add to Cart</span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Item */}
                            <div className="item">
                              <div className="item-inner">
                                <div className="item-img">
                                  <div className="item-img-info">
                                    <a
                                      className="product-image"
                                      title="Retis lapen casen"
                                      href="product_detail.html"
                                    >
                                      <img
                                        alt="Retis lapen casen"
                                        src="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/products-images/product2.jpg"
                                      />
                                    </a>
                                    <div className="box-hover">
                                      <ul className="add-to-links">
                                        <li>
                                          <a
                                            className="link-quickview"
                                            href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/quick_view.html"
                                          ></a>
                                        </li>
                                        <li>
                                          <a
                                            className="link-wishlist"
                                            href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/wishlist.html"
                                          ></a>
                                        </li>
                                        <li>
                                          <a
                                            className="link-compare"
                                            href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/compare.html"
                                          ></a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <div className="item-info">
                                  <div className="info-inner">
                                    <div className="item-title">
                                      <a
                                        title="Retis lapen casen"
                                        href="product_detail.html"
                                      >
                                        Retis lapen casen
                                      </a>
                                    </div>
                                    <div className="item-content">
                                      <div className="rating">
                                        <div className="ratings">
                                          <div className="rating-box">
                                            <div
                                              style={{ width: "80%" }}
                                              className="rating"
                                            ></div>
                                          </div>
                                          <p className="rating-links">
                                            <a href="a"> 1 Review(s) </a>
                                            <span className="separator">|</span>
                                            <a href="a"> Add Review </a>
                                          </p>
                                        </div>
                                      </div>
                                      <div className="item-price">
                                        <div className="price-box">
                                          <span className="regular-price">
                                            <span className="price">
                                              $235.00
                                            </span>
                                          </span>
                                        </div>
                                      </div>
                                      <div className="action">
                                        <button
                                          className="button btn-cart"
                                          type="button"
                                          title=""
                                          data-original-title="Add to Cart"
                                        >
                                          <span>Add to Cart</span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* End Item */}

                            {/* Item */}
                            <div className="item">
                              <div className="item-inner">
                                <div className="item-img">
                                  <div className="item-img-info">
                                    <a
                                      className="product-image"
                                      title="Retis lapen casen"
                                      href="product_detail.html"
                                    >
                                      <img
                                        alt="Retis lapen casen"
                                        src="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/products-images/product3.jpg"
                                      />
                                    </a>
                                    <div className="box-hover">
                                      <ul className="add-to-links">
                                        <li>
                                          <a
                                            className="link-quickview"
                                            href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/quick_view.html"
                                          ></a>
                                        </li>
                                        <li>
                                          <a
                                            className="link-wishlist"
                                            href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/wishlist.html"
                                          ></a>
                                        </li>
                                        <li>
                                          <a
                                            className="link-compare"
                                            href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/compare.html"
                                          ></a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <div className="item-info">
                                  <div className="info-inner">
                                    <div className="item-title">
                                      <a
                                        title="Retis lapen casen"
                                        href="product_detail.html"
                                      >
                                        Retis lapen casen
                                      </a>
                                    </div>
                                    <div className="item-content">
                                      <div className="rating">
                                        <div className="ratings">
                                          <div className="rating-box">
                                            <div
                                              style={{ width: "80%" }}
                                              className="rating"
                                            ></div>
                                          </div>
                                          <p className="rating-links">
                                            <a href="a"> 1 Review(s) </a>
                                            <span className="separator">|</span>
                                            <a href="a"> Add Review </a>
                                          </p>
                                        </div>
                                      </div>
                                      <div className="item-price">
                                        <div className="price-box">
                                          <span className="regular-price">
                                            <span className="price">
                                              $325.00
                                            </span>
                                          </span>
                                        </div>
                                      </div>
                                      <div className="action">
                                        <button
                                          className="button btn-cart"
                                          type="button"
                                          title=""
                                          data-original-title="Add to Cart"
                                        >
                                          <span>Add to Cart</span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* End Item */}

                            <div className="item">
                              <div className="item-inner">
                                <div className="item-img">
                                  <div className="item-img-info">
                                    <a
                                      className="product-image"
                                      title="Retis lapen casen"
                                      href="product_detail.html"
                                    >
                                      <img
                                        alt="Retis lapen casen"
                                        src="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/products-images/product4.jpg"
                                      />
                                    </a>
                                    <div className="new-label new-top-left">
                                      new
                                    </div>
                                    <div className="box-hover">
                                      <ul className="add-to-links">
                                        <li>
                                          <a
                                            className="link-quickview"
                                            href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/quick_view.html"
                                          ></a>
                                        </li>
                                        <li>
                                          <a
                                            className="link-wishlist"
                                            href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/wishlist.html"
                                          ></a>
                                        </li>
                                        <li>
                                          <a
                                            className="link-compare"
                                            href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/compare.html"
                                          ></a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <div className="item-info">
                                  <div className="info-inner">
                                    <div className="item-title">
                                      <a
                                        title="Retis lapen casen"
                                        href="product_detail.html"
                                      >
                                        Retis lapen casen
                                      </a>
                                    </div>
                                    <div className="item-content">
                                      <div className="rating">
                                        <div className="ratings">
                                          <div className="rating-box">
                                            <div
                                              style={{ width: "80%" }}
                                              className="rating"
                                            ></div>
                                          </div>
                                          <p className="rating-links">
                                            <a href="a"> 1 Review(s) </a>
                                            <span className="separator">|</span>
                                            <a href="a"> Add Review </a>
                                          </p>
                                        </div>
                                      </div>
                                      <div className="item-price">
                                        <div className="price-box">
                                          <span className="regular-price">
                                            <span className="price">
                                              $425.00
                                            </span>
                                          </span>
                                        </div>
                                      </div>
                                      <div className="action">
                                        <button
                                          className="button btn-cart"
                                          type="button"
                                          title=""
                                          data-original-title="Add to Cart"
                                        >
                                          <span>Add to Cart</span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Item */}
                            <div className="item">
                              <div className="item-inner">
                                <div className="item-img">
                                  <div className="item-img-info">
                                    <a
                                      className="product-image"
                                      title="Retis lapen casen"
                                      href="product_detail.html"
                                    >
                                      <img
                                        alt="Retis lapen casen"
                                        src="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/products-images/product5.jpg"
                                      />
                                    </a>
                                    <div className="box-hover">
                                      <ul className="add-to-links">
                                        <li>
                                          <a
                                            className="link-quickview"
                                            href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/quick_view.html"
                                          ></a>
                                        </li>
                                        <li>
                                          <a
                                            className="link-wishlist"
                                            href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/wishlist.html"
                                          ></a>
                                        </li>
                                        <li>
                                          <a
                                            className="link-compare"
                                            href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/compare.html"
                                          ></a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <div className="item-info">
                                  <div className="info-inner">
                                    <div className="item-title">
                                      <a
                                        title="Retis lapen casen"
                                        href="product_detail.html"
                                      >
                                        Retis lapen casen
                                      </a>
                                    </div>
                                    <div className="item-content">
                                      <div className="rating">
                                        <div className="ratings">
                                          <div className="rating-box">
                                            <div
                                              style={{ width: "80%" }}
                                              className="rating"
                                            ></div>
                                          </div>
                                          <p className="rating-links">
                                            <a href="a"> 1 Review(s) </a>
                                            <span className="separator">|</span>
                                            <a href="a"> Add Review </a>
                                          </p>
                                        </div>
                                      </div>
                                      <div className="item-price">
                                        <div className="price-box">
                                          <span className="regular-price">
                                            <span className="price">
                                              $525.00
                                            </span>
                                          </span>
                                        </div>
                                      </div>
                                      <div className="action">
                                        <button
                                          className="button btn-cart"
                                          type="button"
                                          title=""
                                          data-original-title="Add to Cart"
                                        >
                                          <span>Add to Cart</span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* End Item */}
                            <div className="item">
                              <div className="item-inner">
                                <div className="item-img">
                                  <div className="item-img-info">
                                    <a
                                      className="product-image"
                                      title="Retis lapen casen"
                                      href="product_detail.html"
                                    >
                                      <img
                                        alt="Retis lapen casen"
                                        src="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/products-images/product6.jpg"
                                      />
                                    </a>
                                    <div className="box-hover">
                                      <ul className="add-to-links">
                                        <li>
                                          <a
                                            className="link-quickview"
                                            href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/quick_view.html"
                                          ></a>
                                        </li>
                                        <li>
                                          <a
                                            className="link-wishlist"
                                            href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/wishlist.html"
                                          ></a>
                                        </li>
                                        <li>
                                          <a
                                            className="link-compare"
                                            href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/compare.html"
                                          ></a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <div className="item-info">
                                  <div className="info-inner">
                                    <div className="item-title">
                                      <a
                                        title="Retis lapen casen"
                                        href="product_detail.html"
                                      >
                                        Retis lapen casen
                                      </a>
                                    </div>
                                    <div className="item-content">
                                      <div className="rating">
                                        <div className="ratings">
                                          <div className="rating-box">
                                            <div
                                              style={{ width: "80%" }}
                                              className="rating"
                                            ></div>
                                          </div>
                                          <p className="rating-links">
                                            <a href="a"> 1 Review(s) </a>
                                            <span className="separator">|</span>
                                            <a href="a"> Add Review </a>
                                          </p>
                                        </div>
                                      </div>
                                      <div className="item-price">
                                        <div className="price-box">
                                          <span className="regular-price">
                                            <span className="price">
                                              $225.00
                                            </span>
                                          </span>
                                        </div>
                                      </div>
                                      <div className="action">
                                        <button
                                          className="button btn-cart"
                                          type="button"
                                          title=""
                                          data-original-title="Add to Cart"
                                        >
                                          <span>Add to Cart</span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* Item */}
                            <div className="item">
                              <div className="item-inner">
                                <div className="item-img">
                                  <div className="item-img-info">
                                    <a
                                      className="product-image"
                                      title="Retis lapen casen"
                                      href="product_detail.html"
                                    >
                                      <img
                                        alt="Retis lapen casen"
                                        src="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/products-images/product7.jpg"
                                      />
                                    </a>
                                    <div className="box-hover">
                                      <ul className="add-to-links">
                                        <li>
                                          <a
                                            className="link-quickview"
                                            href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/quick_view.html"
                                          ></a>
                                        </li>
                                        <li>
                                          <a
                                            className="link-wishlist"
                                            href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/wishlist.html"
                                          ></a>
                                        </li>
                                        <li>
                                          <a
                                            className="link-compare"
                                            href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/compare.html"
                                          ></a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <div className="item-info">
                                  <div className="info-inner">
                                    <div className="item-title">
                                      <a
                                        title="Retis lapen casen"
                                        href="product_detail.html"
                                      >
                                        Retis lapen casen
                                      </a>
                                    </div>
                                    <div className="item-content">
                                      <div className="rating">
                                        <div className="ratings">
                                          <div className="rating-box">
                                            <div
                                              style={{ width: "80%" }}
                                              className="rating"
                                            ></div>
                                          </div>
                                          <p className="rating-links">
                                            <a href="a"> 1 Review(s) </a>
                                            <span className="separator">|</span>
                                            <a href="a"> Add Review </a>
                                          </p>
                                        </div>
                                      </div>
                                      <div className="item-price">
                                        <div className="price-box">
                                          <span className="regular-price">
                                            <span className="price">
                                              $185.00
                                            </span>
                                          </span>
                                        </div>
                                      </div>
                                      <div className="action">
                                        <button
                                          className="button btn-cart"
                                          type="button"
                                          title=""
                                          data-original-title="Add to Cart"
                                        >
                                          <span>Add to Cart</span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* End Item */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default ProductDetail;
