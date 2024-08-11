

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form,Table } from "react-bootstrap";
const AdminDiscount = () => {
  const [discounts, setDiscounts] = useState([]);
  const [newDiscount, setNewDiscount] = useState({
    start_date: '',
    end_date: '',
    percentage_discount: null,
    amount_discount: null,
    status: true,
    product_id: null,
  });

  useEffect(() => {
    // Gọi API để lấy danh sách khuyến mãi khi component được tạo
    fetchDiscounts();
  }, []);

  const fetchDiscounts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/discounts');

      setDiscounts(response.data.discounts);
    } catch (error) {
      console.error('Error fetching discounts:', error);
    }
  };

  const handleCreateDiscount = async () => {
    try {
      // Gọi API để tạo mới khuyến mãi
      await axios.post('http://localhost:8000/api//discounts', newDiscount);

      // Sau khi tạo xong, làm mới danh sách khuyến mãi
      fetchDiscounts();

      // Đặt lại giá trị của newDiscount để chuẩn bị cho lần tạo mới khác
      setNewDiscount({
        start_date: '',
        end_date: '',
        percentage_discount: null,
        amount_discount: null,
        status: true,
        product_id: null,
      });
    } catch (error) {
      console.error('Error creating discount:', error);
    }
  };

  // Trong component React của bạn
const handleToggleStatus = async (id) => {
  try {
    // Gửi PATCH request để toggle status
    await axios.patch(`http://localhost:8000/api/discounts/${id}/toggle-status`);

    // Sau khi cập nhật xong, làm mới danh sách khuyến mãi
    fetchDiscounts();
  } catch (error) {
    console.error('Error toggling status:', error);
  }
};


  return (
    <div>
      <h1>Quản lý Khuyến mãi</h1>
      <div>
        <h2>Danh sách Khuyến mãi</h2>
        {/* <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((discount) => (
              <tr key={discount.id}>
                <td>{discount.id}</td>
                <td>{discount.start_date}</td>
                <td>{discount.end_date}</td>
                <td>
                  <label className="switch">
                    <input type="checkbox" checked={discount.status} readOnly />
                    <span className="slider round"></span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}




        <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
          {/* <th>ID</th> */}
              <th>Start Date</th>
              <th>End Date</th>
              <th>Product_id</th>
              <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {discounts.map((discount) => (
            <tr key={discount.id}>
              {/* <td>{discount.id}</td> */}
              <td>{discount.start_date}</td>
              <td>{discount.end_date}</td>
              <td>{discount.product_id}</td>
              <td>

              <Form.Check
                type="switch"
                id={`custom-switch-${discount.id}`}
                label={discount.status === 1 ? "On" : "Off"}
                checked={discount.status === 1}
                onChange={() =>handleToggleStatus(discount.id)}
              />

            </td>



              <td>
                
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <label>
    Status:
    <input
        type="checkbox"
        checked={newDiscount.status}
        onChange={() => setNewDiscount({ ...newDiscount, status: !newDiscount.status ? 1 : 0 })}
    />
</label>



      
    
        <h2>Tạo mới Khuyến mãi</h2>
        <label>
          Start Date:
          <input
            type="date"
            value={newDiscount.start_date}
            onChange={(e) => setNewDiscount({ ...newDiscount, start_date: e.target.value })}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={newDiscount.end_date}
            onChange={(e) => setNewDiscount({ ...newDiscount, end_date: e.target.value })}
          />
        </label>
        <label>
          Percentage Discount:
          <input
            type="number"
            value={newDiscount.percentage_discount || ''}
            onChange={(e) =>
              setNewDiscount({ ...newDiscount, percentage_discount: e.target.value || null })
            }
          />
        </label>
        <label>
          Amount Discount:
          <input
            type="number"
            value={newDiscount.amount_discount || ''}
            onChange={(e) =>
              setNewDiscount({ ...newDiscount, amount_discount: e.target.value || null })
            }
          />
        </label>
        <label>
          Status:
          <input
            type="checkbox"
            checked={newDiscount.status}
            onChange={() => setNewDiscount({ ...newDiscount, status: !newDiscount.status })}
          />
        </label>
        <label>
          Product ID:
          <input
            type="number"
            value={newDiscount.product_id || ''}
            onChange={(e) =>
              setNewDiscount({ ...newDiscount, product_id: e.target.value || null })
            }
          />
        </label>
        <button onClick={handleCreateDiscount}>Tạo mới</button>
      </div>
    </div>
  );
};

export default AdminDiscount;
