<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductDetail;
use App\Models\ProductFavorite;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class ApiProductFavoriController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator =Validator::make($request->all(),[
            'product_id'=>'required',
            'user_id'=> 'required',
            
         ]);
 
         if ($validator ->fails()) {
             return response()->json(['errors' => $validator ->errors()], 400);
         } 
         
         $productfavorite=ProductFavorite::create([
             'product_id'=>$request->product_id,
            'user_id'=> $request->user_id,
            
         ]);
 
         return response()->json(['thông báo'=>'thêm thành công']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $userid)
    {
        $favorite = ProductFavorite::join('products', 'product_favorites.product_id', '=', 'products.id')
        ->join('images','images.product_id','=','products.id')
        ->join('product_details','product_details.product_id','=','products.id')
        ->where('product_favorites.user_id', $userid)
        ->groupBy('products.id' )
        ->selectRaw('MAX(product_favorites.id) as product_favorite_id,MAX(product_favorites.user_id) as user_id,MAX(products.id) as product_id ,MAX(products.name) as productname,MAX(products.description) as mota,MAX(product_details.price) as price,MAX(images.path) as  path')
        //->select('product_favorites.id', 'product_favorites.user_id', 'product_favorites.product_id', 'products.name as product_name', 'products.image as product_image')
        ->get();
        if( $favorite)
        {
            return response()->json($favorite);
        }
        return response()->json(['thông báo'=>'ko có dữ liệu ']);
        
        
    }
    

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $cart=ProductFavorite::find($id);
        if($cart) {
            $cart->delete(); 
            return response()->json(['thông báo'=>'xóa thành công']);
        }
        return response()->json(['thông báo'=>'không tồn tại']);
    }

    // thêm vài giỏ hàng từ danh sách yêu thích 
    public function addCart(string $id){
        $favorite=ProductFavorite::where('product_favorites.id',$id)
        ->join('products','product_favorites.product_id','=','products.id')
        ->join('product_details','product_details.product_id','=','products.id')
        ->join('colors','product_details.color_id','=','colors.id')
        ->join('sizes','product_details.size_id','=','sizes.id')
        ->select('product_f','sizes.name as sizename','colors.name as colorname')->get();

        if( $favorite)
        {
            return response()->json($favorite);
        }
        return response()->json(['thông báo'=>'ko có dữ liệu ']);
        

        
        
        
    }
    // lấy theo id 
    public function favoriteId(string $id){
        $favorite=ProductFavorite::find($id);
        if( $favorite)
        {
            return response()->json($favorite);
        }
        return response()->json(['thông báo'=>'ko có dữ liệu ']);
        
        
    }

    public function productdetaiId(Request $request){
        $color=$request->input('color_id');
        $size=$request->input('size_id');
        $product=$request->input('product_id');
        

        $id=ProductDetail::where('product_id', $product)
        ->where('size_id',$size)
        ->where('color_id',$color)
        ->select('id')->first();
        if( $id)
        {
            return response()->json($id);
        }
        return response()->json(['thông báo'=>'ko có dữ liệu ']);
    }
   
}