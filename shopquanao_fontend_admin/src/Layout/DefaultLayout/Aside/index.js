import React from "react";
import { Link } from "react-router-dom";

function Aside() 
{
  // return (
  //   <div >
  //     <aside className="main-sidebar sidebar-dark-primary elevation-4" style={{height:"100em"}}>
  //       <div className="sidebar">
  //         <div className="user-panel mt-3 pb-3 mb-3 d-flex">
  //           <div className="image">
  //             <img
  //               src="dist/img/user2-160x160.jpg"
  //               className="img-circle elevation-2"
  //               alt=""
  //             />
  //           </div>
  //           <div className="info">
  //             <a href="tentaikhoan" className="d-block">
  //               Alexander Pierce
  //             </a>
  //           </div>
  //         </div>

  //         {/*  SidebarSearch Form */}
  //         <div className="form-inline">
  //           <div className="input-group" data-widget="sidebar-search">
  //             <input
  //               className="form-control form-control-sidebar"
  //               type="search"
  //               placeholder="Search"
  //               aria-label="Search"
  //             />
  //             <div className="input-group-append">
  //               <button className="btn btn-sidebar">
  //                 <i className="fas fa-search fa-fw"></i>
  //               </button>
  //             </div>
  //           </div>
  //         </div>

  //         {/*  Sidebar Menu */}
  //         <nav className="mt-2">
  //           <ul
  //             className="nav nav-pills nav-sidebar flex-column"
  //             data-widget="treeview"
  //             role="menu"
  //             data-accordion="false"
  //           >
  //             {/*  Add icons to the links using the .nav-icon className
  //              with font-awesome or any other icon font library */}

  //             <li className="nav-item menu-open">
  //               <a href="a" className="nav-link active" >
  //                 <i className="nav-icon fas fa-tachometer-alt"></i>
  //               </a>
  //             </li>
  //           </ul>
           

  //         <li className="nav-item menu-open">
  //           <a href="a" className="nav-link active">
  //             <i className="nav-icon fas fa-tachometer-alt"></i>
  //             <p>
  //               Dashboard
  //               <i className="right fas fa-angle-left"></i>
  //             </p>
  //           </a>
  //           <ul className="nav nav-treeview">
  //             <li className="nav-item">
  //               <a href="./index.html" className="nav-link active">
  //                 <i className="far fa-circle nav-icon"></i>
  //                 <p>Dashboard v1</p>
  //               </a>
  //             </li>
  //             <li className="nav-item">
  //               <a href="./index2.html" className="nav-link">
  //                 <i className="far fa-circle nav-icon"></i>
  //                 <p>Dashboard v2</p>
  //               </a>
  //             </li>
  //             <li className="nav-item">
  //               <a href="./index3.html" className="nav-link">
  //                 <i className="far fa-circle nav-icon"></i>
  //                 <p>Dashboard v3</p>
  //               </a>
  //             </li>
  //           </ul>
  //         </li>
  //         <li className="nav-item">
  //           <a href="pages/widgets.html" className="nav-link">
  //             <i className="nav-icon fas fa-th"></i>
  //             <p>
  //               Widgets
  //               <span className="right badge badge-danger">New</span>
  //             </p>
  //           </a>
  //         </li>
  //         <li className="nav-item">
  //           <a href="a" className="nav-link">
  //             <i className="nav-icon fas fa-copy"></i>
  //             <p>
  //               Layout Options
  //               <i className="fas fa-angle-left right"></i>
  //               <span className="badge badge-info right">6</span>
  //             </p>
  //           </a>
  //           <ul className="nav nav-treeview">
  //             <li className="nav-item">
  //               <a href="pages/layout/top-nav.html" className="nav-link">
  //                 <i className="far fa-circle nav-icon"></i>
  //                 <p>Top Navigation</p>
  //               </a>
  //             </li>
  //             <li className="nav-item">
  //               <a href="pages/layout/top-nav-sidebar.html" className="nav-link">
  //                 <i className="far fa-circle nav-icon"></i>
  //                 <p>Top Navigation + Sidebar</p>
  //               </a>
  //             </li>
  //             <li className="nav-item">
  //               <a href="pages/layout/boxed.html" className="nav-link">
  //                 <i className="far fa-circle nav-icon"></i>
  //                 <p>Boxed</p>
  //               </a>
  //             </li>
  //             <li className="nav-item">
  //               <a href="pages/layout/fixed-sidebar.html" className="nav-link">
  //                 <i className="far fa-circle nav-icon"></i>
  //                 <p>Fixed Sidebar</p>
  //               </a>
  //             </li>
  //             <li className="nav-item">
  //               <a href="pages/layout/fixed-sidebar-custom.html" className="nav-link">
  //                 <i className="far fa-circle nav-icon"></i>
  //                 <p>Fixed Sidebar <small>+ Custom Area</small></p>
  //               </a>
  //             </li>
  //             <li className="nav-item">
  //               <a href="pages/layout/fixed-topnav.html" className="nav-link">
  //                 <i className="far fa-circle nav-icon"></i>
  //                 <p>Fixed Navbar</p>
  //               </a>
  //             </li>
  //             <li className="nav-item">
  //               <a href="pages/layout/fixed-footer.html" className="nav-link">
  //                 <i className="far fa-circle nav-icon"></i>
  //                 <p>Fixed Footer</p>
  //               </a>
  //             </li>
  //             <li className="nav-item">
  //               <a href="pages/layout/collapsed-sidebar.html" className="nav-link">
  //                 <i className="far fa-circle nav-icon"></i>
  //                 <p>Collapsed Sidebar</p>
  //               </a>
  //             </li>
  //           </ul>
  //         </li>
  //         <li className="nav-item">
  //           <a href="a" className="nav-link">
  //             <i className="nav-icon fas fa-chart-pie"></i>
  //             <p>
  //               Charts
  //               <i className="right fas fa-angle-left"></i>
  //             </p>
  //           </a>
  //           <ul className="nav nav-treeview">
  //             <li className="nav-item">
  //               <a href="pages/charts/chartjs.html" className="nav-link">
  //                 <i className="far fa-circle nav-icon"></i>
  //                 <p>ChartJS</p>
  //               </a>
  //             </li>
  //             <li className="nav-item">
  //               <a href="pages/charts/flot.html" className="nav-link">
  //                 <i className="far fa-circle nav-icon"></i>
  //                 <p>Flot</p>
  //               </a>
  //             </li>
  //             <li className="nav-item">
  //               <a href="pages/charts/inline.html" className="nav-link">
  //                 <i className="far fa-circle nav-icon"></i>
  //                 <p>Inline</p>
  //               </a>
  //             </li>
  //             <li className="nav-item">
  //               <a href="pages/charts/uplot.html" className="nav-link">
  //                 <i className="far fa-circle nav-icon"></i>
  //                 <p>uPlot</p>
  //               </a>
  //             </li>
  //           </ul>
  //         </li>
  //         <li className="nav-item">
  //           <a href="a" className="nav-link">
  //             <i className="nav-icon fas fa-tree"></i>
  //             <p>
  //               UI Elements
  //               <i className="fas fa-angle-left right"></i>
  //             </p>
  //           </a>
  //           <ul className="nav nav-treeview">
  //             <li className="nav-item">
  //               <a href="pages/UI/general.html" className="nav-link">
  //                 <i className="far fa-circle nav-icon"></i>
  //                 <p>General</p>
  //               </a>
  //             </li>
  //             <li className="nav-item">
  //               <a href="pages/UI/icons.html" className="nav-link">
  //                 <i className="far fa-circle nav-icon"></i>
  //                 <p>Icons</p>
  //               </a>
  //             </li>
  //             <li className="nav-item">
  //               <a href="pages/UI/buttons.html" className="nav-link">
  //                 <i className="far fa-circle nav-icon"></i>
  //                 <p>Buttons</p>
  //               </a>
  //             </li>
  //             <li className="nav-item">
  //               <a href="pages/UI/sliders.html" className="nav-link">
  //                 <i className="far fa-circle nav-icon"></i>
  //                 <p>Sliders</p>
  //               </a>
  //             </li>
  //             <li className="nav-item">
  //               <a href="pages/UI/modals.html" className="nav-link">
  //                 <i className="far fa-circle nav-icon"></i>
  //                 <p>Modals & Alerts</p>
  //               </a>
  //             </li>
  //             <li className="nav-item">
  //               <a href="pages/UI/navbar.html" className="nav-link">
  //                 <i className="far fa-circle nav-icon"></i>
  //                 <p>Navbar & Tabs</p>
  //               </a>
  //             </li>
  //             <li className="nav-item">
  //               <a href="pages/UI/timeline.html" className="nav-link">
  //                 <i className="far fa-circle nav-icon"></i>
  //                 <p>Timeline</p>
  //               </a>
  //             </li>
  //             <li className="nav-item">
  //               <a href="pages/UI/ribbons.html" className="nav-link">
  //                 <i className="far fa-circle nav-icon"></i>
  //                 <p>Ribbons</p>
  //               </a>
  //             </li>
  //           </ul>
  //         </li>
  //         {/* form */}
  //         <li className="nav-item">
  //           <a href="a" className="nav-link">
  //             <i className="nav-icon fas fa-edit"></i>
  //             <p>
  //               Quản Lý Sản Phẩm
  //               <i className="fas fa-angle-left right"></i>
  //             </p>
  //           </a>
  //           <ul className="nav nav-treeview">
  //             <li className="nav-item">
  //             <Link to="/following" className="nav-link">
  //               <i className="far fa-circle nav-icon"></i>
  //               <p>Loại Sản Phẩm</p>
  //             </Link>
  //             </li>
  //             <li className="nav-item">
  //               <a href="pages/forms/general.html" className="nav-link">
  //                 <i className="far fa-circle nav-icon"></i>
  //                 <p>Sản Phẩm</p>
  //               </a>
  //             </li>
  //             <li className="nav-item">
  //             <Link to="/colorsize" className="nav-link">
  //               <i className="far fa-circle nav-icon"></i>
  //               <p>Màu</p>
  //             </Link>
  //             </li>
  //             <li className="nav-item">
  //               <a href="pages/forms/general.html" className="nav-link">
  //                 <i className="far fa-circle nav-icon"></i>
  //                 <p>Chi Tiết Sản Phẩm</p>
  //               </a>
  //             </li>
  //             <li className="nav-item">
  //               <a href="pages/forms/advanced.html" className="nav-link">
  //                 <i className="far fa-circle nav-icon"></i>
  //                 <p>Advanced Elements</p>
  //               </a>
  //             </li>
  //             <li className="nav-item">
  //               <a href="pages/forms/editors.html" className="nav-link">
  //                 <i className="far fa-circle nav-icon"></i>
  //                 <p>Editors</p>
  //               </a>
  //             </li>
  //             <li className="nav-item">
  //               <a href="pages/forms/validation.html" className="nav-link">
  //                 <i className="far fa-circle nav-icon"></i>
  //                 <p>Validation</p>
  //               </a>
  //             </li>
  //           </ul>
  //         </li>
  //         <li className="nav-item">
  //           <a href="a" className="nav-link">
  //             <i className="nav-icon fas fa-table"></i>
  //             <p>
  //                Quản lý tài khoản 
  //               <i className="fas fa-angle-left right"></i>
  //             </p>
  //           </a>
  //           <ul className="nav nav-treeview">
  //             <li className="nav-item">
  //               <Link  to="/user" style={{ textDecoration: 'none' }} >
  //                 <i className="far fa-circle nav-icon"></i>
  //                  Danh sách tài khoản
  //               </Link>
  //             </li>
  //             <li className="nav-item">
  //               <Link style={{ textDecoration: 'none' }}>
  //                 <i className="far fa-circle nav-icon"></i>
  //                 Khóa/mở tài khoản 
  //               </Link>
  //             </li>
  //             <li className="nav-item">
  //               <Link     style={{ textDecoration: 'none' }}>
  //                 <i className="far fa-circle nav-icon"></i>
  //                 Thống kê tài khoản đặt hàng nhiều nhất
  //               </Link>
  //             </li>
  //           </ul>
  //         </li>
  //         <li className="nav-item">
  //           <a href="a" className="nav-link">
  //             <i className="nav-icon fas fa-table"></i>
  //             <p>
  //                Quản lý hóa đơn 
  //               <i className="fas fa-angle-left right"></i>
  //             </p>
  //           </a>
  //           <ul className="nav nav-treeview">
  //             <li className="nav-item">
  //               <Link  to="/invoice" style={{ textDecoration: 'none' }} >
  //                 <i className="far fa-circle nav-icon"></i>
  //                  Danh sách hóa đơn 
  //               </Link>
  //             </li>
              
  //           </ul>
  //           <ul className="nav nav-treeview">
  //             <li className="nav-item">
  //               <Link  to="/invoiceapproved" style={{ textDecoration: 'none' }} >
  //                 <i className="far fa-circle nav-icon"></i>
  //                  Hóa Đơn chờ Duyệt 
  //               </Link>
  //             </li>
              
  //           </ul>
  //         </li>
  //         <li className="nav-header">EXAMPLES</li>
  //         <li className="nav-item">
  //           <a href="pages/calendar.html" className="nav-link">
  //             <i className="nav-icon far fa-calendar-alt"></i>
  //             <p>
  //               Calendar
  //               <span className="badge badge-info right">2</span>
  //             </p>
  //           </a>
  //         </li>
  //         <li className="nav-item">
  //           <a href="pages/gallery.html" className="nav-link">
  //             <i className="nav-icon far fa-image"></i>
  //             <p>
  //               Gallery
  //             </p>
  //           </a>
  //         </li>
  //         <li className="nav-item">
  //           <a href="pages/kanban.html" className="nav-link">
  //             <i className="nav-icon fas fa-columns"></i>
  //             <p>
  //               Kanban Board
  //             </p>
  //           </a>
  //         </li>
  //         <li className="nav-item">
  //           <a href="a" className="nav-link">
  //             <i className="nav-icon far fa-envelope"></i>
  //             <p>
  //               Mailbox
  //               <i className="fas fa-angle-left right"></i>
  //             </p>
  //           </a>
  //           <ul className="nav nav-treeview">
  //             <li className="nav-item">
  //               <a href="pages/mailbox/mailbox.html" className="nav-link">
  //                 <i className="far fa-circle nav-icon"></i>
  //                 <p>Inbox</p>
  //               </a>
  //             </li>
  //             <li className="nav-item">
  //               <a href="pages/mailbox/compose.html" className="nav-link">
  //                 <i className="far fa-circle nav-icon"></i>
  //                 <p>Compose</p>
  //               </a>
  //             </li>
  //             <li className="nav-item">
  //               <a href="pages/mailbox/read-mail.html" className="nav-link">
  //                 <i className="far fa-circle nav-icon"></i>
  //                 <p>Read</p>
  //               </a>
  //             </li>
  //           </ul>
  //         </li>
  //         <li className="nav-item">
  //           <a href="a" className="nav-link">
  //             <i className="nav-icon fas fa-book"></i>
  //             <p>
  //               Pages
  //               <i className="fas fa-angle-left right"></i>
  //             </p>
  //           </a>
  //           <ul className="nav nav-treeview">
  //             <li className="nav-item">
  //               <a href="pages/examples/invoice.html" className="nav-link">
  //                 <i className="far fa-circle nav-icon"></i>
  //                 <p>Invoice</p>
  //               </a>
  //             </li>
  //             <li className="nav-item">
  //               <a href="pages/examples/profile.html" className="nav-link">
  //                 <i className="far fa-circle nav-icon"></i>
  //                 <p>Profile</p>
  //               </a>
  //             </li>
  //             <li className="nav-item">
  //               <a href="pages/examples/e-commerce.html" className="nav-link">
  //                 <i className="far fa-circle nav-icon"></i>
  //                 <p>E-commerce</p>
  //               </a>
  //             </li>
  //             <li className="nav-item">
  //               <a href="pages/examples/projects.html" className="nav-link">
  //                 <i className="far fa-circle nav-icon"></i>
  //                 <p>Projects</p>
  //               </a>
  //             </li>
  //             <li className="nav-item">
  //               <a href="pages/examples/project-add.html" className="nav-link">
  //                 <i className="far fa-circle nav-icon"></i>
  //                 <p>Project Add</p>
  //               </a>
  //             </li>
  //             <li className="nav-item">
  //               <a href="pages/examples/project-edit.html" className="nav-link">
  //                 <i className="far fa-circle nav-icon"></i>
  //                 <p>Project Edit</p>
  //               </a>
  //             </li>
  //             <li className="nav-item">
  //               <a href="pages/examples/project-detail.html" className="nav-link">
  //                 <i className="far fa-circle nav-icon"></i>
  //                 <p>Project Detail</p>
  //               </a>
  //             </li>
  //             <li className="nav-item">
  //               <a href="pages/examples/contacts.html" className="nav-link">
  //                 <i className="far fa-circle nav-icon"></i>
  //                 <p>Contacts</p>
  //               </a>
  //             </li>
  //             <li className="nav-item">
  //               <a href="pages/examples/faq.html" className="nav-link">
  //                 <i className="far fa-circle nav-icon"></i>
  //                 <p>FAQ</p>
  //               </a>
  //             </li>
  //             <li className="nav-item">
  //               <a href="pages/examples/contact-us.html" className="nav-link">
  //                 <i className="far fa-circle nav-icon"></i>
  //                 <p>Contact us</p>
  //               </a>
  //             </li>
  //           </ul>
  //         </li>
  //         <li className="nav-item">
  //           <a href="a" className="nav-link">
  //             <i className="nav-icon far fa-plus-square"></i>
  //             <p>
  //               Extras
  //               <i className="fas fa-angle-left right"></i>
  //             </p>
  //           </a>
  //           <ul className="nav nav-treeview">
  //             <li className="nav-item">
  //               <a href="a" className="nav-link">
  //                 <i className="far fa-circle nav-icon"></i>

  //                 <p>
  //                   Dashboard
  //                   <i className="right fas fa-angle-left"></i>
  //                 </p>
  //               </a>
  //               <ul className="nav nav-treeview">
  //                 <li className="nav-item">
  //                   <a href="./index.html" className="nav-link active">
  //                     <i className="far fa-circle nav-icon"></i>
  //                     <p>Dashboard v1</p>
  //                   </a>
  //                 </li>
  //                 <li className="nav-item">
  //                   <a href="./index2.html" className="nav-link">
  //                     <i className="far fa-circle nav-icon"></i>
  //                     <p>Dashboard v2</p>
  //                   </a>
  //                 </li>
  //                 <li className="nav-item">
  //                   <a href="./index3.html" className="nav-link">
  //                     <i className="far fa-circle nav-icon"></i>
  //                     <p>Dashboard v3</p>
  //                   </a>
  //                 </li>
  //               </ul>
  //             </li>
  //             <li className="nav-item">
  //               <a href="pages/widgets.html" className="nav-link">
  //                 <i className="nav-icon fas fa-th"></i>
  //                 <p>
  //                   Widgets
  //                   <span className="right badge badge-danger">New</span>
  //                 </p>
  //               </a>
  //             </li>
  //             <li className="nav-item">
  //               <a href="a" className="nav-link">
  //                 <i className="nav-icon fas fa-copy"></i>
  //                 <p>
  //                   Layout Options
  //                   <i className="fas fa-angle-left right"></i>
  //                   <span className="badge badge-info right">6</span>
  //                 </p>
  //               </a>
  //               <ul className="nav nav-treeview">
  //                 <li className="nav-item">
  //                   <a href="pages/layout/top-nav.html" className="nav-link">
  //                     <i className="far fa-circle nav-icon"></i>
  //                     <p>Top Navigation</p>
  //                   </a>
  //                 </li>
  //                 <li className="nav-item">
  //                   <a
  //                     href="pages/layout/top-nav-sidebar.html"
  //                     className="nav-link"
  //                   >
  //                     <i className="far fa-circle nav-icon"></i>
  //                     <p>Top Navigation + Sidebar</p>
  //                   </a>
  //                 </li>
  //                 <li className="nav-item">
  //                   <a href="pages/layout/boxed.html" className="nav-link">
  //                     <i className="far fa-circle nav-icon"></i>
  //                     <p>Boxed</p>
  //                   </a>
  //                 </li>
  //                 <li className="nav-item">
  //                   <a
  //                     href="pages/layout/fixed-sidebar.html"
  //                     className="nav-link"
  //                   >
  //                     <i className="far fa-circle nav-icon"></i>
  //                     <p>Fixed Sidebar</p>
  //                   </a>
  //                 </li>
  //                 <li className="nav-item">
  //                   <a
  //                     href="pages/layout/fixed-sidebar-custom.html"
  //                     className="nav-link"
  //                   >
  //                     <i className="far fa-circle nav-icon"></i>
  //                     <p>
  //                       Fixed Sidebar <small>+ Custom Area</small>
  //                     </p>
  //                   </a>
  //                 </li>
  //                 <li className="nav-item">
  //                   <a
  //                     href="pages/layout/fixed-topnav.html"
  //                     className="nav-link"
  //                   >
  //                     <i className="far fa-circle nav-icon"></i>
  //                     <p>Fixed Navbar</p>
  //                   </a>
  //                 </li>
  //                 <li className="nav-item">
  //                   <a
  //                     href="pages/layout/fixed-footer.html"
  //                     className="nav-link"
  //                   >
  //                     <i className="far fa-circle nav-icon"></i>
  //                     <p>Fixed Footer</p>
  //                   </a>
  //                 </li>
  //                 <li className="nav-item">
  //                   <a
  //                     href="pages/layout/collapsed-sidebar.html"
  //                     className="nav-link"
  //                   >
  //                     <i className="far fa-circle nav-icon"></i>
  //                     <p>Collapsed Sidebar</p>
  //                   </a>
  //                 </li>
  //               </ul>
  //             </li>
  //             <li className="nav-item">
  //               <a href="a" className="nav-link">
  //                 <i className="nav-icon fas fa-chart-pie"></i>
  //                 <p>
  //                   Charts
  //                   <i className="right fas fa-angle-left"></i>
  //                 </p>
  //               </a>
  //               <ul className="nav nav-treeview">
  //                 <li className="nav-item">
  //                   <a href="pages/charts/chartjs.html" className="nav-link">
  //                     <i className="far fa-circle nav-icon"></i>
  //                     <p>ChartJS</p>
  //                   </a>
  //                 </li>
  //                 <li className="nav-item">
  //                   <a href="pages/charts/flot.html" className="nav-link">
  //                     <i className="far fa-circle nav-icon"></i>
  //                     <p>Flot</p>
  //                   </a>
  //                 </li>
  //                 <li className="nav-item">
  //                   <a href="pages/charts/inline.html" className="nav-link">
  //                     <i className="far fa-circle nav-icon"></i>
  //                     <p>Inline</p>
  //                   </a>
  //                 </li>
  //                 <li className="nav-item">
  //                   <a href="pages/charts/uplot.html" className="nav-link">
  //                     <i className="far fa-circle nav-icon"></i>
  //                     <p>uPlot</p>
  //                   </a>
  //                 </li>
  //               </ul>
  //             </li>
  //             <li className="nav-item">
  //               <a href="a" className="nav-link">
  //                 <i className="nav-icon fas fa-tree"></i>
  //                 <p>
  //                   UI Elements
  //                   <i className="fas fa-angle-left right"></i>
  //                 </p>
  //               </a>
  //               <ul className="nav nav-treeview">
  //                 <li className="nav-item">
  //                   <a href="pages/UI/general.html" className="nav-link">
  //                     <i className="far fa-circle nav-icon"></i>
  //                     <p>General</p>
  //                   </a>
  //                 </li>
  //                 <li className="nav-item">
  //                   <a href="pages/UI/icons.html" className="nav-link">
  //                     <i className="far fa-circle nav-icon"></i>
  //                     <p>Icons</p>
  //                   </a>
  //                 </li>
  //                 <li className="nav-item">
  //                   <a href="pages/UI/buttons.html" className="nav-link">
  //                     <i className="far fa-circle nav-icon"></i>
  //                     <p>Buttons</p>
  //                   </a>
  //                 </li>
  //                 <li className="nav-item">
  //                   <a href="pages/UI/sliders.html" className="nav-link">
  //                     <i className="far fa-circle nav-icon"></i>
  //                     <p>Sliders</p>
  //                   </a>
  //                 </li>
  //                 <li className="nav-item">
  //                   <a href="pages/UI/modals.html" className="nav-link">
  //                     <i className="far fa-circle nav-icon"></i>
  //                     <p>Modals & Alerts</p>
  //                   </a>
  //                 </li>
  //                 <li className="nav-item">
  //                   <a href="pages/UI/navbar.html" className="nav-link">
  //                     <i className="far fa-circle nav-icon"></i>
  //                     <p>Navbar & Tabs</p>
  //                   </a>
  //                 </li>
  //                 <li className="nav-item">
  //                   <a href="pages/UI/timeline.html" className="nav-link">
  //                     <i className="far fa-circle nav-icon"></i>
  //                     <p>Timeline</p>
  //                   </a>
  //                 </li>
  //                 <li className="nav-item">
  //                   <a href="pages/UI/ribbons.html" className="nav-link">
  //                     <i className="far fa-circle nav-icon"></i>
  //                     <p>Ribbons</p>
  //                   </a>
  //                 </li>
  //               </ul>
  //             </li>
  //             {/* form */}
  //             <li className="nav-item">
  //               <a href="a" className="nav-link">
  //                 <i className="nav-icon fas fa-edit"></i>
  //                 <p>
  //                   Quản Lý Sản Phẩm
  //                   <i className="fas fa-angle-left right"></i>
  //                 </p>
  //               </a>
  //               <ul className="nav nav-treeview">
  //                 <li className="nav-item">
  //                   <Link to="/following" className="nav-link">
  //                     <i className="far fa-circle nav-icon"></i>
  //                     <p>Loại Sản Phẩm</p>
  //                   </Link>
  //                 </li>
  //                 <li className="nav-item">
  //                   <a href="pages/forms/general.html" className="nav-link">
  //                     <i className="far fa-circle nav-icon"></i>
  //                     <p>Sản Phẩm</p>
  //                   </a>
  //                 </li>
  //                 <li className="nav-item">
  //                   <Link to="/colorsize" className="nav-link">
  //                     <i className="far fa-circle nav-icon"></i>
  //                     <p>Màu</p>
  //                   </Link>
  //                 </li>
  //                 <li className="nav-item">
  //                   <a href="pages/forms/general.html" className="nav-link">
  //                     <i className="far fa-circle nav-icon"></i>
  //                     <p>Chi Tiết Sản Phẩm</p>
  //                   </a>
  //                 </li>
  //                 <li className="nav-item">
  //                   <a href="pages/forms/advanced.html" className="nav-link">
  //                     <i className="far fa-circle nav-icon"></i>
  //                     <p>Advanced Elements</p>
  //                   </a>
  //                 </li>
  //                 <li className="nav-item">
  //                   <a href="pages/forms/editors.html" className="nav-link">
  //                     <i className="far fa-circle nav-icon"></i>
  //                     <p>Editors</p>
  //                   </a>
  //                 </li>
  //                 <li className="nav-item">
  //                   <a href="pages/forms/validation.html" className="nav-link">
  //                     <i className="far fa-circle nav-icon"></i>
  //                     <p>Validation</p>
  //                   </a>
  //                 </li>
  //               </ul>
  //             </li>
  //             <li className="nav-item">
  //               <a href="a" className="nav-link">
  //                 <i className="nav-icon fas fa-table"></i>
  //                 <p>
  //                   Tables
  //                   <i className="fas fa-angle-left right"></i>
  //                 </p>
  //               </a>
  //               <ul className="nav nav-treeview">
  //                 <li className="nav-item">
  //                   <a href="pages/tables/simple.html" className="nav-link">
  //                     <i className="far fa-circle nav-icon"></i>
  //                     <p>Simple Tables</p>
  //                   </a>
  //                 </li>
  //                 <li className="nav-item">
  //                   <a href="pages/tables/data.html" className="nav-link">
  //                     <i className="far fa-circle nav-icon"></i>
  //                     <p>DataTables</p>
  //                   </a>
  //                 </li>
  //                 <li className="nav-item">
  //                   <a href="pages/tables/jsgrid.html" className="nav-link">
  //                     <i className="far fa-circle nav-icon"></i>
  //                     <p>jsGrid</p>
  //                   </a>
  //                 </li>
  //               </ul>
  //             </li>
  //           </ul>
  //          </li>
  //         </nav>
  //       </div>
  //     </aside>
  //   </div>
  // )



  return (
    <div >
      <aside className="main-sidebar sidebar-dark-primary elevation-4"  style={{height:"100em"}}>
        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="dist/img/user2-160x160.jpg"
                className="img-circle elevation-2"
                alt=""
              />
            </div>
            <div className="info">
              <a href="tentaikhoan" className="d-block">
               Admin
              </a>
            </div>
          </div>

          {/*  SidebarSearch Form */}
          <div className="form-inline">
            <div className="input-group" data-widget="sidebar-search">
              <input
                className="form-control form-control-sidebar"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <div className="input-group-append">
                <button className="btn btn-sidebar">
                  <i className="fas fa-search fa-fw"></i>
                </button>
              </div>
            </div>
          </div>

          {/*  Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/*  Add icons to the links using the .nav-icon className
               with font-awesome or any other icon font library */}



              <li className="nav-item">
                <a href="a" className="nav-link">
                  <i className="nav-icon fas fa-tree"></i>
                  <p>
                    UI Elements
                    <i className="fas fa-angle-left right"></i>
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="pages/UI/general.html" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>General</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="pages/UI/icons.html" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Icons</p>
                    </a>
                  </li>
                  <li className="nav-item">
<a href="pages/UI/buttons.html" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Buttons</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="pages/UI/sliders.html" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Sliders</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="pages/UI/modals.html" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Modals & Alerts</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="pages/UI/navbar.html" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Navbar & Tabs</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="pages/UI/timeline.html" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Timeline</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="pages/UI/ribbons.html" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Ribbons</p>
                    </a>
                  </li>
                </ul>
              </li>
              {/* form */}
              <li className="nav-item">
                <a href="a" className="nav-link">
                  <i className="nav-icon fas fa-edit"></i>
                  <p>
                    Quản Lý Sản Phẩm
                    <i className="fas fa-angle-left right"></i>
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to={`/admin/products`} className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Loại Sản Phẩm</p>
                    </Link>
                  </li>


                  
                  
                 

                  <li className="nav-item">
                  <Link to="/admin/productdetails" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Chi tiết sản phẩm</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                  <Link to={`/admin/products`} className="nav-link">
                      <i className="far fa-circle nav-icon"></i>

                      <p>Sản Phẩm</p>
                    </Link>

                  </li>
                  <li className="nav-item">
                    <Link to="/admin/colorsize" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Kích thước & Màu</p>
                    </Link>
                  </li>
                 
                 
                </ul>
              </li>
              <li className="nav-item">
                <a href="a" className="nav-link">
                  <i className="nav-icon fas fa-table"></i>
                  <p>
                    Tables
                    <i className="fas fa-angle-left right"></i>
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="pages/tables/simple.html" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Simple Tables</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="pages/tables/data.html" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>DataTables</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="pages/tables/jsgrid.html" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>jsGrid</p>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
            <a href="a" className="nav-link">
               <i className="nav-icon fas fa-table"></i>
               <p>
                  Quản lý tài khoản 
                <i className="fas fa-angle-left right"></i>
               </p>
           </a>
            <ul className="nav nav-treeview">
               <li className="nav-item">
                 <Link  to="/admin/user" style={{ textDecoration: 'none' }} >
                   <i className="far fa-circle nav-icon"></i>
                    Danh sách tài khoản
                 </Link>
              </li>
               <li className="nav-item">
                 <Link  to="/admin/blockuser" style={{ textDecoration: 'none' }}>
                  <i className="far fa-circle nav-icon"></i>
                  danh sách tài khoản bị chặn 
                </Link>
              </li>
               <li className="nav-item">
                 <Link     style={{ textDecoration: 'none' }}>
                   <i className="far fa-circle nav-icon"></i>
                   Thống kê tài khoản đặt hàng nhiều nhất
                 </Link>
               </li>
             </ul>
           </li>
           <li className="nav-item">
             <a href="a" className="nav-link">
              <i className="nav-icon fas fa-table"></i>
               <p>
                 Quản lý hóa đơn 
                 <i className="fas fa-angle-left right"></i>
               </p>
             </a>
             <ul className="nav nav-treeview">
               <li className="nav-item">
                 <Link  to="/admin/invoice" style={{ textDecoration: 'none' }} >
                   <i className="far fa-circle nav-icon"></i>
                   Danh sách hóa đơn 
                </Link>
               </li>
              
             </ul>
             <ul className="nav nav-treeview">
              <li className="nav-item">
                <Link  to="/admin/invoiceapproved" style={{ textDecoration: 'none' }} >
                  <i className="far fa-circle nav-icon"></i>
                   Danh Hóa Đơn chờ cập nhật 
                </Link>
               </li>
              
            </ul>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <Link  to="/admin/invoiceblock" style={{ textDecoration: 'none' }} >
                  <i className="far fa-circle nav-icon"></i>
                   Danh Hóa Đơn đã hủy 
                </Link>
               </li>
              
            </ul>
           </li> 
              
            </ul>
          </nav>
        </div>
      </aside>
    </div>












  );

}

export default Aside;

 

