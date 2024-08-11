import { useEffect, useState } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const CategoryProduct = ({
  hrefLink,
  srcImg,
  ProductName,
  ProductPrice,
  Images,
  OnSelectImage,
}) => {
  console.log("Images:", Images);

  const [activeIndex, setActiveIndex] = useState(null);
  const handleImageClick = (index) => {
    setActiveIndex(index);
  };
  return (

    <li className="item col-lg-3 col-md-3 col-sm-4 col-xs-6">
      <div className="item-inner">
        <div className="item-img">
          <div className="item-img-info">
            <Link
              to={hrefLink}
              className="product-image"
              title="Retis lapen casen"
            >
              <img alt={ProductName} src={srcImg} />
            </Link>
            <div className="box-hover">
              <ul className="add-to-links">
                <li>
                  <a
                    className="link-wishlist"
                    href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/wishlist.html"
                  ></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
<h3>oke</h3>
        <div className="item-info">
          <div className="info-inner">
            <Link to={hrefLink} style={{ textDecoration: "none" }}>
              <div
                className="item-title"
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#333",
                  marginLeft: "10px",
                }}
              >
                {ProductName}
              </div>
            </Link>
            <div className="item-content">
              <div className="item-price">
                <div className="price-box">
                  <Link to={hrefLink} style={{ textDecoration: "none" }}>
                    <span className="regular-price">
                      <span
                        className="price"
                        style={{
                          fontSize: "20px",
                          color: "red",
                          fontWeight: "bold",
                        }}
                      >
                        {`${ProductPrice.toLocaleString("vi-VN")} đ`}
                      </span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
export default CategoryProduct;
