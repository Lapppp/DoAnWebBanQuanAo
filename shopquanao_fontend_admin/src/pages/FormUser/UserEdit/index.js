import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import {  json, useNavigate, useParams } from "react-router-dom";
import Login from "../../../Client/Login";

const UserEdit =()=>{
    const navigate = useNavigate();

    var { id } = useParams();

    const [user, setUser] = useState({});
    const [password,setPassword]=useState('hihhi');
    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${id}`)
            .then(res => {setUser(res.data)
                if(res.data && res.data.password)
                {
                    const retrievedPassword = res.data.password;
                    setPassword(retrievedPassword);
                }
            }
            
            
            
            ) 


    }, [id]); 
    
    // useEffect(() => {
    //     axios.get(`http://localhost:8000/api/user`)
    //     .then(res=>{
    //         if(res.data && res.data.password)
    //         {
    //             const retrievedPassword = res.data.password;
    //             setPassword(retrievedPassword);
    //         }
    //     })
    // }, []);
    // console.log(password);
   

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser(prev => ({ ...prev, [name]: value }));
    }

    const handleCheck = (e) => {
        let name = e.target.name;
        let value = e.target.checked;
        setUser(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // ngắn chặn submit chuyển hướng đến máy chủ và tải lại trang 
        axios.put(`http://localhost:8000/api/user/${id}`, user)
            .then(() => navigate('/admin/user'));
    }

    return (
        <>
            <Form className="col-md-3">
            <Form.Group className="mb-3">
                    <Form.Label>mã:</Form.Label>
                    <Form.Control type="text" name="id" value={user.id} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Tên:</Form.Label>
                    <Form.Control type="text" name="name" value={user.name} onChange={handleChange} />
                </Form.Group>
                {/* <Form.Group className="mb-3">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" name="password" value={user.password} onChange={handleChange} />
                </Form.Group> */}
                <Form.Group className="mb-3">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" name="email" value={user.email}  />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>SĐT:</Form.Label>
                    <Form.Control type="text" name="phone" value={user.phone} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Địa chỉ:</Form.Label>
                    <Form.Control type="text" name="address" value={user.address} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Họ tên:</Form.Label>
                    <Form.Control type="text" name="fullname" value={user.fullname} onChange={handleChange} />
                </Form.Group>
                
          
                <Form.Group className="mb-3">
                    <Form.Label>trạng thái :</Form.Label>
                    <Form.Control type="text" name="status" value={user.status} onChange={handleChange} />
                </Form.Group>
{/*                 
                <Form.Group className="mb-3">
                    <Form.Check type="sw" label="Còn hoạt động" name="status" onChange={handleCheck} checked={user.status} />
                </Form.Group> */}
                <Button type="submit" variant="success" onClick={handleSubmit}>
                    <FontAwesomeIcon icon={faCheck} /> Cập nhật
                </Button>
            </Form>
        </>
    );
}
export default  UserEdit;