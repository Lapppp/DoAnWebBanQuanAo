<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Category;
use App\Models\Image;
use App\Models\Invoice;
use App\Models\InvoiceDetail;
use App\Models\Product;
use App\Models\ProductDetail;
use App\Models\Size;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Carbon;  
class ApiCartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cart=Cart::all();
        return response()->json($cart);
    }

    /**
     * Store a newly created resource in storage.
     */
    // hàm kiểm tra nến đã tồn tại trong giỏ hàng thì update số lượng ngược l;ại tạo mới 
    
    public function store(Request $request)
    {
        
        $validator =Validator::make($request->all(),[
           'product_detail_id'=>'required',
           'user_id'=> 'required',
           'quantity'=>'required',
        ]);

        if ($validator ->fails()) {
            return response()->json(['errors' => $validator ->errors()], 400);
        } 
        //dữ liệu người dùng chọn 
        $user_id=$request->input('user_id');
        $product_detail_id=$request->input('product_detail_id');
        $quantity=$request->input('quantity');
      

        // dữ liệu trong csql
        //lấy thông tin dựa vào id của người dùng 
        $cartall=Cart::where('user_id', $user_id)->get();
        foreach ( $cartall as  $item)
        {
            if($item->product_detail_id==$product_detail_id)
            {
                
                // đã có id ctsp trong giỏ hàng rùi 
                // update số lượng 
                // và trả về trong tin của giỏ hàng theo id của người dùng 
                $item->quantity=$item->quantity+$quantity;
                $item->save();
                return response()->json(['message'=>'update số lượng  thành công ']);
                
            }
        }
       
       
            // nếu  id ctsp ko có trong giỏ hàng thì thêm vào giỏ hàng 
            
            $cart=Cart::create([
                'product_detail_id'=>$product_detail_id,
            'user_id'=>$user_id,
            'quantity'=>$quantity,
            ]);
            return response()->json(['thông báo'=>'thêm thành công ']);

        

        
        
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $cart=Cart::find($id);
       return response()->json($cart);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $cart=Cart::find($id);

        //kiểm tra 
        if(!$cart)
        {
            return response()->json(["error"=>"không tìm thấy chi tiết của đơn hàng này "],400);
        }  

        
        $cart=Validator::make($request->all(),[
            'product_detail_id'=>'required',
            'user_id'=> 'required',
            'quantity'=>'required',
         ]);

         if ($cart->fails()) {
            return response()->json(['errors' => $cart->errors()], 400);
        }   

        
        $cart->fill([
            'product_detail_id'=>$request->product_dateil_id,
            'user_id'=> $request->user_id,
            'quantity'=>$request->quantity,
            
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $cart=Cart::find($id);
        if($cart) {
            $cart->delete(); 
            return response()->json(['thông báo'=>'xóa thành công']);
        }
        return response()->json(['thông báo'=>'không tồn tại']);
        
    }
    


    // hiển thị danh sách sản phẩm trong cart theo id của user
    public function cartList(string $userid)
    {
        $cart=User::where('users.id',$userid)
        ->join('carts','carts.user_id','=','users.id')
        ->select('carts.id as cartid','carts.quantity','carts.product_detail_id','carts.user_id')->get();
        if($cart)
        {
           return response()->json($cart);
        }
        return response()->json(['message'=>'không có dữ liệu cart'],404);
    }
    


    // lấy hình 
    public function image ( string $userid){
        $image=User::where('users.id',$userid)
        ->join('carts','carts.user_id','=','users.id')
        ->join('product_details','carts.product_detail_id','=','product_details.id')
        ->join('products','product_details.product_id','=','products.id')
        ->join('images','images.product_id','=','product_details.product_id')
        ->groupBy('product_details.id')
        ->selectRaw('MAX(carts.id) as cart_id,MAX(carts.quantity) as quantity,MAX(product_details.price) as price,MAX(users.id) as user_id, MAX(products.name) as productname, MAX(images.id) as image_id, MAX(images.product_id) as product_id, MAX(product_details.id) as product_detail_id')
        ->get();
        //MAX(images.path) as path
         if($image)
        {
            return response()->json($image);
        }
        return response()->json(['message'=>'không có dữ liệu cart'],404);
        
    }
    

    //update số lượng 
    //khi nhấn nút trừ số lượng   
    public function truQuantity(string $id) {
       
        $update=Cart::find($id);
        if($update)
        {

            $update->quantity=$update->quantity-1;
            if( $update->quantity<0)
            {
                $update->quantity=0;
                
            }
            $update->save();
            return response()->json(['message'=>'cập nhật thành công']);

      }
      return response()->json(['message'=>'không có dữ liệu '],404);
 
    }
    // cộng quantity
    public function congQuantity(string $id) {
       
        $update=Cart::find($id);
        if($update)
        {

            $update->quantity=$update->quantity+1;
          
            $update->save();
            return response()->json(['message'=>'cập nhật thành công']);

      }
      return response()->json(['message'=>'không có dữ liệu '],404);
 
    }



    // lấy 1 hình cho ct
    public function imageID(string $id){
        $image=Product::where('products.id',$id)
        
       
        
        ->join('product_details','product_details.product_id','products.id')
        
        ->join('images','images.product_id','products.id')
        ->join('colors','images.color_id','colors.id')
        ->groupBy('colors.id')
        ->selectRaw('MAX(colors.name) as colorname,MAX(product_details.id) as product_detail_id,MAX(product_details.product_id) as product_id,MAX(images.path) as path')->get();

        $formattedResult = [
            'product_id' => $image->first()->product_id,
            'product_detail' => $image->map(function ($item) {
                return ['id' => $item->product_detail_id,
                'path'=>$item->path,
                'colorname'=>$item->colorname
            ];
            })->toArray(),
        ];
        if($formattedResult)
        {
            return response()->json($formattedResult);
        }
        return response()->json(['message'=>'kio có']);
        
    }

    // lọc sp 
    public function searchProductByName(string $name)
{
    // $productName = $request->input('name');

    $products = Product::with('productdetails', 'productdetails.color', 'productdetails.size')
        ->where('name', 'like', '%' . $name . '%')
        ->get();

   if($products)
   {
    return response()->json($products);
   }

   return response()->json(['message'=>'không có dữ liệu '],404);
}



public function sizeAll(Request $request)
{
    $product_id=$request->input('product_id');
    $color_id=$request->input('color_id');
    
    $size=ProductDetail::where('product_details.product_id',$product_id)->where('product_details.color_id',$color_id)
    // ->join('sizes','product_details.size_id','=','sizes.id')
    // ->groupBy('product_details.color_id','product_details.product_id')
    // ->selectRaw('MAX(sizes.name) as sizename,MAX(product_details.id) as productdetail_id')
    ->get();
    if($size)
   {
    return response()->json($size);
   }

   return response()->json(['message'=>'không có dữ liệu '],404);
    
}


// mua hàng trong cart tạo cthd (productdetail_id , user_id , quantity , price)
public function createInvoicedetal(Request $request)
{
    $user_id=$request->input('user_id');
    $quantity=$request->input('quantity');
    $product_detail_id=$request->input('product_detail_id');
    $date = Carbon::now()->toDateString();

     //lấy id của invoice
     $invoice = Invoice::where('user_id', $user_id)->whereDate('invoicedate', $date)->first();
     if (!$invoice) {
         return response()->json(['error' => 'Không tìm thấy hóa đơn cho ngày hôm nay'], 404);
     }
     

   

    $invoicedetail = InvoiceDetail::create([
        'invoice_id' =>$invoice->id,
        'product_detail_id' => $request->product_detail_id,
        'quantity' => $request->quantity,
        'price' => $request->price
    ]);
    $productdetail=ProductDetail::where('id',$product_detail_id)->first();
    if($quantity<$productdetail->quantity)
    {
       $productdetail->quantity-=$quantity;
        $productdetail->save();
    }
    else{
        return response()->json(['error' => 'số lượng không đủ'], 404);
        
    }


    return response()->json(['thống báo ' => 'thêm thành cồng'], 200);
}




    
   

    
    
}