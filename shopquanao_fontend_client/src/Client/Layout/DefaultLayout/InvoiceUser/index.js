import { faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

const InvoiceUser=()=>{
    const navigate = useNavigate();
  var { id } = useParams()
  const [invoice, setinvoice] = useState([]);
    useEffect(() => {
        // truyền id giá trị của token vào axios
        axios.get(`http://localhost:8000/api/invoiceuser/1`)
        .then(res=>setinvoice(res.data))
        
    }, []);
    const handleCancel=(id)=>{
        axios.get(`http://localhost:8000/api/updatestatusclient/${id}`)
        axios.get(`http://localhost:8000/api/invoiceuser/1`)
        .then(res=>setinvoice(res.data))

    }
  
    return (<>
        <Table>
        <thead  className="table-dark">
            <tr>
                <th>STT</th>
                <th> Ngày lặp </th>
                <th>Địa chỉ </th>
               
                <th>số điện thoại</th>
                <th>trạng thái </th>
                <th>chức năng</th>

            </tr>
        </thead>
        <tbody>
            
                {
                    invoice.map(item=>
                        <tr className="align-middle">
                            <td>{item.id}</td>
                            <td>{item.invoicedate}</td>
                            <td>{item.shippingaddress}
                            </td>
                            <td>0{item.shippingphone}</td>
                            
                            <td>{item.status===1?<p  style={{color:'green'}} >chờ duyệt</p>
                            :item.status===2?<p style={{color:'darkgreen'}}>đã duyệt</p>
                            :item.status===3?<p style={{color:'blue'}}>đang giao</p>
                            :item.status===4?<p style={{color:'#FF4500'}}>đã giao</p>
                            :<p style={{color:'#808080'}}>đã hủy</p>
                            }</td>
                            
                            <td>
                                   
                                    <Link to={`/home/invoiceuserdetail/${item.id}`}  className="btn btn-warning" style={{ marginRight: "5px" }} >
                                                  Chi tiết 
                                                    </Link>
                                 {item.status===2?
                                    <Button variant="danger" onClick={()=>{handleCancel(item.id)}} >
                                        Hủy Đơn
                                    </Button>
                                    :null
                                }
                                </td>
                            


                        </tr>
                        
                        
                        
                        )
                }

           
        </tbody>



    </Table>
   


    
    </>)
}
export default InvoiceUser; 