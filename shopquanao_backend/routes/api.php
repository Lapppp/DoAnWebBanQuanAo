<?php


use App\Http\Controllers\ApiCategoryController;
use App\Http\Controllers\ApiColorController;
use App\Http\Controllers\ApiImageController;
use App\Http\Controllers\ApiProductController;
use App\Http\Controllers\ApiProductDetaliController;

use App\Http\Controllers\ApiSizeController;

use App\Http\Controllers\ApiCartController;

use App\Http\Controllers\ApiInvoiceController;
use App\Http\Controllers\ApiInvoiceDetialController;
use App\Http\Controllers\ApiProductFavoriController;
use App\Http\Controllers\ApiReviewController;
use App\Http\Controllers\ApiUserController;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

use App\Http\Controllers\SocialiteController;



use App\Http\Controllers\SlideshowController;
use App\Http\Controllers\CommentController;

use App\Http\Controllers\DiscountController;
//use App\Http\Controllers\PromotionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['middleware' => 'api','prefix' => 'auth'],function ($router) {

     Route::post('login',[AuthController::class,'login']);
     Route::post('logout', [AuthController::class,'logout']);
     Route::post('register', [AuthController::class,'register']);
     Route::get('profile', [AuthController::class,'profile']);
     Route::post('resetpassword', [AuthController::class,'resetPassword']);
});



Route::get('/getcategory',[ApiCategoryController::class,'getCategoryData']);
Route::get('/getcategorydata',[ApiCategoryController::class,'getCategory']);
Route::get('/getallnamecategory',[ApiCategoryController::class,'getallnamecategory']);



Route::resource('/categories',ApiCategoryController::class);
Route::resource('/colors',ApiColorController::class);
Route::resource('/categories',ApiCategoryController::class);
Route::resource('/products',ApiProductController::class);
Route::resource('/productdetails',ApiProductDetaliController::class);
Route::resource('/images',ApiImageController::class);
Route::resource('/sizes',ApiSizeController::class);

Route::get('productdetailedit/{id}',[ApiProductDetaliController::class,'showadmin']);
Route::get('productdetailsimg',[ApiProductDetaliController::class,'imgproduct']);
Route::post('categoryproducts/{categoryId}',[ApiProductDetaliController::class,'categoryproducts']);
    



Route::get('sizeprodetails/{color_id}/{product_id}',[ApiProductDetaliController::class,'handlesizeprodetail']);
Route::get('colorprodetails/{color_id}',[ApiProductDetaliController::class,'handlecolorprodetail']);






Route::get('/uploadfile',[ApiColorController::class,'index']);
Route::post('/uploadfile',[ApiColorController::class,'postuploadfile']);
Route::get('/account',[ApiUserController::class,'x']);
Route::post('/login',[ApiUserController::class,'store']);

// user
    Route::resource('/user',ApiUserController::class);
    //chặn status =0  
    Route::get('/updateuser/{id}',[ApiUserController::class,'updateStatus']);
    //mở chặn status=1
    Route::get('/userunblock/{id}',[ApiUserController::class,'userUnBlock']);
    // hiển thị danh sách clock user
    Route::get('/userclock',[ApiUserController::class,'showClockUser']);

//invoice
    Route::apiResource('invoice',ApiInvoiceController::class);
    Route::get('/updatestatus/{id}',[ApiInvoiceController::class,'updateStatus']);
    Route::get('/total',[ApiInvoiceController::class,'tongTienHD']);
    Route::post('/invoicedate',[ApiInvoiceController::class,'invoiceDate']);
    Route::get('/totalquarter',[ApiInvoiceController::class,'totalQuarter']);
    // số lượng tồn 
    Route::get('/stockquantity',[ApiInvoiceController::class,'quantityProduct']);
    Route::get('/invoiceuser/{id}',[ApiInvoiceController::class,'invoiceUser']);
    // người dùng hủy hóa đơn cập nhật trạng thái  updateStatusClient
    Route::get('/updatestatusclient/{id}',[ApiInvoiceController::class,'updateStatusClient']);
    
    

//invoicedetail
    Route::resource('/invoicedetail', ApiInvoiceDetialController::class);
    Route::match(['get', 'post'],'/getproductdetailid', [ApiInvoiceDetialController::class, 'Productdetail_id']);
    // lấy dũ liệu theo id invoice
    Route::get('/productname/{id}', [ApiInvoiceDetialController::class, 'productName']);
    // lấy dũ liệu theo id invoicedetail
    Route::get('/productname_invoicedetail/{id}', [ApiInvoiceDetialController::class, 'productName_invoicedetail']);
    


//cart
    Route::resource('/cart', ApiCartController::class);
    Route::get('/cartlist/{id}', [ApiCartController::class, 'cartList']);
    Route::get('/urlimage/{id}', [ApiCartController::class, 'image']);
    Route::get('/congquantity/{id}', [ApiCartController::class, 'congQuantity']);
    Route::get('/truquantity/{id}', [ApiCartController::class, 'truQuantity']);
    Route::get('/imagedau/{id}', [ApiCartController::class, 'imageID']);
    Route::get('/sizeall', [ApiCartController::class, 'sizeAll']);  
    //tạo cthd  trong cart 
    Route::post('/paycart', [ApiCartController::class, 'createInvoicedetal']);  
   // Route::middleware('auth:api')->get('/cart', 'ApiCartController@index');congQuantity
   //text có thể xóa  
   Route::get('/search/{name}', [ApiCartController::class, 'searchProductByName']);
  



//review
Route::resource('/review', ApiReviewController::class);

//productfavorites 
   Route::resource('/favorite', ApiProductFavoriController::class);
   Route::get('/addcart/{id}', [ApiProductFavoriController::class,'addCart']);
   Route::get('/favoriteid/{id}', [ApiProductFavoriController::class,'favoriteId']);
   Route::post('/idproductdetail', [ApiProductFavoriController::class,'productdetaiId']);


Route::resource('/comments',CommentController::class);

Route::put('/comments/toggle-status/{id}', [CommentController::class, 'toggleStatus']);

Route::resource('/slideshows', SlideshowController::class);
Route::patch('/slideshows/{id}/toggle-status', [SlideshowController::class, 'toggleStatus']);

Route::resource('/discounts', DiscountController::class);
//Route::resource('promotions', PromotionController::class);
Route::patch('/discounts/{id}/toggle-status', [DiscountController::class, 'toggleStatus']);