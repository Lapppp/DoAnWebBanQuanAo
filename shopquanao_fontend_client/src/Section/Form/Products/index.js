import {useState } from "react";


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const Products = ({
  hrefLink,
  srcImg,
  ProductName,
  ProductPrice,
  Images,
 
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
            {" "}
            <Link to={hrefLink}
              className="product-image"
              title="Retis lapen casen"
             
            >
              {" "}
              <img alt={ProductName} src={srcImg} />
            </Link> 
            <div className="box-hover">
              <ul className="add-to-links">
                
                <li>
                  <a
                    className="link-wishlist"
                    href="http://localhost:3001/home/wishlist"
                  >  
                    {" "}
                  </a>
                </li>
                
              </ul>
            </div>
          </div>
        </div>

        <div className="item-info">
          <div className="info-inner">
          <Link to={hrefLink}  >
            <div className="item-title" >
             
                {" "}
                {ProductName}{" "}
              
            </div>
            </Link>
            <div className="item-content ">
             
              <div className="item-price">
                <div className="price-box" >
                <Link to={hrefLink}>
  <span className="regular-price">
    <span className="price">
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
export default Products;
