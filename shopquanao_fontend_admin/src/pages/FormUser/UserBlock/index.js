import {  faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import {  Button, Modal, Table } from "react-bootstrap";


const UserBlock =()=>{
    let i=0;
    const [userbclock, setuserbclock] = useState([]);
    const [update, setupdate] = useState(false);
    const [id, setid] = useState("");




    const handleUnblock=(id)=>{
        setid(id);
        setupdate(true);


    }
    const handleUpdate=(e)=>
    {
        e.preventDefault();
        axios.get(`http://localhost:8000/api/userunblock/${id}`);
        setupdate(false);
        axios.get(`http://localhost:8000/api/userclock`)
        .then(res=>setuserbclock(res.data))
        setid("");
        

       
    }

    const handleClose=()=>{
        setupdate(false);
    }




    useEffect(() => {
        axios.get(`http://localhost:8000/api/userclock`)
        .then(res=>setuserbclock(res.data))
    }, []);
    
    return (<>
    <h3> Danh sách tài khoản đã bị chặn </h3>
    <Table>
        <thead  className="table-dark">
            <tr>
                <th>STT</th>
                <th> Tên</th>
                <th>Họ tên</th>
                <th>Địa chỉ</th>             
                <th>sdt</th>
                <th>email</th>
                <th>chức năng</th>

            </tr>
        </thead>
        <tbody>
            
                {
                    userbclock.map(item=>
                        <tr className="align-middle">
                            <td>{++i}</td>
                            <td>{item.name}</td>
                            <td>{item.fullname}</td>
                            <td>{item.address}</td>
                            <td>{item.phone}</td>
                            <td>{item.email}</td>
                            <td>
                                      
                                    <Button variant="primary" onClick={()=>{handleUnblock(item.id)}} >
                                        Mở chặn
                                    </Button> 
                                </td>
                            


                        </tr>
                        
                        
                        
                        )
                }

           
        </tbody>



    </Table>
    <Modal show={update} size="lg" onHide={handleClose}  centered>
            
            <Modal.Header closeButton>
                <Modal.Title>Mở chặn tài khoản</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <p>Bạn có chắc muốn  mở chặn tài khoản này không !!!</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleUpdate}>
                    Yes
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    No
                </Button>
            </Modal.Footer>
        </Modal>


  


    
    </>)




}

export default UserBlock;