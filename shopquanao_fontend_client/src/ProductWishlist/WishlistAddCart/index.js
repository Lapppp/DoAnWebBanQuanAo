import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const WishlistAddCart=()=>{
    var { id } = useParams();
    const navigate = useNavigate();
    const [favorite, setfavorite] = useState({});
    const [color, setcolor] = useState([]);
    const [size, setsize] = useState([]);
    const [productdetailId, setproductdetailId] = useState({});
    const [cart, setcart] = useState({user_id:"",product_detail_id:"",quantity:""});
    useEffect(() => {
        axios.get(`http://localhost:8000/api/favoriteid/${id}`)
        .then(res=>setfavorite(res.data))
        axios.get(`http://localhost:8000/api/colors`)
        .then(res=>setcolor(res.data))
        axios.get(`http://localhost:8000/api/sizes`)
        .then(res=>setsize(res.data))
        
    }, []);
    const [productdetail, setproductdetail] = useState({
        product_id: favorite.product_id,
        color_id: "",
        size_id: ""
      });
   

    const handleChangesize=(e)=>{
        //let name =' color_id';
        let value = e.target.value;
        setproductdetail(prev => ({ ...prev, product_id: favorite.product_id, size_id: value }))
       
    }
    const handleChangecolor=(e)=>{
        //let name =' color_id';
        let value = e.target.value;
        setproductdetail(prev => ({ ...prev, color_id: value }))
        setcart(prev => ({ ...prev,user_id: favorite.user_id }))
    }
    const handleChangequantity=(e)=>{
        let value=e.target.value;

        setcart(prev => ({ ...prev, quantity:parseInt(value, 10)}))

    }
    console.log(productdetail);
   


    const handleSudmit=(e)=>{
        e.preventDefault();
        axios.post(`http://localhost:8000/api/idproductdetail`, productdetail)
        .then(response => {
            const productDetailId = response.data.id;
        //   setproductdetailId(response.data);
        //   setcart(prev => ({ ...prev, product_detail_id: response.data.id }));
        //   console.log(cart)
           axios.post('http://localhost:8000/api/cart', {user_id:cart.user_id,quantity:cart.quantity,product_detail_id:productDetailId})
           .then(() => {
            // Chuyển hướng sau khi tất cả các yêu cầu hoàn tất
            navigate('/home/wishlist');
          })
    
          
        })
       
          // Gọi yêu cầu POST thứ hai
           
    
       
       
       




    }


    return (<>
    <div >
           <h3 style={{ textAlign: "center"}}>  <span style={{ color: "blue" }}>Chọn màu   </span> {" "}
        <span style={{ color: "yellow" }}> và size</span></h3>
           <form                    
               style={{
                   width: "300px", // Đặt chiều rộng form theo mong muốn
                   margin: "0 auto" // Căn giữa form trên trang
               }}
           >
               <div style={{ marginBottom: "15px" }}>
                   <label style={{ display: "block", marginBottom: "5px" }}>Size:</label>
                   <select
                   style={{
                       width: "100%",
                       padding: "8px",
                       border: "1px solid #ccc",
                       borderRadius: "4px"
                       
                   }}
                   onChange={handleChangesize}
                   ><option value="">-- Chọn size --</option>
                   {size.map(item=>
                    <option name="sizename" value={item.id}>{item.name}</option>
                   )
                    
                   }
                  
                  
                   </select>
               </div>

               <div style={{ marginBottom: "15px" }}>
                   <label style={{ display: "block", marginBottom: "5px" }}>Color:</label>
                   <select
                   
                   style={{
                       width: "100%",
                       padding: "8px",
                       border: "1px solid #ccc",
                       borderRadius: "4px"
                   }}
                   onChange={handleChangecolor}
                   >
                    <option value="">-- Chọn màu --</option>
                     {color.map(item=>
                    <option name="colorname" value={item.id}>{item.name}</option>
                   )
                    
                   }
                   
                  
                   </select>
               </div>
               <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Số lượng: </label>
                <input  style={{
                       width: "100%",
                       padding: "8px",
                       border: "1px solid #ccc",
                       borderRadius: "4px"
                   }}  
                   type="number" 
                   name="quantity" 
                   onChange={handleChangequantity}
                   ></input>
               </div>

               <button
                   type="submit"
                   style={{
                   backgroundColor: "#4caf50",
                   color: "white",
                   padding: "10px",
                   border: "none",
                   borderRadius: "4px",
                   cursor: "pointer"
                   }}
                   onClick={ handleSudmit}
               >
               Thêm
               </button>
               <Link to={`/home/wishlist`}  className="btn btn-warning" style={{ marginRight: "5px" }} >
                          &lt;  Quay lại 
               </Link>
           </form>
        </div>
    
    
    
    
    
    </>)




}
export default WishlistAddCart;