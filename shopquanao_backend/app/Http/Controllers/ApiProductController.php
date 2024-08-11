<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ApiProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $product = Product::with(['category','productdetails','productdetails.size','productdetails.color.images'])->get();
        return response()->json(['product' => $product]);
        

    }


    
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    try {
        // Xác thực người dùng nếu cần
        // $this->authorize('create', Product::class);

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'nullable',
            'slug' => 'required|unique:products,slug',
            'category_id' => 'required|exists:categories,id',
            'averagestar' => 'required|numeric|min:0|max:5',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $product = new Product;
        $product->name = $request->name;
        $product->description = $request->description;
        $product->slug = $request->slug;
        $product->category_id = $request->category_id;
        $product->averagestar = $request->averagestar;
        $product->status = $request->status;
        $product->save();

        return response()->json(['message' => 'Thành công', 'product' => $product]);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product=Product::Find($id);
        return  response()->json(['product'=>$product]);
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
         try {
            $product= Product::Find($id);
            if($product)
            {
               
            $validateData=$request->validate([
                'name'=>'required',
                'description'=>'nullable',
                'slug'=>'required',
                'category_id'=>'required',
                'averagestar'=>'required',
            ]);
            $product->fill($validateData);
            $product->save();
            return response()->json(['message'=>'Update thành công','product'=>$product]);
        }
            return response()->json(['message'=>'Không tồn tại','Id'=>$id]);
         } catch (\Throwable $th) {
            return response()->json(['message'=>$th->getMessage(),500]);
         }
       
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {   try {
        $product= Product::Find($id);
         if($product)
         {
            $product->status=1;
            $product->save();
            return response()->json(['message'=>'xóa thành công','Id'=>$product]);
            
         }
         return response()->json(['message'=>'không tồn tại','Id'=>$id]);
    } catch (\Throwable $th) {
        //throw $th;
        return response()->json(['message'=>$th->getMessage(),500]);
    }
         
    }





    
}