import { faEdit, faPlus, faTrash,faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Modal, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";


const Invoice =()=>{
 
    const [invoice, setinvoice] = useState([]);
    //tong tiền của hóa đơn 
    const [tongtien, setTongtien] = useState({});
   




    const [show, setShow] = useState(false);
    // lấy danh sach cthd của 1 hóa đơn 
    const [selectinvoice, setSelectinvoice] = useState({});
    const [update, setUpdate] = useState(false);


    //chưa làm
    const [updatestatus, setUpdateStatus] = useState();
    const [id, setId] = useState('');


    // lấy thông tin của hóa đơn theo id
    const handleShow=(id)=>{
    // lấy danh sách chi tiết của 1 hóa đơn 
    axios.get(`http://localhost:8000/api/invoice/${id}`)
    .then(res=> setSelectinvoice(res.data))
    setShow(true);
    }

    // close modal hóa đơn 
    const handleClose =() =>{ setShow(false)
        setUpdate(false)
        
    }
    const handleBlock=( id)=>{
    setId(id)
        setUpdateStatus(prev => ({ ...prev, status: 0 }));
        setUpdate(true);


    }
    const handleUpdate=(e)=>{
        e.preventDefault();
            // ngắn chặn submit chuyển hướng đến máy chủ và tải lại trang 
            axios.put(`http://localhost:8000/api/invoice/${id}`, updatestatus)
                ;

    }
    //lấy tông tiền của toàng bộ hóa đơn 
    

    
    useEffect(() => {
        axios.get(`http://localhost:8000/api/invoice`)
        .then(res=>setinvoice(res.data));
        axios.get(`http://localhost:8000/api/total`)
        .then(res=>setTongtien(res.data));
        
    }, []);



    // của chi tiết hóa đơn 
    // chuyển trang mới nếu cầu
    

    const [showdetail, setShowdetail] = useState(false);
    const [selectDetail, setSelectDetail] = useState({});
    const handleShowdetail=(id)=>
    {
        axios.get(`http://localhost:8000/api/invoicedetail/${id}`)
        .then(res=>{setSelectDetail(res.data)
        })
        setShowdetail(true)
    }

    //close modal của thông tin ct của 1  cthd  
     const handleClosedetail=()=>
     {
        setShowdetail(false)
     }

     // product !!!!!!1
     const [productName, setproductName] = useState([]);
     const handleProdcutname=(id)=>
     {
        axios.get(`http://localhost:8000/api/productname/${id}`)
        .then(res=>{setproductName(res.data)})
     }
   console.log(productName)
 

    return (<>

<h1> Danh Sách Hóa Đơn </h1>
<Link to="/admin/invoice/add"  className="btn btn-success mb-1"   > <FontAwesomeIcon icon={faPlus} />Thêm</Link>
    <Table>
        <thead  className="table-dark">
            <tr>
                <th>STT</th>
                <th> Ngày lặp </th>
                <th>Tổng tiền</th>
                <th>trạng thái </th>
                <th>mã</th>
                <th>chức năng</th>

            </tr>
        </thead>
        <tbody>
            
                {
                    invoice.map(item=>
                        <tr className="align-middle">
                            <td>{item.id}</td>
                            <td>{item.invoicedate}</td>
                            <td>
                                {Array.isArray(tongtien)&&
                                     tongtien.map((x)=>
                                        x.id===item.id?x.total:null
                                    )
                                }</td>
                            
                            <td>{item.status===1?<p  style={{color:'green'}} >chờ duyệt</p>
                            :item.status===2?<p style={{color:'darkgreen'}}>đã duyệt</p>
                            :item.status===3?<p style={{color:'blue'}}>đang giao</p>
                            :item.status===4?<p style={{color:'#FF4500'}}>đã giao</p>
                            :<p style={{color:'#808080'}}>đã hủy</p>
                            }</td>
                            <td>{item.code}</td>
                            <td>
                                    <Button variant="info" style={{ marginRight: "5px" }} onClick={()=>{handleShow(item.id); handleProdcutname(item.id);}  } >
                                        <FontAwesomeIcon icon={faUser} />
                                    </Button>
                                    <Link to={`/admin/invoice/edit/${item.id}`}  className="btn btn-warning" style={{ marginRight: "5px" }} >
                                        <FontAwesomeIcon icon={faEdit} />
                                    </Link>
                                    <Button variant="danger" onClick={()=>handleBlock(item.id)} >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                    <Link  to={`/admin/invoice/detail_add/${item.id}`} className="btn btn-primary mt-2"  style={{ display: 'block' }} >Thêm chi tiết</Link>
                                </td>
                            


                        </tr>
                        
                        
                        
                        )
                }

           
        </tbody>



    </Table>


        <Modal show={show} size="lg" onHide={handleClose}  centered>
            
            <Modal.Header closeButton>
                <Modal.Title>Thông tin chi tiết của  hóa đơn: {selectinvoice.id}  </Modal.Title>
                
            </Modal.Header>
            <Modal.Body>
                <Row>
                   
                    
                    <Col md={4}>
                        <dl>
                            <dt> khách hàng:</dt>
                            {/* là 1 object truy xuất kiểu này  */}
                            {selectinvoice.user && (
                            <dd> {selectinvoice.user.name}</dd>
                            )}
                           
                            

                            <dt> Ngày lập: </dt>
                            <dd>  {selectinvoice.invoicedate}</dd>
                            
                            
                            
                        </dl>
                    </Col>
                    <Col md={3}>
                       
                    </Col>
                    <Col md={4}>
                        <dl>
                            <dt>địa chỉ nhận hàng: </dt>
                            <dd>{selectinvoice.shippingaddress}</dd>
                            <dt>số điện thoại: </dt>
                            <dd>{selectinvoice.shippingphone}</dd>

                            
                        </dl>
                       
                    </Col>
                                                    
                    <h4> Danh sách chi tiết hóa đơn: {selectinvoice.code}</h4>
                   
                    {/* là mảng truy xuất kiểu này */}
                    {Array.isArray(selectinvoice.invoicedetails)&&(
                        <Table>
                            <thead  className="table-dark">
                                <tr>
                                    <th>STT</th> 
                                    <th>tên sản phẩm</th>                                 
                                    <th>số lượng</th>
                                    <th>đơn giá</th>             
                                    <th>thành tiền </th>                              
                                    <th>chức năng</th>

                                </tr>
                            </thead>
                            <tbody>
                                
                                           { selectinvoice.invoicedetails.map((item,index)=>
                                           <tr> 
                                                <td>{item.id}</td>
                                                

                                                <td>
                                                
                                                {Array.isArray(productName)&&
                                                    productName.map((x)=>
                                                    item.id===x.invoicedetail_id? x.productname : null
                                                    )


                                                        }</td>

                                                <td>{item.quantity}</td>
                                                <td>{item.price}</td>
                                                <td>{item.quantity*item.price}</td>
                                                <td>
                                                    <Button variant="info" style={{ marginRight: "5px" }}   onClick={()=>{handleShowdetail(selectinvoice.id)}  } >
                                                        <FontAwesomeIcon icon={faUser} />
                                                    </Button>
                                                    {/* <Link to={`/admin/invoicedetail/detail/${item.id}`}   className="btn btn-primary"   style={{ marginRight: "5px" }} >
                                                       <FontAwesomeIcon icon={faUser} />
                                                    </Link> */}
                                                    <Link to={`/admin/invoicedetail/edit/${item.id}`}  className="btn btn-warning" style={{ marginRight: "5px" }} >
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </Link>
                                                    <Button variant="danger"  >
                                                         <FontAwesomeIcon icon={faTrash} />
                                                    </Button>
                                                </td>
                                           </tr>


                                            )

                                           }
                       
                            </tbody>



                        </Table>
                        
                        
                    )

                    }
                     {/* Modal  thông tin chi tiết của 1 cthd */}
                     <Modal show={showdetail} size="lg" onHide={handleClosedetail}  centered>
                        <Modal.Header  closeButton>
                        <Modal.Title>Thông tin  CTHD:   {selectDetail.id}  </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                           
                            <Row>
                                <Col md={5} >
                                    <dl>
                                        <dt>tên sản phẩm:</dt>
                                        <dd> {Array.isArray(productName)&&
                                                    productName.map((x)=>
                                                    selectDetail.id===x.invoicedetail_id? x.productname : null
                                                    )


                                        } </dd> 

                                        <dt>màu: </dt>
                                        <dd> {Array.isArray(productName)&&
                                                    productName.map((x)=>
                                                    selectDetail.id===x.invoicedetail_id? x.colorname : null
                                                    )


                                        } </dd> 

                                        <dt>size: </dt>
                                        <dd> {Array.isArray(productName)&&
                                                    productName.map((x)=>
                                                    selectDetail.id===x.invoicedetail_id? x.sizename : null
                                                    )


                                        } </dd>

                                        <dt>số lượng: </dt>
                                        <dd>{selectDetail.quantity}</dd>
                                        <dt>đơn giá: </dt>
                                        <dd>{selectDetail.price}</dd>

                                    </dl>
                                
                                </Col>
                                
                            </Row>
                            


                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClosedetail}>
                                Close
                            </Button>
                        </Modal.Footer>

                     </Modal>

                <h5>tổng tiển:  {Array.isArray(tongtien)&&
                                     tongtien.map((x)=>
                                        x.id===selectinvoice.id?x.total:null
                                    )
                                }</h5>
              



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
                <Modal.Title>thống báo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <p>Bạn muốn xóa toàn bộ hóa đơn này không ? </p>
               {/* nếu  yes thì xóa tất cả các chi tiết hóa đơn của hóa đơn này ngược lại thì không xóa */}
               
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

export default Invoice;