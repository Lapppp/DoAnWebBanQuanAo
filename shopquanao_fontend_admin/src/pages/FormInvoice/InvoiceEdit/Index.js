import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";



const InvoiceEdit =()=>{
     const navigate = useNavigate();
     var { id } = useParams();
    const [invoice, setInvoice] = useState( {});
    const [updateinvoice, setupdateinvoice] = useState({});
  
    useEffect(() => {
        axios.get(`http://localhost:8000/api/invoice/${id}`)
        .then(res=>{setInvoice(res.data);
            setupdateinvoice(res.data)})
    }, [id]);
    console.log(invoice);




    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setupdateinvoice(prev => ({ ...prev, [name]: value }));




    }

    // invoicedate:invoice.invoicedate,
    // shippingaddress:invoice.shippingaddress,
    // shippingphone:invoice.shippingphone,
    // user_id:invoice.user_id,
    // code:invoice.code,
    // status:invoice.status
    
console.log(updateinvoice)

    const handleSubmit = (e) => {
        e.preventDefault();
       
       
        axios.put(`http://localhost:8000/api/invoice/${id}`,updateinvoice)
             .then(()=>{navigate(`/admin/invoice`)});
       
    }


    //chuyển đổi yyyy-mm-dd
    const formatToYear = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };





    return(        <>

    <h3> Sửa thông tin hóa  hóa đơn : {invoice.id} </h3>
            <Form className="col-md-4 mt-3">

                <Form.Group className="mb-3">
                    <Form.Label>Ngày lập hóa đơn:</Form.Label>
                    <Form.Control 
                    type="date" 
                    name="invoicedate"  
                    value={formatToYear(invoice.invoicedate)} 
                    onChange={handleChange}  />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>địa chỉ nhận hàng:</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="shippingaddress" 
                    defaultValue={invoice.shippingaddress} 
                    onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>số điện thoại nhận hàng:</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="shippingphone"   
                    defaultValue={invoice.shippingphone} 
                    onChange={handleChange} />
                </Form.Group>

             
                <Form.Group className="mb-3">
                    <Form.Label>Hình thức thanh toán: </Form.Label>
                    <Form.Control 
                    type="text" 
                    name="code" 
                    defaultValue={invoice.code}   
                    onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>mã khách hàng lặp: </Form.Label>
                    <Form.Control 
                    type="number" 
                    name="user_id"  
                    defaultValue={invoice.user_id}  
                    onChange={handleChange}  
                    readonly/>
                </Form.Group>
                
                <Form.Group className="mb-3">
                    <Form.Label>Trạng thái: </Form.Label>
                    <Form.Control 
                    type="text" 
                    name="status"  
                    defaultValue={invoice.status} 
                    onChange={handleChange} />
                </Form.Group> 
                  
        
                <Button type="submit" variant="success" onClick={handleSubmit}>
                    <FontAwesomeIcon icon={faCheck}  /> cập nhật 
                </Button>
            </Form>
        </>

    )





}


export default InvoiceEdit;