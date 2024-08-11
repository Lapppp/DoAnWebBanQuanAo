// src/router/index.js
import Home from "../pages/Home/Index";
import ColorSize from "../pages/ColorSize/Index";
import Category from "../Admin/Layout/Form/Category";

import Product from "../Admin/Layout/Form/Product";
import ProductEdit from "../Admin/Layout/Form/ProductEdit";
import ProductDetail from "../Admin/Layout/Form/ProductDetail";
import ProductDetailEdit from "../Admin/Layout/Form/ProductDetailEdit";
import Image from "../Admin/Layout/Form/Image";
<<<<<<< HEAD
=======


import User from "../pages/FormUser/User/Index";
import UserEdit from "../pages/FormUser/UserEdit";
import UserAdd from "../pages/FormUser/UserAdd";
import Invoice from "../pages/FormInvoice/Invoice";
import InvoiceAdd from "../pages/FormInvoice/InvoiceAdd/Index";
import InvoiceEdit from "../pages/FormInvoice/InvoiceEdit/Index";
import InvoicedetailAdd from "../pages/FormInvoiceDetail/InvoicedetailAdd";
import InvoiceApproved from "../pages/FormInvoice/InvoiceApproved";
import UserBlock from "../pages/FormUser/UserBlock";
import InvoicedetailEdit from "../pages/FormInvoiceDetail/InvoicedetailEdit";
import InvoiceBlock from "../pages/FormInvoice/InvoiceBlock";



import SlideshowService from "../Admin/Layout/Form/SlideshowServices"; 
import AdminComment from "../Admin/Layout/Form/AdminComments";
import AdminComments from "../Admin/Layout/Form/Comments";
import AdminDiscount from "../Admin/Layout/Form/AdminDiscounts";
>>>>>>> 1995ee8b2c36df87f41783e7ce5774a8b3ee5100

const priveRoutes = [];

<<<<<<< HEAD
const publicAdminRoutes = [
  { path: "/", Compoment: Home },
  { path: "colorsize", Compoment: ColorSize },
  { path: "category", Compoment: Category },
  { path: "products", Compoment: Product },
  { path: "products/edit/:id", Compoment: ProductEdit },
  { path: "productdetail/add/:id", Compoment: ProductDetail },
  { path: "productdetail/edit/:id", Compoment: ProductDetailEdit },
  { path: "image", Compoment: Image },

];
=======
const publicAdminRoutes=[
    {  path:"/",Compoment:Home },
    {  path:"/colorsize",Compoment:ColorSize },   
    {  path:"/category",Compoment:Category },  
    { path: "products", Compoment: Product },
    { path: "products/edit/:id", Compoment: ProductEdit },
    { path: "productdetail/add/:id", Compoment: ProductDetail },
    { path: "image", Compoment: Image }, 
    {  path:"/user", Compoment:User} , 
    {  path:"/user/edit/:id" , Compoment:UserEdit}  ,
    {  path:"/user/add" , Compoment:UserAdd} ,
    {  path:"/blockuser", Compoment:UserBlock},
    {  path:"/invoice" , Compoment:Invoice},
    {  path:"/invoice/add" , Compoment:InvoiceAdd},
    {  path:"/invoice/edit/:id" , Compoment:InvoiceEdit},
    {  path:"/invoice/detail_add/:id" , Compoment:InvoicedetailAdd},
    {  path:"/invoiceapproved" , Compoment:InvoiceApproved},
    {  path:"/invoicedetail/edit/:id" , Compoment:InvoicedetailEdit},
    {  path:"/invoiceblock" , Compoment:InvoiceBlock},
    { path: "slideshows", Component: SlideshowService },
  { path: "comments", Component: AdminComment},
  { path: "c", Component: AdminComments},
  { path:"qldiscount",Component:AdminDiscount},


   
   





]

const publicClientRoutes=[

    {  path:"/login",Compoment:Login },
    {  path:"/product",Compoment:Product }
]

// export {publicAdminRoutes,priveRoutes,publicClientRoutes}



>>>>>>> 1995ee8b2c36df87f41783e7ce5774a8b3ee5100



const privateAdminRoutes = [];

<<<<<<< HEAD
=======

>>>>>>> 1995ee8b2c36df87f41783e7ce5774a8b3ee5100


export { publicAdminRoutes, privateAdminRoutes};
