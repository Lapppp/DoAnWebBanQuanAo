import axios from "axios";

import {  useEffect, useState } from "react";

import {  Link, useNavigate, useParams } from "react-router-dom";
//import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Modal } from 'react-bootstrap';


const Cart = () => {
  const navigate = useNavigate();
  //var { id } = useParams()
  //const id=localStorage.getItem("authToken");
  // lấy id khi người dùng check vào ô checkbox
  //hàm lấy ngày hiện tại 
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  //user_id phải là giá trị của token 
  const [invoice, setinvoice] = useState({user_id:1,status:1,invoicedate:getCurrentDate()});
  // lấy tất cả giỏ hầng 
  const [cart, setcart] = useState([]);

 useEffect(() => {
  // truyền gía trị của token 
  axios.get(`http://localhost:8000/api/urlimage/1`)
  .then(res=>setcart(res.data))

  
 }, []);

  const handleChange=(e)=>{
    let name = e.target.name;
    let value = e.target.value; 
    if(name==="shippingaddress")
    {
      //name="address";
      setinvoice(prev=>({...prev,[name]:value}));

    }else if(name==="shippingphone")
    {
      //name="phone";
      setinvoice(prev=>({...prev,[name]:value}));

    }
    setinvoice(prev=>({...prev,[name]:value}));

  }
  //console.log(invoice)

 
  
  
// cộng trừ số lượng
  const handleCong=(id ,e)=>{
    e.preventDefault();
    axios.get(`http://localhost:8000/api/congquantity/${id}`)   
    axios.get(`http://localhost:8000/api/urlimage/1`)
    .then(res=>setcart(res.data))
  }

  const handleTru=(id ,e)=>{
    e.preventDefault();
    axios.get(`http://localhost:8000/api/truquantity/${id}`)
    axios.get(`http://localhost:8000/api/urlimage/1`)
    .then(res=>setcart(res.data))

  }





  // checkbox 
  const [selectAll, setSelectAll] = useState(false);
 
  const [selectedItems, setSelectedItems] = useState([]);  
      // Hàm chọn tất cả
 


  const [selectId, setselectId] = useState([]);
     // Hàm chọn từng phần tử
  const handleSelectItem = (cartId) => {
  
    setSelectedItems(prevSelected => {
   
      if (prevSelected.includes(cartId)) {

        // Nếu đã chọn thì bỏ chọn
        setSelectAll(false);
        // Hủy chọn phần tử và xóa khỏi selectId
        setselectId((prev) => {
          const { [cartId]: removed, ...rest } = prev;
          return rest;
        });
        return prevSelected.filter(id => id !== cartId);

      } else {

        // Nếu chưa chọn thì thêm vào danh sách chọn
        // lấy id
        setselectId((prev) => ({ ...prev, [cartId]: true }));
        return [...prevSelected, cartId];

      }
    
    });
    
    setSelectAll(cart.every(item => selectedItems.includes(item.cart_id)));
  };
  //Object.keys(selectId) Hàm này trả về một mảng chứa tất cả các keys của đối tượng selectId.
  //hàm reduce được sử dụng để lặp qua mảng keys và tạo ra một đối tượng mới.
  //      result là đối tượng đang được xây dựng, và key là mỗi key trong mảng.
  const selected = Object.keys(selectId).reduce((result, key) => {
    result[key] = selectId[key] ? key : null;
    return result;
  }, {});
  
  console.log(selected);
 
  




  //xóa toàn giỏ hàng 
 
 const handleUpdate=(cart_id,e)=>{
    e.preventDefault();
    axios.delete(`http://localhost:8000/api/cart/${cart_id}`)
    .then(() => {
      // Bước 2: Sau khi xóa thành công, cập nhật giỏ hàng
      // số 1 là id của user
      return axios.get(`http://localhost:8000/api/urlimage/1`);
    })
    .then((res) => {
      // Bước 3: Đặt dữ liệu giỏ hàng đã cập nhật
      setcart(res.data);
    })
  }



  var tam=0;
  // thanh toán t checkbox;
 
  const [addInvoicedetail, setaddInvoicedetail] = useState([]);
  const [show, setshow] = useState(false);
  const handleSudmitAll=()=>{

    axios.post(`http://localhost:8000/api/invoice`,invoice)
    .then((res)=>{
      let postRequests = [];
      Object.keys(selectId).map((cartId) => {
      cart.map((cartItem) => {
        if (cartId === cartItem.cart_id.toString()) {
          
          axios.post(`http://localhost:8000/api/paycart`,{ product_detail_id: cartItem.product_detail_id,
          quantity: cartItem.quantity,
          price: cartItem.price,
          user_id:cartItem.user_id}
          ).then((res)=>{
            return axios.delete(`http://localhost:8000/api/cart/${cartId}`);
          }).catch(error => {
            if (error.response) {
              // Xử lý lỗi từ phản hồi HTTP
              console.log(error.response.data); // In dữ liệu JSON chứa thông báo lỗi từ phản hồi
            } else {
              // Xử lý lỗi không phải từ phản hồi HTTP
              console.error('Error:', error.message);
            }
          });
        }
        return null;
      });
      return Promise.all(postRequests);
      
    });
  })
  .then(() => navigate('/home')) 
   
  }
 // console.log(addInvoicedetail)

// khi nhấn mua hàng tạo 1 hóa đơn mới , và tạo các chi tiết cho hóa đơn đó lương 
  
  



  return ( <>
    <div className="shopping-cart-page">
      <div className="main-container col1-layout">
        <div className="container">
          <div className="row"></div>

          <div className="col-sm-12 col-xs-12">
            <article className="col-main">
              <div className="cart" />
              <div className="page-title">
                <h2>Shopping Cart</h2>
              </div>
              <div className="table-responsive">
                
                  {/* <input
                    type="hidden"
                    
                  /> */}
                  <fieldset>
                    <table
                      className="data-table cart-table"
                      id="shopping-cart-table"
                    >
                      <colgroup>
                        <col />
                        <col />
                        <col />
                        <col />
                        <col />
                        <col />
                        <col />
                      </colgroup>
                      <thead>
                        
                          <tr className="first last">
                           
                            <th rowSpan="1">&nbsp;</th>
                            <th rowSpan="1">
                              <span className="nobr">sản phẩm</span>
                            </th>
                            
                            <th colSpan="1" className="a-center">
                              <span className="nobr">thành tiền</span>
                            </th>
                            <th className="a-center" rowSpan="1">
                              Đơn giá 
                            </th>
                            <th colSpan="1" className="a-center">
                              Số lượng
                            </th>
                            <th className="a-center" rowSpan="1">
                              &nbsp;
                            </th>
                            <th>chức năng</th>
                          </tr>
                      
                      </thead>

                      <tbody>
                        {
                          cart.map(item=>
                        
                          <tr className="first odd">
                            <td name={item.cart}> <input type="checkbox"   checked={selectedItems.includes(item.cart_id)}
                              onChange={() => handleSelectItem(item.cart_id)}     />
                            </td>
                             
                            <td className="image">
                              <a
                                className="product-image"
                                title="Sample Product"
                                href="#/women-s-crepe-printed-black/"
                              >{item.productname}
                                <img
                                  width="75"
                                  alt=""
                                  // src={`http://localhost:8000/upload/images/${item.path}`}
                                />
                              </a>
                            </td>
                           
                            <td className="a-center">
                              <a
                                title="Edit item parameters"
                                className="edit-bnt"
                                href="#configure/id/15945/"
                              > {item.price*item.quantity}
                                {" "}
                              </a>
                            </td>
                            <td className="a-right">
                              <span className="cart-price">
                                {" "}
                                <span className="price" name="price">{item.price}</span>{" "}
                              </span>
                            </td>
                            <td className="a-center movewishlist">
                              <button className="btn btn-white"  onClick={(e)=>{handleTru(item.cart_id,e)}} >-</button>
                            
                              <span style={{ border: '1px solid', padding: '5px' }} name="quantity">{item.quantity}</span>
                              <button className="btn btn-white" onClick={(e)=>{handleCong(item.cart_id,e)}} >+</button>
                            </td>
                            <td className="a-right movewishlist">
                              <span className="cart-price">
                                {" "}
                                <span className="price"></span>{" "}
                              </span>
                            </td> 
                            <td className="a-center last">
                            <Button variant="danger" onClick={ (e)=>{handleUpdate(item.cart_id,e)}}  >
                                                         <FontAwesomeIcon icon={faTrash} />
                             </Button>
                                   
                          </td> 
                          </tr>
                       )} 
                        
                      </tbody>
                      <tfoot>
                        <tr className="first last">
                          <td className="a-right last" colSpan="8">
                          <Link to={`/home`}  className="btn btn-warning" style={{ marginRight: "5px" }} >
                          &lt;  Tiếp tục mua hàng
                           </Link>
                           
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </fieldset>
               
              </div>
              {/* BEGIN CART COLLATERALS */}
              <div className="cart-collaterals row">
                <div className="col-sm-6">
                 
                   <div className="shipping" >
                    <h3>Thông tin nhận hàng</h3>
                    <div className="shipping-form">
                      <form
                        id="shipping-zip-form"
                        method="post"
                        action="#estimatePost/"
                      >
                       
                        <ul className="form-list"  >
                          <li>
                            <label className="required" >
                              <em>*</em>Ngày đặt hàng:
                            </label>
                            <li>
                              <div className="input-box" >
                                <input
                                  type="date"                                
                                  name="invoicedate"
                                  onChange={handleChange}
                                  value={getCurrentDate()}
                                  className="input-text validate-postcode"
                                  style={{ color: 'black' }}
                                />
                              </div>
                            </li>
                          </li>
                          {/* <li>
                            <label className="required" >
                              <em>*</em>Tên người nhận hàng:
                            </label>
                            <li>
                              <div className="input-box">
                                <input
                                  type="text" 
                                  onChange={handleChange}                               
                                  name="fullname"
                                  className="input-text validate-postcode"
                                  style={{ color: 'black' }}
                                />
                              </div>
                            </li>
                           
                          </li> */}

                          <li>
                            <label className="required" >
                              <em>*</em>Địa chỉ nhận hàng:
                            </label>
                            <li>
                              <div className="input-box">
                                <input
                                  type="text" 
                                  onChange={handleChange}                               
                                  name="shippingaddress"
                                  className="input-text validate-postcode"
                                  style={{ color: 'black' }}
                                />
                              </div>
                            </li>
                           
                          </li>
                          <li>
                            <label className="required" > <em>*</em>Số điện thoại nhận hàng:</label>
                            <div className="input-box">
                              
                              <input
                                type="text"
                                className="input-text required-entry"
                                name="shippingphone"
                                onChange={handleChange}
                                style={{ color: 'black' }}
                              />
                            </div>
                          </li>
                          <li>
                            <label className="required" ><em>*</em>Phương thức thanh toán:</label>
                            <div className="input-box">
                              <input
                                type="text"
                                onChange={handleChange}
                                name="code"
                               
                                className="input-text validate-postcode"
                              />
                            </div>
                          </li>
                        </ul>
                        <div className="buttons-set11">
                          <button
                            className="button get-quote"
                            onclick="coShippingMethodForm.submit()"
                            title="Get a Quote"
                            type="button"
                          >
                            <span>Lấy thông tin từ tài khoản</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  



                </div>

                {/* <div className="col-sm-4">
                  <div className="discount">
                    <h3>Discount Codes</h3>
                    <form
                      method="post"
                      action="#couponPost/"
                      id="discount-coupon-form"
                    >
                      <label for="coupon_code">
                        Enter your coupon code if you have one.
                      </label>
                      <input
                        type="hidden"
                        value="0"
                        id="remove-coupone"
                        name="remove"
                      />
                      <input
                        type="text"
                        value=""
                        name="coupon_code"
                        id="coupon_code"
                        className="input-text fullwidth"
                      />
                      <button
                        value="Apply Coupon"
                        onclick="discountForm.submit(false)"
                        className="button coupon "
                        title="Apply Coupon"
                        type="button"
                      >
                        <span>Apply Coupon</span>
                      </button>
                    </form>
                  </div>
                </div> */}

                <div className="totals col-sm-6">
                  <h3>Tổng giỏ hàng</h3>
                  <div className="inner">
                    <table
                      className="table shopping-cart-table-total"
                      id="shopping-cart-totals-table"
                    >
                      <colgroup>
                        <col />
                        <col />
                      </colgroup>
                      <tbody>
                        <tr>
                          <td colSpan="1" className="a-left">
                            Tổng tiền
                          </td>
                          <td className="a-right">
                            $77.38
                          </td>
                        </tr>
                       
                      </tbody>
                      <tfoot>
                          <tr>
                              <td colSpan="1" className="a-left">
                                <strong>Tổng tiền cần thanh toán</strong>
                              </td>
                              <td className="a-right"  >
                                 $77.38
                                
                              </td>
                            </tr>
                      </tfoot>
                    </table>
                    <ul className="checkout">
                      <li>
                        <button
                          className="button btn-proceed-checkout"
                          title="Proceed to Checkout"
                          type="button"
                          onClick={handleSudmitAll}
                        >
                          <span>Mua Hàng</span>
                        </button>
                      </li>
                      <li>
                        <a
                          title="Checkout with Multiple Addresses"
                          href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/multiple_addresses.html"
                        >
                          Checkout with Multiple Addresses
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                {/*cart-collaterals*/}
                {/* <div className="crosssel">
                  <div className="new_title">
                    <h2>you may be interested</h2>
                  </div>
                  <div className="category-products">
                    <ul className="products-grid">
                      <li className="item col-lg-3 col-md-3 col-sm-4 col-xs-6">
                        <div className="item-inner">
                          <div className="item-img">
                            <div className="item-img-info"> <a className="product-image" title="Retis lapen casen" href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/product_detail.html"> <img alt="Retis lapen casen" src="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/products-images/product10.jpg"/>  </a>
                              <div className="box-hover">
                                <ul className="add-to-links">
                                  <li><a className="link-quickview" href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/quick_view.html"> </a></li>
                                  <li><a className="link-wishlist" href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/wishlist.html"> </a></li>
                                  <li><a className="link-compare" href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/compare.html"> </a></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="item-info">
                            <div className="info-inner">
                              <div className="item-title"> <a title="Retis lapen casen" href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/product_detail.html"> Retis lapen casen  </a> </div>
                              <div className="item-content">
                                <div className="rating">
                                  <div className="ratings">
                                    <div className="rating-box">
                                     <div className="rating width80"></div>
                                    </div>
                                    <p className="rating-links"> <a href="a">1 Review(s) </a> <span className="separator">|</span> <a href="a">Add Review </a> </p>
                                  </div>
                                </div>
                                <div className="item-price">
                                  <div className="price-box"> <span className="regular-price"> <span className="price">$155.00</span> </span> </div>
                                </div>
                                <div className="action">
                                  <button className="button btn-cart" type="button" title="" data-original-title="Add to Cart"><span>Add to Cart</span> </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="item col-lg-3 col-md-3 col-sm-4 col-xs-6">
                        <div className="item-inner">
                          <div className="item-img">
                            <div className="item-img-info"> <a className="product-image" title="Retis lapen casen" href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/product_detail.html"> <img alt="Retis lapen casen" src="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/products-images/product1.jpg"/>  </a>
                              <div className="box-hover">
                                <ul className="add-to-links">
                                  <li><a className="link-quickview" href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/quick_view.html"> </a></li>
                                  <li><a className="link-wishlist" href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/wishlist.html"> </a></li>
                                  <li><a className="link-compare" href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/compare.html"> </a></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="item-info">
                            <div className="info-inner">
                              <div className="item-title"> <a title="Retis lapen casen" href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/product_detail.html"> Retis lapen casen  </a> </div>
                              <div className="item-content">
                                <div className="rating">
                                  <div className="ratings">
                                    <div className="rating-box">
                                     <div className="rating width80"></div>
                                    </div>
                                    <p className="rating-links"> <a href="a">1 Review(s) </a> <span className="separator">|</span> <a href="a">Add Review </a> </p>
                                  </div>
                                </div>
                                <div className="item-price">
                                  <div className="price-box"> <span className="regular-price"> <span className="price">$225.00</span> </span> </div>
                                </div>
                                <div className="action">
                                  <button className="button btn-cart" type="button" title="" data-original-title="Add to Cart"><span>Add to Cart</span> </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="item col-lg-3 col-md-3 col-sm-4 col-xs-6">
                        <div className="item-inner">
                          <div className="item-img">
                            <div className="item-img-info"> <a className="product-image" title="Retis lapen casen" href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/product_detail.html"> <img alt="Retis lapen casen" src="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/products-images/product2.jpg"/>  </a>
                              <div className="box-hover">
                                <ul className="add-to-links">
                                  <li><a className="link-quickview" href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/quick_view.html"> </a></li>
                                  <li><a className="link-wishlist" href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/wishlist.html"> </a></li>
                                  <li><a className="link-compare" href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/compare.html"> </a></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="item-info">
                            <div className="info-inner">
                              <div className="item-title"> <a title="Retis lapen casen" href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/product_detail.html"> Retis lapen casen  </a> </div>
                              <div className="item-content">
                                <div className="rating">
                                  <div className="ratings">
                                    <div className="rating-box">
                                     <div className="rating width80"></div>
                                    </div>
                                    <p className="rating-links"> <a href="a">1 Review(s) </a> <span className="separator">|</span> <a href="a">Add Review </a> </p>
                                  </div>
                                </div>
                                <div className="item-price">
                                  <div className="price-box"> <span className="regular-price"> <span className="price">$99.00</span> </span> </div>
                                </div>
                                <div className="action">
                                  <button className="button btn-cart" type="button" title="" data-original-title="Add to Cart"><span>Add to Cart</span> </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="item col-lg-3 col-md-3 col-sm-4 col-xs-6">
                        <div className="item-inner">
                          <div className="item-img">
                            <div className="item-img-info"> <a className="product-image" title="Retis lapen casen" href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/product_detail.html"> <img alt="Retis lapen casen" src="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/products-images/product3.jpg"/>  </a>
                              <div className="new-label new-top-left">new</div>
                              <div className="box-hover">
                                <ul className="add-to-links">
                                  <li><a className="link-quickview" href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/quick_view.html"> </a></li>
                                  <li><a className="link-wishlist" href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/wishlist.html"> </a></li>
                                  <li><a className="link-compare" href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/compare.html"> </a></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="item-info">
                            <div className="info-inner">
                              <div className="item-title"> <a title="Retis lapen casen" href="https://htmldemo.magikthemes.com/ecommerce/linea-html-template/blue/product_detail.html"> Retis lapen casen  </a> </div>
                              <div className="item-content">
                                <div className="rating">
                                  <div className="ratings">
                                    <div className="rating-box">
                                     <div className="rating width80"></div>
                                    </div>
                                    <p className="rating-links"> <a href="a">1 Review(s) </a> <span className="separator">|</span> <a href="a">Add Review </a> </p>
                                  </div>
                                </div>
                                <div className="item-price">
                                  <div className="price-box">
                                    <p className="special-price"> <span className="price-label">Special Price</span> <span className="price"> $156.00 </span> </p>
                                    <p className="old-price"> <span className="price-label">Regular Price:</span> <span className="price"> $167.00 </span> </p>
                                  </div>
                                </div>
                                <div className="action">
                                  <button className="button btn-cart" type="button" title="" data-original-title="Add to Cart"><span>Add to Cart</span> </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div> */}
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
   
  
    </>);
};

export default Cart;
