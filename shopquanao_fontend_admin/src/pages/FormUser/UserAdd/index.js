import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UserAdd =()=>{
    const navigate = useNavigate();
    // chỉ có thêm tài khoản quản lý 
    // status =2  là tài khoảng quản lý
    const [user, setUser] = useState( {
            name: "",
            password: "",
            fullname: "",
            email: "",
            phone: "",
            address: "",
          status:2}
        );
    //hiểm thì nút thêm khi đã nhập đầy đủ thông tin     
    const [show, setshow] = useState(false);
    const handleCLose=()=>{
        setshow(false);
    }      
   console.log(user)



    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser(prev => ({ ...prev, [name]: value }));
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(user.name===""||user.password===""||user.fullname===""||user.email===""||user.phone===""||user.address==="")
        {
            setshow(true);
            return;
        }
        axios.post(`http://localhost:8000/api/user`,user)
             .then(()=>{navigate(`/admin/user`)});
       
    }





    return(        <><h3>Thêm tài khoản quản lý </h3>
            <Form className="col-md-3">
           

                <Form.Group className="mb-3">
                    <Form.Label>Tên:</Form.Label>
                    <Form.Control type="text" name="name"  onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" name="password" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Họ tên:</Form.Label>
                    <Form.Control type="text" name="fullname"  onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" name="email"   onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>SĐT:</Form.Label>
                    <Form.Control type="text" name="phone" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Địa chỉ:</Form.Label>
                    <Form.Control type="text" name="address"  onChange={handleChange} />
                </Form.Group>
               
                
          
                {/* <Form.Group className="mb-3">
                    <Form.Label>trạng thái :</Form.Label>
                    <Form.Control type="text" name="status" onChange={handleChange} />
                </Form.Group> */}
                
                {/* <Form.Group className="mb-3">
                    <Form.Check type="sw" label="Còn hoạt động" name="status" onChange={handleCheck} checked={user.status} />
                </Form.Group> */}
                <Button type="submit" variant="success" onClick={handleSubmit}>
                    <FontAwesomeIcon icon={faCheck} /> thêm
                </Button>
            </Form>

            <Modal show={show} size="lg" onHide={handleCLose}  centered>
                
                <Modal.Header closeButton>
                    <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <p> không được bỏ trong dữ liệu </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCLose} >
                        Yes
                    </Button>
                    
                </Modal.Footer>
            </Modal>
        </>

    )





}


export default UserAdd;