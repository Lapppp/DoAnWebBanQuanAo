
import { Chart } from 'react-google-charts';
import React, { useEffect, useState } from 'react';
import axios from 'axios';




    // const logic=()=> 
    // {
    //     let a =1;
    //     let b =2;

    //     //  6 kiểu dữ liệu convert sang boolean là false
    //     // số 0
    //     // false
    //     // null
    //     // undefine
    //     //NaN
    //     // ''
    //     // Toán tử &&
    //     const result  ='A'&&'B'&&'D';
    //     // kết quả  D
    //     // nếu giá trị trên khác 6 giá  trị thì sẽ lấy giá trị cuối 
    //     //const result1  =null&&'B'&&'D';
    //     // ng lại nêu không khác nó  sẽ trả về giá trị của cái  đó 
    //     //toán tử ||
    //     //const resultOr ='A'&&'B'&&'D';
    //     // kết quả  A
    //     //const resultOr ='A'&&Null&&'D';
    //     // kết quả  A
    //     return result;
    // }
    const Home = () => {
        
      
       const [total, settotal] = useState([]);
       const [stock, setstock] = useState({});
       useEffect(() => {
        axios.get(`http://localhost:8000/api/totalquarter`)
        .then(res=>settotal(res.data))
        axios.get(`http://localhost:8000/api/stockquantity`)
        .then(res=>setstock(res.data))
       }, []);
           console.log(total)

          const data = [
            ['Quarter', 'Total'],
            ...total.map(item => [parseInt(item.quarter), parseInt(item.total)]),
          ];
      
          const options = {
            chart: {
              title: 'Company Performance',
              subtitle: 'Sales, Expenses, and Profit: 2014-2017',
            },
            hAxis: {
              title: 'Total',
              minValue: 0,
              maxValue: 1000000, // Tiêu đề của trục ngang
            },
            vAxis: {
              title: 'Month', // Tiêu đề của trục đứng
               // Đặt giá trị tối đa của trục đứng
            },
            bars: 'vertical', 
              
          };
      
          
      
        return (<>
       <div className="totals col-sm-4" style={{ border: '2px solid #ccc', borderRadius: '8px', padding: '20px', width: '150px' ,background:'yellow'}}>
    <label style={{ display: 'block', marginBottom: '5px', fontSize: '17px' }}>Số lượng tồn</label>
    <span style={{ display: 'block', width: '100%', boxSizing: 'border-box', fontSize: '15px', padding: '5px' }}>{stock.stock}</span>
</div>




          <div>
            
            <Chart
              chartType="BarChart"
              data={data}
              options={options}
              width="800px"
              height="500px"
            />
          </div>

          </>
        );
      };
      
      export default Home;
