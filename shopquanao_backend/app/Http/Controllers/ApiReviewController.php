<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ApiReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $review=Review::all();
        return response()->json($review);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator =Validator::make($request->all(),[
           'user_id'=>'required',
           'product_id'=> 'required',
           'content'=>'required',
           'starnumber'=>'required',
           //ngày hiện tại 
           'reviewdate'=>'required|date|after_or_equal:today',
           

            
        ]);
        if ($validator ->fails()) {
            return response()->json(['errors' => $validator ->errors()], 400);
        }

        $review=Review::create([
            'user_id'=>$request->user_id,
            'product_id'=> $request->product_id,
            'content'=>$request->content,
            'starnumber'=>$request->starnumber,
            'reviewdate'=> $request->reviewdate,
            
            
        ]);
        return response()->json(['thống báo'=>'thêm thành công']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $review=Review::find($id);
        if($review)return response()->json($review);
        return response()->json(['thông báo'=>'bình luận không tồn tại ']);
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $review=Review::find($id);

        
        if (!$review) {
            return response()->json(['error' => 'Không tìm thấy bình luận '], 404);
        }

        
        $validator=Validator::make($request->all(),[
            'user_id'=>'required',
            'product_id'=> 'required',
            'content'=>'required',
            'starnumber'=>'required',
            //ngày hiện tại 
            'reviewdate'=>'required|date|after_or_equal:today',
            
 
             
         ]);
         if ( $validator->fails()) {
            return response()->json(['errors' =>  $validator->errors()], 400);
        }
 
         $review->fill([
             'user_id'=>$request->user_id,
             'product_id'=> $request->product_id,
             'content'=>$request->content,
             'starnumber'=>$request->starnumber,
             'reviewdate'=> $request->reviewdate,
             
             
         ]);
         $review->save();
         return response()->json(['thông báo'=>'cập nhật thành công ']);
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $review=Review::find($id);
        if($review)
        {
            $review->delete();  
            return response()->json(['thông báo'=>'xóa thành công'], 200);
        }
        return response()->json(['thông báo'=>'sản phẩm không tồn tại ']);
       
        
    }
}