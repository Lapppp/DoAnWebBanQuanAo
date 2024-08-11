import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {  useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const InvoiceAdd =()=>{
     const navigate = useNavigate();
    const [invoice, setInvoice] = useState( {status:1});
    const [error, setError] = useState("");




    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if(value==='')
        {
            setError("không bỏ trống  dữ liệu ");

        }

        if(name==='shippingphone'&&!/^[0][0-9]{9}$/.test(value))
        {
            setError("Vui lòng nhập 10 số bắt đầu bằng số 0");

        }
        setInvoice(prev => ({ ...prev, [name]: value }));
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
     
        axios.post(`http://localhost:8000/api/invoice`,invoice)
             .then(()=>{navigate(`/admin/invoice`)});
            
       
    }
    console.log(invoice)





    return(        <>
    <h3> Thêm hóa đơn </h3>
            <Form  className="mt-4">
           

                <Form.Group className="mb-3">
                    <Form.Label>Ngày lập hóa đơn:</Form.Label>
                    <Form.Control 
                    type="date" 
                    name="invoicedate"  
                    onChange={handleChange}  
                    />
                </Form.Group>
                
                <Form.Group className="mb-3">
                   <Form.Label>địa chỉ nhận hàng:</Form.Label>
                    <Form.Control
                     type="text"  
                     placeholder="Nhập địa chỉ nhận hàng"
                    name="shippingaddress"
                     onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>số điện thoại nhận hàng:</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="shippingphone" 
                    placeholder="Nhập số điện thoại nhận hàng "
                    onChange={handleChange}
                    />
                    {error && <div className="text-danger">{error}</div>}
                </Form.Group>

                {/* <Form.Group className="mb-3">
                    <Form.Label>tổng tiền: </Form.Label>
                    <Form.Control 
                    type="text"
                    name="total"
                    onChange={handleChange}
                    />
                </Form.Group> */}

                <Form.Group className="mb-3">
                    <Form.Label>Hình thức thanh toán: </Form.Label>
                    <Form.Control
                    type="text" 
                     
                    name="code"
                    placeholder="chọn phương thức thanh toán"
                    onChange={handleChange} 
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>mã khách hàng lặp: </Form.Label>
                    <Form.Control 
                    type="number" 
                    name="user_id" 
                    onChange={handleChange} 
                    />
                </Form.Group>
               
               
                
          
                {/* <Form.Group className="mb-3">
                    <Form.Label>trạng thái :</Form.Label>
                    <Form.Control type="text" name="status" onChange={handleChange} />
                </Form.Group> */}
                
                {/* <Form.Group className="mb-3">
                    <Form.Check type="sw" label="Còn hoạt động" name="status" onChange={handleCheck} checked={user.status} />
                </Form.Group> */}
                <Button type="submit" variant="success" onClick={handleSubmit}>
                    <FontAwesomeIcon icon={faCheck}  /> thêm
                </Button>
            </Form>
        </>

    )





}


export default InvoiceAdd;