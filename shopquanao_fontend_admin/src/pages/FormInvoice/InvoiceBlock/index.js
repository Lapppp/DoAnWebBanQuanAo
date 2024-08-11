import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const InvoiceBlock =()=>{
    const [invoice, setInvoice] = useState([]);




    useEffect(() => {
        axios.get(`http://localhost:8000/api/invoice`)
        .then(res=>setInvoice(res.data))
    }, []);
    return(<>
    <h1> Danh sách hóa đơn đã hủy</h1>

    {invoice.some(item => item.status === 5) ? (<>
    <h3>Danh sách hóa đơn chờ cập nhật trạng thái </h3>
    <div>
  
    <div>
      <Table>
        <thead className="table-dark">
          <tr>
            <th>STT</th>
            <th>Ngày lặp</th>
            <th>Tổng tiền</th>
            <th>Địa chỉ ship</th>
            <th>Số điện thoại ship</th>
            <th>Mã</th>
            
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
              
              </tr>
           
          )}
        </tbody>
          
      </Table>
    </div>

</div></>
    ) : <p>không có hóa đơn !!!</p>}
    
    
    
    
    
    
    
    </>)
}
export default InvoiceBlock;