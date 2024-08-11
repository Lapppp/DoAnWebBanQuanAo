import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const InvoicedetailEdit =()=>{
    const navigate = useNavigate();
    var { id } = useParams();

    const [invoicedetail, setinvoicedetail] = useState({});
    const [update, setupdate] = useState({
        id:invoicedetail.invoicedetail_id,
        price:invoicedetail.invoicedetailprice,
        quantity:invoicedetail.invoicedetailquantity,
        product_detail_id:invoicedetail.productdetail_id,
        invoice_id:invoicedetail.invoice_id
    });

console.log(update)

    const handleChange=(e)=>{
        let name=e.target.name; 
        let value=e.target.value;  
        if(name==='quantity') {
          setupdate(
            { 
             id:invoicedetail.invoicedetail_id,
            price:invoicedetail.invoicedetailprice,
            product_detail_id:invoicedetail.productdetail_id,
            invoice_id:invoicedetail.invoice_id, quantity: value });
        }


    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8000/api/invoicedetail/${id}`,update)
        .then(navigate('/admin/invoice'))

    }
  


    useEffect(() => {
        axios.get(`http://localhost:8000/api/productname_invoicedetail/${id}`)
        .then(res=>setinvoicedetail(res.data))
        
        

        
    }, [id]);




    return (
    <>
        <Form className="col-md-4 mt-3">

            <Form.Group className="mb-3">
                <Form.Label>Tên sản phẩm:</Form.Label>
                <Form.Control 
                type="text" 
                name="productname" 
                value={ invoicedetail.productname} 
               onChange={handleChange } 
               readonly/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>màu:</Form.Label>
                <Form.Control 
                type="text" 
                name="color" 
                value={ invoicedetail.colorname}
               onChange={handleChange }
               readonly />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>size:</Form.Label>
                <Form.Control 
                type="text" 
                name="size" 
                value={ invoicedetail.sizename}  
               onChange={handleChange } 
               readonly/>
            </Form.Group>


            <Form.Group className="mb-3">
                <Form.Label>số lượng: </Form.Label>
                <Form.Control 
                type="mumper" 
                name="quantity" 
                defaultValue={ invoicedetail.invoicedetailquantity}
                  
               onChange={handleChange } />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>đơn giá: </Form.Label>
                <Form.Control 
                type="text" 
                name="price"
                value={ invoicedetail.invoicedetailprice}
  
               onChange={handleChange }  
                readonly/>
            </Form.Group>

           
            

            <Button type="submit" variant="success" onClick={handleSubmit} >
                <FontAwesomeIcon icon={faCheck}  /> cập nhật 
            </Button>
        </Form>
         
    
    
    
    
    
    
    
    </>)





}


export default  InvoicedetailEdit;