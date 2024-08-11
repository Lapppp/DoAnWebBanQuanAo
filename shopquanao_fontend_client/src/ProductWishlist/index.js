import { faCartShopping, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductWishlist=()=>{
    const [favorite, setfavorite] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8000/api/favorite/1`)
        .then(res=>setfavorite(res.data))
    }, []);

    const [showcart, setshowcart] = useState(false);


    const handleShow=()=>{
        console.log("handleShow được gọi");
        setshowcart(true);

    }
    const handleSubmit=()=>{
        setshowcart(false);
    }
    const handleDelete=(e,id)=>{
        e.preventDefault();
        console.log(id);
        axios
        .delete(`http://localhost:8000/api/favorite/${id}`)
        .then(() => axios.get(`http://localhost:8000/api/favorite/1`))
        .then((response) => setfavorite(response.data))

    }


    return(<>
    
   
   
    <div className="row " style={{marginBottom: "20px"}}>
         {favorite.map(item=>
        <div className="col-md-4 text-center ">
            <div className="card h-100">
            <img className="card-img-top" alt="Image 1" />
            <div className="card-body">
                <h4 className="card-title">{item.productname}</h4>
                <h5 className="text-danger">{item.price}</h5>
                <p className="card-text" dangerouslySetInnerHTML={{ __html: item.mota }}></p>
            </div>
            <div className="card-footer bg-white border-0">
            
                
                <Link to={`/home/wishlistaddcart/${item.product_favorite_id}`}  className="btn btn-primary" style={{ marginRight: "5px" }} >
                    <FontAwesomeIcon icon={faCartShopping} />&#43;         
                </Link>
                <Button variant="danger"   >
                    <FontAwesomeIcon icon={faTrash} onClick={(e)=>{handleDelete(e,item.product_favorite_id)}}/>
                </Button>
            </div>
            </div>
        </div>
        
        )} 
        

        
        

  
    </div>

    <Link to={`/home`}  className="btn btn-warning" style={{ marginRight: "5px" }} >
                          &lt;  Quay về trang sản phẩm
    </Link>

    
    </>)

}
export default ProductWishlist;