import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Client/Layout";
import Cart from "./Client/Layout/DefaultLayout/Cart";
import Section from "./Client/Layout/DefaultLayout/Section";
import Login from "./Client/Login";

import ProductPage from "./Client/Layout/DefaultLayout/ProductPage"; 
import CommentComponent from "./Client/Layout/DefaultLayout/Comment";

import ProductDetail from "./Client/Layout/DefaultLayout/Productdetail";

import Register from "./Client/Register";
import ProductWishlist from "./ProductWishlist";
import WishlistAddCart from "./ProductWishlist/WishlistAddCart";
import SearchProduct from './Products/SearchProduct/index';
import InvoiceUser from "./Client/Layout/DefaultLayout/InvoiceUser";

import { CategoryProvider } from "./Client/Layout/DefaultLayout/Header";
import ResetPassword from "./Client/ResetPassword";
import AccountManagement from "./Client/AccountManagement";
function App() {
  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path="home" element={<Layout />}>
          <Route index element={<Section />} />
          
          <Route path="cart" element={<Cart />} />
          <Route path="productpage" element={<ProductPage />} />
          <Route path="productdetail/:id" element={<ProductDetail />} />
          
          <Route path="commentss" element={<CommentComponent />} />
          <Route path="resetpassword" element={<ResetPassword />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="account" element={<AccountManagement />} />
          <Route path="wishlist" element={<ProductWishlist/>} />
          <Route path="wishlistaddcart/:id" element={<WishlistAddCart/>} />
          <Route path="invoiceuser" element={<InvoiceUser/>} />

          <Route path="search/:name" element={<SearchProduct/>} />

          
          

          </Route>
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
