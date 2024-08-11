import { faEdit, faPlus, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Modal, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const User =()=>{
    let i=0;
    
    const [user, setUser] = useState([]);
    const [show, setShow] = useState(false);
    const [selectUser, setSelectUser] = useState({});
    const [update, setUpdate] = useState(false);
    // const [updatestatus, setUpdateStatus] = useState();
     const [id, setId] = useState("");

    const handleShow=(id)=>{
        setSelectUser(user.find(a => a.id ===id));
        setShow(true);

    }
    const handleClose =() =>{ setShow(false)
        setUpdate(false)
    } 


    const handleBlock=(id)=>{
        setId(id) 
        // setUpdateStatus(prev => ({ ...prev, status: 0 }));
        setUpdate(true);
    }

    console.log(id);

    const handleUpdate=(e)=>{
        e.preventDefault();
        // ngắn chặn submit chuyển hướng đến máy chủ và tải lại trang 
        axios.get(`http://localhost:8000/api/updateuser/${id}`)
        setUpdate(false)
        setId("");
        axios.get(`http://localhost:8000/api/user`)
        .then(res=>setUser(res.data))
        
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user`)
        .then(res=>setUser(res.data))
    }, []);
    return (<>

        <h1> Danh Sách Tài Khoản </h1>
        <Link to="add"  className="btn btn-success mb-1"   > <FontAwesomeIcon icon={faPlus} />Thêm</Link>
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
                        user.map(item=>
                            <tr className="align-middle">
                                <td>{++i}</td>
                                <td>{item.name}</td>
                                <td>{item.fullname}</td>
                                <td>{item.address}</td>
                                <td>{item.phone}</td>
                                <td>{item.email}</td>
                                <td>
                                        <Button variant="info" style={{ marginRight: "5px" }} onClick={()=>handleShow(item.id)} >
                                            <FontAwesomeIcon icon={faUser} />
                                        </Button>
                                        <Link to={`/admin/user/edit/${item.id}`}  className="btn btn-warning" style={{ marginRight: "5px" }} >
                                            <FontAwesomeIcon icon={faEdit} />
                                        </Link>
                                        <Button variant="danger" onClick={()=>handleBlock(item.id)} >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                    </td>

                            </tr>                       
                        )
                    }           
            </tbody>
        </Table>

            <Modal show={show} size="lg" onHide={handleClose}  centered>
                
                <Modal.Header closeButton>
                    <Modal.Title>Thông tin tài khoản</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                    
                        
                        <Col md={4}>
                            <dl>
                                <dt>Tên :</dt>
                                <dd>{selectUser.name}</dd>

                                <dt>Email:</dt>
                                <dd>{selectUser.email}</dd>

                                <dt>SĐT:</dt>
                                <dd>{selectUser.phone}</dd>
                            </dl>
                        </Col>
                        <Col md={4}>
                            <dl>
                                <dt>Địa chỉ:</dt>
                                <dd>{selectUser.address}</dd>

                                <dt>Họ tên:</dt>
                                <dd>{selectUser.fullname}</dd>

                            
                            </dl>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>


        {/* chặn tài khoản chưa hoàn thiện */}
            <Modal show={update} size="lg" onHide={handleClose}  centered>
                
                <Modal.Header closeButton>
                    <Modal.Title>Chặn tài khoản</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <p>Bạn có chắc muốn  chặn tài khoản này không !!!</p>
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

export default User;