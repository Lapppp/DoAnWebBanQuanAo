import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";



const InvoiceApproved =()=>{
    const [invoice, setinvoice] = useState([]);
    const [invocieDate, setinvocieDate] = useState({startdate:"",enddate:""});
    const [show, setshow] = useState(false);
   
  
   
    const handleupdate=(id)=>{
      // chưa làm mới viết h
      axios.get(`http://localhost:8000/api/updatestatus/${id}`);
      axios.post("http://localhost:8000/api/invoicedate", invocieDate)
      .then(res=>setinvoice(res.data))

    }
    
    const handleChange=(e)=>{
      let name = e.target.name;
      let value = e.target.value;
      setinvocieDate(prev=>({...prev , [name]: value}))
     
       
    }
    const handleSudmit =(e)=>{
      e.preventDefault();
      if (new Date(invocieDate.startdate) > new Date(invocieDate.enddate)||new Date(invocieDate.startdate) === new Date(invocieDate.enddate)) {
        // Hiển thị thông báo hoặc xử lý lỗi nếu ngày bắt đầu lớn hơn ngày kết thúc
        setshow(true);
        return;
      }
    
      // Nếu mọi thứ đều hợp lệ, thực hiện yêu cầu axios
      axios.post("http://localhost:8000/api/invoicedate", invocieDate)
      .then(res=>setinvoice(res.data))
      

    }
    const handleClick=()=>{
      setinvoice([]);
    }

  const handleCLose=()=>{
    setshow(false);
  }
  
  

  



    return (<>
    <h3> Cập nhật trạng thái đơn hàng </h3>
    <div>
      <label>Ngày bắt đầu:</label>
      <input type="date" name="startdate" onChange={handleChange}/>
      <label>Ngày kết thúc:</label>
      <input    type="date" name="enddate" onChange={handleChange} />
      <button style={{marginLeft:'5px'}}  className="btn btn-success" onClick={handleSudmit}>Tìm

      </button>
      <button style={{marginLeft:'5px'}}  className="btn btn-secondary" onClick={handleClick} >Hủy

      </button>
    </div>
    {invoice.some(item => item.status !== 5) ? (<>
    <h3>Danh sách hóa đơn chờ cập nhật trạng thái </h3>
    <div>
  
    <div>
      <Table>
        <thead className="table-dark">
          <tr>
            <th>STT</th>
            <th>Ngày lặp</th>
            <th>Trạng thái </th>
            <th>Địa chỉ ship</th>
            <th>Số điện thoại ship</th>
            <th>Mã</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        
        <tbody>
          {invoice.map(item =>
            
              <tr className="align-middle" key={item.id}>
                <td   >{item.id}</td>
                <td >{item.invoicedate}</td>
                <td>{item.status===1?<p  style={{color:'green'}} >chờ duyệt</p>
                            :item.status===2?<p style={{color:'darkgreen'}}>đã duyệt</p>
                            :item.status===3?<p style={{color:'blue'}}>đang giao</p>
                            :item.status===4?<p style={{color:'#FF4500'}}>đã giao</p>
                            :<p style={{color:'#808080'}}>đã hủy</p>
                            }</td>
                <td  >{item.shippingaddress}</td>
                <td  >{item.shippingphone}</td>
                <td  >{item.code}</td>
                <td>{item.status===1?<Button  onClick={()=>{handleupdate(item.id)}}>
                        Duyệt
                     </Button> :  <Button type="submit" variant="success" onClick={()=>{handleupdate(item.id)}} >
                     <FontAwesomeIcon icon={faCheck}  /> cập nhật 
                    </Button>
                      }
                     
                </td>
              </tr>
           
          )}
        </tbody>
          
      </Table>
    </div>

</div></>
    ) : null}
    
    <Modal show={show} size="lg" onHide={handleCLose}  centered>
                
                <Modal.Header closeButton>
                    <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <p> Ngày bắt đầu phải bé hơn hoặc bằng ngày kết thúc</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCLose} >
                        Yes
                    </Button>
                    
                </Modal.Footer>
            </Modal>
    
    </>)




}


export default  InvoiceApproved